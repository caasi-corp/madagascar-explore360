
import { getDB } from '../db/db';
import { Vehicle } from '../db/schema';

/**
 * API pour les opérations sur les véhicules
 */
export const vehicleAPI = {
  getAll: async (): Promise<Vehicle[]> => {
    try {
      const db = await getDB();
      const vehicles = await db.getAll('vehicles');
      return vehicles || [];
    } catch (error) {
      console.error('Erreur dans vehicleAPI.getAll():', error);
      return [];
    }
  },
  
  getById: async (id: string): Promise<Vehicle | null> => {
    try {
      const db = await getDB();
      const vehicle = await db.get('vehicles', id);
      return vehicle || null;
    } catch (error) {
      console.error(`Erreur dans vehicleAPI.getById(${id}):`, error);
      return null;
    }
  },
  
  getByType: async (type: string): Promise<Vehicle[]> => {
    try {
      const db = await getDB();
      const vehicles = await db.getAllFromIndex('vehicles', 'by-type', type);
      return vehicles || [];
    } catch (error) {
      console.error(`Erreur dans vehicleAPI.getByType(${type}):`, error);
      return [];
    }
  },
  
  getAvailable: async (): Promise<Vehicle[]> => {
    try {
      const db = await getDB();
      const allVehicles = await db.getAll('vehicles');
      if (!allVehicles || allVehicles.length === 0) return [];
      
      const availableVehicles = allVehicles.filter(vehicle => vehicle.availability);
      return availableVehicles;
    } catch (error) {
      console.error('Erreur dans vehicleAPI.getAvailable():', error);
      return [];
    }
  },
  
  add: async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    try {
      const db = await getDB();
      const id = crypto.randomUUID();
      const newVehicle = { ...vehicle, id };
      await db.put('vehicles', newVehicle);
      return newVehicle;
    } catch (error) {
      console.error('Erreur dans vehicleAPI.add():', error);
      throw new Error('Impossible d\'ajouter le véhicule');
    }
  },
  
  update: async (id: string, vehicle: Partial<Vehicle>): Promise<Vehicle> => {
    try {
      const db = await getDB();
      const existingVehicle = await db.get('vehicles', id);
      if (!existingVehicle) {
        throw new Error('Véhicule non trouvé');
      }
      const updatedVehicle = { ...existingVehicle, ...vehicle };
      await db.put('vehicles', updatedVehicle);
      return updatedVehicle;
    } catch (error) {
      console.error(`Erreur dans vehicleAPI.update(${id}):`, error);
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      const db = await getDB();
      await db.delete('vehicles', id);
    } catch (error) {
      console.error(`Erreur dans vehicleAPI.delete(${id}):`, error);
      throw new Error('Impossible de supprimer le véhicule');
    }
  },
};
