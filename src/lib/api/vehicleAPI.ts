
import { Vehicle } from '../db/schema';

/**
 * API for vehicle operations
 */
export const vehicleAPI = {
  getAll: async () => {
    return await window.electronAPI.vehicleGetAll();
  },
  
  getById: async (id: string) => {
    return await window.electronAPI.vehicleGetById(id);
  },
  
  getByType: async (type: string) => {
    return await window.electronAPI.vehicleGetByType(type);
  },
  
  getAvailable: async () => {
    const allVehicles = await vehicleAPI.getAll();
    return allVehicles.filter(vehicle => vehicle.availability === 1);
  },
  
  add: async (vehicle: Omit<Vehicle, 'id'>) => {
    return await window.electronAPI.vehicleAdd(vehicle);
  },
  
  update: async (id: string, vehicle: Partial<Vehicle>) => {
    return await window.electronAPI.vehicleUpdate(id, vehicle);
  },
  
  delete: async (id: string) => {
    return await window.electronAPI.vehicleDelete(id);
  },
};
