
import { getDB } from '../db/db';
import { Vehicle } from '../db/schema';

/**
 * API for vehicle operations
 */
export const vehicleAPI = {
  getAll: async () => {
    const db = await getDB();
    return db.getAll('vehicles');
  },
  
  getById: async (id: string) => {
    const db = await getDB();
    return db.get('vehicles', id);
  },
  
  getByType: async (type: string) => {
    const db = await getDB();
    return db.getAllFromIndex('vehicles', 'by-type', type);
  },
  
  getAvailable: async () => {
    const db = await getDB();
    const allVehicles = await db.getAll('vehicles');
    return allVehicles.filter(vehicle => vehicle.availability);
  },
  
  add: async (vehicle: Omit<Vehicle, 'id'>) => {
    const db = await getDB();
    const id = crypto.randomUUID();
    const newVehicle = { ...vehicle, id };
    await db.put('vehicles', newVehicle);
    return newVehicle;
  },
  
  update: async (id: string, vehicle: Partial<Vehicle>) => {
    const db = await getDB();
    const existingVehicle = await db.get('vehicles', id);
    if (!existingVehicle) {
      throw new Error('Vehicle not found');
    }
    const updatedVehicle = { ...existingVehicle, ...vehicle };
    await db.put('vehicles', updatedVehicle);
    return updatedVehicle;
  },
  
  delete: async (id: string) => {
    const db = await getDB();
    await db.delete('vehicles', id);
  },
};
