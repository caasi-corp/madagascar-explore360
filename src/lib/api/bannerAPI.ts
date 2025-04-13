
import { getDB, saveDatabase, sqliteHelper } from '../db/sqlite';
import { Banner } from '../db/schema';

export const bannerAPI = {
  /**
   * Récupère toutes les bannières
   */
  getAll: async (): Promise<Banner[]> => {
    const db = await getDB();
    const banners = sqliteHelper.queryAll(db, "SELECT * FROM banners");
    
    return banners.map(banner => ({
      ...banner,
      isActive: Boolean(banner.isActive)
    })) as Banner[];
  },

  /**
   * Récupère les bannières actives pour une page spécifique
   */
  getActiveByPage: async (page: string): Promise<Banner | undefined> => {
    const db = await getDB();
    const banners = sqliteHelper.queryAll(
      db, 
      "SELECT * FROM banners WHERE page = $page AND isActive = 1",
      { $page: page }
    );
    
    if (banners.length === 0) return undefined;
    
    return {
      ...banners[0],
      isActive: Boolean(banners[0].isActive)
    } as Banner;
  },

  /**
   * Récupère une bannière par son ID
   */
  getById: async (id: string): Promise<Banner | undefined> => {
    const db = await getDB();
    const banner = sqliteHelper.queryOne(db, "SELECT * FROM banners WHERE id = $id", { $id: id });
    
    if (!banner) return undefined;
    
    return {
      ...banner,
      isActive: Boolean(banner.isActive)
    } as Banner;
  },

  /**
   * Ajoute une nouvelle bannière
   */
  add: async (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const db = await getDB();
    const now = new Date().toISOString();
    
    // Si cette bannière est active et pour la même page, désactiver les autres
    if (banner.isActive) {
      sqliteHelper.execute(
        db,
        "UPDATE banners SET isActive = 0, updatedAt = $updatedAt WHERE page = $page AND isActive = 1",
        { $page: banner.page, $updatedAt: now }
      );
    }
    
    // Ajouter la nouvelle bannière
    const id = `banner-${Date.now()}`;
    
    sqliteHelper.execute(
      db,
      `INSERT INTO banners (id, name, imagePath, page, description, isActive, createdAt, updatedAt)
       VALUES ($id, $name, $imagePath, $page, $description, $isActive, $createdAt, $updatedAt)`,
      {
        $id: id,
        $name: banner.name,
        $imagePath: banner.imagePath,
        $page: banner.page,
        $description: banner.description || null,
        $isActive: banner.isActive ? 1 : 0,
        $createdAt: now,
        $updatedAt: now
      }
    );
    
    await saveDatabase();
    
    return id;
  },

  /**
   * Met à jour une bannière existante
   */
  update: async (id: string, updates: Partial<Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> => {
    const db = await getDB();
    const banner = await bannerAPI.getById(id);
    
    if (!banner) {
      return false;
    }

    const now = new Date().toISOString();
    
    // Si on active cette bannière, désactiver les autres de la même page
    if (updates.isActive && !banner.isActive) {
      sqliteHelper.execute(
        db,
        "UPDATE banners SET isActive = 0, updatedAt = $updatedAt WHERE page = $page AND id != $id AND isActive = 1",
        { 
          $page: updates.page || banner.page, 
          $id: id, 
          $updatedAt: now 
        }
      );
    }
    
    // Mettre à jour la bannière
    const updatedBanner = { ...banner, ...updates };
    
    sqliteHelper.execute(
      db,
      `UPDATE banners SET 
        name = $name, 
        imagePath = $imagePath, 
        page = $page, 
        description = $description, 
        isActive = $isActive, 
        updatedAt = $updatedAt
       WHERE id = $id`,
      {
        $id: id,
        $name: updatedBanner.name,
        $imagePath: updatedBanner.imagePath,
        $page: updatedBanner.page,
        $description: updatedBanner.description || null,
        $isActive: updatedBanner.isActive ? 1 : 0,
        $updatedAt: now
      }
    );
    
    await saveDatabase();
    
    return true;
  },

  /**
   * Supprime une bannière
   */
  delete: async (id: string): Promise<boolean> => {
    const db = await getDB();
    sqliteHelper.execute(db, "DELETE FROM banners WHERE id = $id", { $id: id });
    await saveDatabase();
    return true;
  }
};
