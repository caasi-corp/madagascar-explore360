
import { openDB } from 'idb';
import { NorthGascarDB, Banner } from '../db/schema';
import { initDB, resetDB } from '../db/db';

// Fonction utilitaire pour vérifier si le store banners existe
const ensureBannersStoreExists = async () => {
  const db = await openDB<NorthGascarDB>('northgascar-db', 1);
  if (!db.objectStoreNames.contains('banners')) {
    console.warn('Le store banners n\'existe pas. Réinitialisation de la base de données...');
    db.close();
    await resetDB();
    return false;
  }
  db.close();
  return true;
};

export const bannerAPI = {
  /**
   * Récupère toutes les bannières
   */
  getAll: async (): Promise<Banner[]> => {
    try {
      // S'assurer que la base de données est initialisée correctement
      await initDB();
      
      // Vérifier que le store existe
      const storeExists = await ensureBannersStoreExists();
      if (!storeExists) {
        await initDB(); // Réinitialiser après le reset
      }
      
      const db = await openDB<NorthGascarDB>('northgascar-db', 1);
      console.log('Connexion à la base de données réussie pour getAll');
      
      // Double vérification du store
      if (!db.objectStoreNames.contains('banners')) {
        console.warn('Le store banners n\'existe toujours pas après réinitialisation!');
        await db.close();
        return [];
      }
      
      const banners = await db.getAll('banners');
      await db.close();
      return banners;
    } catch (error) {
      console.error('Erreur lors de la récupération des bannières:', error);
      // Réessayer une fois après initialisation
      try {
        await resetDB();
        const db = await openDB<NorthGascarDB>('northgascar-db', 1);
        const banners = await db.getAll('banners');
        await db.close();
        return banners;
      } catch (retryError) {
        console.error('Échec de la récupération même après réinitialisation:', retryError);
        return [];
      }
    }
  },

  /**
   * Récupère les bannières actives pour une page spécifique
   */
  getActiveByPage: async (page: string): Promise<Banner | undefined> => {
    try {
      // S'assurer que la base de données est initialisée correctement
      await initDB();
      
      // Vérifier que le store existe
      const storeExists = await ensureBannersStoreExists();
      if (!storeExists) {
        await initDB(); // Réinitialiser après le reset
      }
      
      const db = await openDB<NorthGascarDB>('northgascar-db', 1);
      console.log(`Récupération de la bannière active pour la page ${page}`);
      
      // Vérifier si le store banners existe et si l'index by-page existe
      if (!db.objectStoreNames.contains('banners')) {
        console.warn('Le store banners n\'existe toujours pas après réinitialisation!');
        await db.close();
        return undefined;
      }
      
      // Vérifier si l'index existe
      const transaction = db.transaction('banners', 'readonly');
      const store = transaction.objectStore('banners');
      
      if (!store.indexNames.contains('by-page')) {
        console.warn('L\'index by-page n\'existe pas dans le store banners!');
        // On tente quand même de récupérer toutes les bannières et de filtrer
        const allBanners = await db.getAll('banners');
        await transaction.done;
        await db.close();
        return allBanners.find(banner => banner.page === page && banner.isActive);
      }
      
      const banners = await db.getAllFromIndex(
        'banners',
        'by-page',
        page
      );
      
      await db.close();
      return banners.find(banner => banner.isActive);
    } catch (error) {
      console.error(`Erreur lors de la récupération de la bannière active pour ${page}:`, error);
      // Réessayer une fois après initialisation
      try {
        await resetDB();
        const db = await openDB<NorthGascarDB>('northgascar-db', 1);
        const banners = await db.getAllFromIndex('banners', 'by-page', page);
        await db.close();
        return banners.find(banner => banner.isActive);
      } catch (retryError) {
        console.error('Échec de la récupération même après réinitialisation:', retryError);
        return undefined;
      }
    }
  },

  /**
   * Récupère une bannière par son ID
   */
  getById: async (id: string): Promise<Banner | undefined> => {
    try {
      await initDB();
      const db = await openDB<NorthGascarDB>('northgascar-db', 1);
      const banner = await db.get('banners', id);
      await db.close();
      return banner;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la bannière ${id}:`, error);
      return undefined;
    }
  },

  /**
   * Ajoute une nouvelle bannière
   */
  add: async (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
      await initDB();
      const db = await openDB<NorthGascarDB>('northgascar-db', 1);
      const now = new Date().toISOString();
      
      // Si cette bannière est active et pour la même page, désactiver les autres
      if (banner.isActive) {
        const existingBanners = await db.getAllFromIndex('banners', 'by-page', banner.page);
        const tx = db.transaction('banners', 'readwrite');
        
        for (const existingBanner of existingBanners) {
          if (existingBanner.isActive) {
            existingBanner.isActive = false;
            existingBanner.updatedAt = now;
            await tx.store.put(existingBanner);
          }
        }
        
        await tx.done;
      }
      
      // Ajouter la nouvelle bannière
      const id = `banner-${Date.now()}`;
      const newBanner: Banner = {
        ...banner,
        id,
        createdAt: now,
        updatedAt: now
      };
      
      await db.add('banners', newBanner);
      await db.close();
      
      // Déclencher l'événement de mise à jour
      window.dispatchEvent(new Event('banner-updated'));
      
      return id;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la bannière:', error);
      throw error;
    }
  },

  /**
   * Met à jour une bannière existante
   */
  update: async (id: string, updates: Partial<Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> => {
    try {
      await initDB();
      const db = await openDB<NorthGascarDB>('northgascar-db', 1);
      const banner = await db.get('banners', id);
      
      if (!banner) {
        console.warn(`La bannière ${id} n'existe pas et ne peut pas être mise à jour`);
        await db.close();
        return false;
      }

      const now = new Date().toISOString();
      
      // Si on active cette bannière, désactiver les autres de la même page
      if (updates.isActive && !banner.isActive) {
        const existingBanners = await db.getAllFromIndex('banners', 'by-page', updates.page || banner.page);
        const tx = db.transaction('banners', 'readwrite');
        
        for (const existingBanner of existingBanners) {
          if (existingBanner.id !== id && existingBanner.isActive) {
            existingBanner.isActive = false;
            existingBanner.updatedAt = now;
            await tx.store.put(existingBanner);
          }
        }
        
        await tx.done;
      }
      
      // Mettre à jour la bannière
      const updatedBanner: Banner = {
        ...banner,
        ...updates,
        updatedAt: now
      };
      
      await db.put('banners', updatedBanner);
      await db.close();
      
      // Déclencher l'événement de mise à jour
      window.dispatchEvent(new Event('banner-updated'));
      
      return true;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la bannière ${id}:`, error);
      return false;
    }
  },

  /**
   * Supprime une bannière
   */
  delete: async (id: string): Promise<boolean> => {
    try {
      await initDB();
      const db = await openDB<NorthGascarDB>('northgascar-db', 1);
      await db.delete('banners', id);
      await db.close();
      
      // Déclencher l'événement de mise à jour
      window.dispatchEvent(new Event('banner-updated'));
      
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la bannière ${id}:`, error);
      return false;
    }
  }
};
