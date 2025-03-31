
import { Vehicle } from '../db/schema';
import { vehicleAPI } from './vehicleAPI';

/**
 * Types pour le filtrage et la recherche de véhicules
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
 * Service de véhicules qui fournit des méthodes pour récupérer et filtrer les véhicules
 */
export class VehicleService {
  /**
   * Récupérer tous les véhicules disponibles
   */
  static async getAvailableVehicles(): Promise<Vehicle[]> {
    try {
      const vehicles = await vehicleAPI.getAvailable();
      return vehicles;
    } catch (error) {
      console.error("Erreur lors de la récupération des véhicules disponibles:", error);
      return [];
    }
  }

  /**
   * Récupérer un véhicule spécifique par son ID
   */
  static async getVehicleById(id: string): Promise<Vehicle | null> {
    try {
      if (!id) return null;
      const vehicle = await vehicleAPI.getById(id);
      return vehicle;
    } catch (error) {
      console.error(`Erreur lors de la récupération du véhicule avec l'ID ${id}:`, error);
      return null;
    }
  }

  /**
   * Récupérer les véhicules filtrés par type
   */
  static async getVehiclesByType(type: string): Promise<Vehicle[]> {
    try {
      if (!type) return this.getAvailableVehicles();
      const vehicles = await vehicleAPI.getByType(type);
      return vehicles;
    } catch (error) {
      console.error(`Erreur lors de la récupération des véhicules de type ${type}:`, error);
      return [];
    }
  }

  /**
   * Filtrer les véhicules en fonction des paramètres de recherche
   */
  static async filterVehicles(params: VehicleSearchParams): Promise<Vehicle[]> {
    try {
      // Si aucun paramètre de filtrage n'est fourni, retourne tous les véhicules disponibles
      if (!params || Object.keys(params).length === 0) {
        return this.getAvailableVehicles();
      }
      
      const availableVehicles = await this.getAvailableVehicles();
      
      if (!availableVehicles.length) {
        console.warn("Aucun véhicule disponible à filtrer");
        return [];
      }
      
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
      console.error("Erreur lors du filtrage des véhicules:", error);
      return [];
    }
  }

  /**
   * Récupérer les véhicules mis en avant (pour l'affichage sur la page d'accueil)
   */
  static async getFeaturedVehicles(limit: number = 3): Promise<Vehicle[]> {
    try {
      const availableVehicles = await this.getAvailableVehicles();
      // Retourne les premiers véhicules, mais dans une implémentation réelle
      // vous pourriez avoir un champ "featured" sur le véhicule
      return availableVehicles.slice(0, limit);
    } catch (error) {
      console.error("Erreur lors de la récupération des véhicules mis en avant:", error);
      return [];
    }
  }
}
