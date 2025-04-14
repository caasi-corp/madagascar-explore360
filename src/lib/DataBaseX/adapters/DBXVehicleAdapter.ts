
/**
 * Adaptateur pour les opérations sur les véhicules avec DBX
 */
import { Vehicle } from '../../db/schema';
import { dbxManager } from '../DBXManager';

export const DBXVehicleAdapter = {
  getAll: (): Vehicle[] => {
    return dbxManager.readDBX<Vehicle>('vehicles');
  },
  
  getById: (id: string): Vehicle | undefined => {
    const vehicles = dbxManager.readDBX<Vehicle>('vehicles');
    return vehicles.find(vehicle => vehicle.id === id);
  },
  
  getByType: (type: string): Vehicle[] => {
    const vehicles = dbxManager.readDBX<Vehicle>('vehicles');
    return vehicles.filter(vehicle => vehicle.type === type);
  },
  
  getAvailable: (): Vehicle[] => {
    const vehicles = dbxManager.readDBX<Vehicle>('vehicles');
    return vehicles.filter(vehicle => vehicle.availability);
  },
  
  add: (vehicle: Omit<Vehicle, 'id'>): Vehicle => {
    const id = crypto.randomUUID();
    const newVehicle = { ...vehicle, id };
    return dbxManager.updateItem<Vehicle>('vehicles', newVehicle);
  },
  
  update: (id: string, vehicleData: Partial<Vehicle>): Vehicle => {
    const vehicles = dbxManager.readDBX<Vehicle>('vehicles');
    const existingVehicle = vehicles.find(v => v.id === id);
    
    if (!existingVehicle) {
      throw new Error('Vehicle not found');
    }
    
    const updatedVehicle = { ...existingVehicle, ...vehicleData };
    return dbxManager.updateItem<Vehicle>('vehicles', updatedVehicle);
  },
  
  delete: (id: string): boolean => {
    return dbxManager.deleteItem<Vehicle>('vehicles', id);
  }
};
