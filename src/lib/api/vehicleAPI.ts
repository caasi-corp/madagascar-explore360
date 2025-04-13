
/**
 * API pour les opérations sur les véhicules
 */
import { dbx } from '../DatabaseX/db';

export const vehicleAPI = {
  getAll: async () => {
    try {
      return dbx.vehicles.getAll();
    } catch (error) {
      console.error("Erreur lors de la récupération des véhicules:", error);
      return [];
    }
  },
  
  getById: async (id: string) => {
    try {
      return dbx.vehicles.getById(id);
    } catch (error) {
      console.error(`Erreur lors de la récupération du véhicule ${id}:`, error);
      return null;
    }
  },
  
  getByType: async (type: string) => {
    try {
      return dbx.vehicles.getByType(type);
    } catch (error) {
      console.error(`Erreur lors de la récupération des véhicules de type ${type}:`, error);
      return [];
    }
  },
  
  getAvailable: async () => {
    try {
      return dbx.vehicles.getAvailable();
    } catch (error) {
      console.error("Erreur lors de la récupération des véhicules disponibles:", error);
      return [];
    }
  },
  
  add: async (vehicle: any) => {
    try {
      return dbx.vehicles.add(vehicle);
    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule:", error);
      throw error;
    }
  },
  
  update: async (id: string, vehicle: any) => {
    try {
      return dbx.vehicles.update(id, vehicle);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du véhicule ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      return dbx.vehicles.delete(id);
    } catch (error) {
      console.error(`Erreur lors de la suppression du véhicule ${id}:`, error);
      throw error;
    }
  },
};
