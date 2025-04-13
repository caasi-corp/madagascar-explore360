
/**
 * API pour les opérations sur les bannières
 */
import { dbx } from '../DatabaseX/db';

export const bannerAPI = {
  /**
   * Récupère toutes les bannières
   */
  getAll: async () => {
    try {
      return dbx.banners.getAll();
    } catch (error) {
      console.error('Erreur lors de la récupération des bannières:', error);
      return [];
    }
  },

  /**
   * Récupère les bannières actives pour une page spécifique
   */
  getActiveByPage: async (page: string) => {
    try {
      return dbx.banners.getActiveByPage(page);
    } catch (error) {
      console.error(`Erreur lors de la récupération de la bannière active pour ${page}:`, error);
      return undefined;
    }
  },

  /**
   * Récupère une bannière par son ID
   */
  getById: async (id: string) => {
    try {
      return dbx.banners.getById(id);
    } catch (error) {
      console.error(`Erreur lors de la récupération de la bannière ${id}:`, error);
      return undefined;
    }
  },

  /**
   * Vérifie si une bannière similaire existe déjà (même nom et même page)
   */
  checkDuplicate: async (banner: { name: string, page: string }) => {
    try {
      const banners = await dbx.banners.getAll();
      return banners.some(b => b.name === banner.name && b.page === banner.page);
    } catch (error) {
      console.error('Erreur lors de la vérification des doublons:', error);
      return false;
    }
  },

  /**
   * Ajoute une nouvelle bannière
   */
  add: async (banner: any) => {
    try {
      // Vérifier s'il existe déjà une bannière similaire
      const isDuplicate = await bannerAPI.checkDuplicate(banner);
      if (isDuplicate) {
        console.warn('Une bannière similaire existe déjà:', banner);
        throw new Error('Une bannière avec ce nom existe déjà pour cette page');
      }
      
      return dbx.banners.add(banner);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la bannière:', error);
      throw error;
    }
  },

  /**
   * Met à jour une bannière existante
   */
  update: async (id: string, updates: any) => {
    try {
      return dbx.banners.update(id, updates);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la bannière ${id}:`, error);
      return false;
    }
  },

  /**
   * Supprime une bannière
   */
  delete: async (id: string) => {
    try {
      return dbx.banners.delete(id);
    } catch (error) {
      console.error(`Erreur lors de la suppression de la bannière ${id}:`, error);
      return false;
    }
  }
};
