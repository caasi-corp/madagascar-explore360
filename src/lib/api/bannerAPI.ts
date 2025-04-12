
import { openDB } from 'idb';
import { NorthGascarDB, Banner } from '../db/schema';

export const bannerAPI = {
  /**
   * Récupère toutes les bannières
   */
  getAll: async (): Promise<Banner[]> => {
    try {
      const db = await openDB<NorthGascarDB>('northgascar-db', 1);
      console.log('Connexion à la base de données réussie pour getAll');
      
      // Vérifier si le store banners existe
      if (!db.objectStoreNames.contains('banners')) {
        console.warn('Le store banners n\'existe pas dans la base de données!');
        return [];
      }
      
      return db.getAll('banners');
    } catch (error) {
      console.error('Erreur lors de la récupération des bannières:', error);
      // Réessayer une fois après initialisation
      try {
        const { initDB } = await import('../db/db');
        await initDB();
        const db = await openDB<NorthGascarDB>('northgascar-db', 1);
        return db.getAll('banners');
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
      const db = await openDB<NorthGascarDB>('northgascar-db', 1);
      console.log(`Récupération de la bannière active pour la page ${page}`);
      
      // Vérifier si le store banners existe et si l'index by-page existe
      if (!db.objectStoreNames.contains('banners')) {
        console.warn('Le store banners n\'existe pas dans la base de données!');
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
        return allBanners.find(banner => banner.page === page && banner.isActive);
      }
      
      const banners = await db.getAllFromIndex(
        'banners',
        'by-page',
        page
      );
      
      return banners.find(banner => banner.isActive);
    } catch (error) {
      console.error(`Erreur lors de la récupération de la bannière active pour ${page}:`, error);
      // Réessayer une fois après initialisation
      try {
        const { initDB } = await import('../db/db');
        await initDB();
        const db = await openDB<NorthGascarDB>('northgascar-db', 1);
        const banners = await db.getAllFromIndex('banners', 'by-page', page);
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
      const db = await openDB<NorthGascarDB>('northgascar-db', 1);
      return db.get('banners', id);
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
      const db = await openDB<NorthGascarDB>('northgascar-db', 1);
      const banner = await db.get('banners', id);
      
      if (!banner) {
        console.warn(`La bannière ${id} n'existe pas et ne peut pas être mise à jour`);
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
      const db = await openDB<NorthGascarDB>('northgascar-db', 1);
      await db.delete('banners', id);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la bannière ${id}:`, error);
      return false;
    }
  }
};
