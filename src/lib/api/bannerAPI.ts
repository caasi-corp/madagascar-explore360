
import { openDB } from 'idb';
import { NorthGascarDB, Banner } from '../db/schema';

export const bannerAPI = {
  /**
   * Récupère toutes les bannières
   */
  getAll: async (): Promise<Banner[]> => {
    const db = await openDB<NorthGascarDB>('northgascar-db', 1);
    return db.getAll('banners');
  },

  /**
   * Récupère les bannières actives pour une page spécifique
   */
  getActiveByPage: async (page: string): Promise<Banner | undefined> => {
    const db = await openDB<NorthGascarDB>('northgascar-db', 1);
    const banners = await db.getAllFromIndex(
      'banners',
      'by-page',
      page
    );
    return banners.find(banner => banner.isActive);
  },

  /**
   * Récupère une bannière par son ID
   */
  getById: async (id: string): Promise<Banner | undefined> => {
    const db = await openDB<NorthGascarDB>('northgascar-db', 1);
    return db.get('banners', id);
  },

  /**
   * Ajoute une nouvelle bannière
   */
  add: async (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
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
  },

  /**
   * Met à jour une bannière existante
   */
  update: async (id: string, updates: Partial<Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> => {
    const db = await openDB<NorthGascarDB>('northgascar-db', 1);
    const banner = await db.get('banners', id);
    
    if (!banner) {
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
  },

  /**
   * Supprime une bannière
   */
  delete: async (id: string): Promise<boolean> => {
    const db = await openDB<NorthGascarDB>('northgascar-db', 1);
    await db.delete('banners', id);
    return true;
  }
};
