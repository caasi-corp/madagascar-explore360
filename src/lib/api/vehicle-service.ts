
import { Vehicle } from '../db/schema';
import { vehicleAPI } from './vehicleAPI';

/**
 * Types for vehicle filtering and searching
 */
export interface VehicleSearchParams {
  pickupLocation?: string;
  pickupDate?: Date;
  dropoffDate?: Date;
  vehicleType?: string;
  transmission?: string;
  fuelType?: string;
  minPrice?: number;
  maxPrice?: number;
  minSeats?: number;
}

/**
 * Vehicle service that provides methods for fetching and filtering vehicles
 */
export class VehicleService {
  /**
   * Get all available vehicles
   */
  static async getAvailableVehicles(): Promise<Vehicle[]> {
    try {
      const vehicles = await vehicleAPI.getAvailable();
      console.log('Available vehicles fetched:', vehicles);
      return vehicles;
    } catch (error) {
      console.error("Error fetching available vehicles:", error);
      return [];
    }
  }

  /**
   * Get a specific vehicle by its ID
   */
  static async getVehicleById(id: string): Promise<Vehicle | null> {
    try {
      const vehicle = await vehicleAPI.getById(id);
      return vehicle || null;
    } catch (error) {
      console.error(`Error fetching vehicle with ID ${id}:`, error);
      return null;
    }
  }

  /**
   * Get vehicles filtered by type
   */
  static async getVehiclesByType(type: string): Promise<Vehicle[]> {
    try {
      const vehicles = await vehicleAPI.getByType(type);
      return vehicles;
    } catch (error) {
      console.error(`Error fetching vehicles of type ${type}:`, error);
      return [];
    }
  }

  /**
   * Filter vehicles based on search parameters
   */
  static async filterVehicles(params: VehicleSearchParams): Promise<Vehicle[]> {
    try {
      const availableVehicles = await this.getAvailableVehicles();
      
      return availableVehicles.filter(vehicle => {
        return (
          (!params.vehicleType || vehicle.type === params.vehicleType) &&
          (!params.transmission || vehicle.transmission === params.transmission) &&
          (!params.fuelType || vehicle.fuelType === params.fuelType) &&
          (!params.minPrice || vehicle.pricePerDay >= params.minPrice) &&
          (!params.maxPrice || vehicle.pricePerDay <= params.maxPrice) &&
          (!params.minSeats || vehicle.seats >= params.minSeats)
        );
      });
    } catch (error) {
      console.error("Error filtering vehicles:", error);
      return [];
    }
  }

  /**
   * Get featured vehicles (for homepage display)
   */
  static async getFeaturedVehicles(limit: number = 3): Promise<Vehicle[]> {
    try {
      const availableVehicles = await this.getAvailableVehicles();
      console.log('Featured vehicles (before slice):', availableVehicles);
      // Return the first few vehicles, but in a real implementation
      // you might have a "featured" field on the vehicle
      return availableVehicles.slice(0, limit);
    } catch (error) {
      console.error("Error fetching featured vehicles:", error);
      return [];
    }
  }
}
