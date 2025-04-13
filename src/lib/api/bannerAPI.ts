
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
   * Ajoute une nouvelle bannière
   */
  add: async (banner: any) => {
    try {
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
