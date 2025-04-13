
/**
 * API pour les opérations sur les réservations
 */
import { dbx } from '../DatabaseX/db';

export const bookingAPI = {
  getAll: async () => {
    try {
      return dbx.bookings.getAll();
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      return [];
    }
  },
  
  getById: async (id: string) => {
    try {
      return dbx.bookings.getById(id);
    } catch (error) {
      console.error(`Erreur lors de la récupération de la réservation ${id}:`, error);
      return null;
    }
  },
  
  getByUserId: async (userId: string) => {
    try {
      return dbx.bookings.getByUserId(userId);
    } catch (error) {
      console.error(`Erreur lors de la récupération des réservations de l'utilisateur ${userId}:`, error);
      return [];
    }
  },
  
  getByStatus: async (status: string) => {
    try {
      return dbx.bookings.getByStatus(status);
    } catch (error) {
      console.error(`Erreur lors de la récupération des réservations avec le statut ${status}:`, error);
      return [];
    }
  },
  
  add: async (booking: any) => {
    try {
      return dbx.bookings.add(booking);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réservation:", error);
      throw error;
    }
  },
  
  update: async (id: string, booking: any) => {
    try {
      return dbx.bookings.update(id, booking);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la réservation ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      return dbx.bookings.delete(id);
    } catch (error) {
      console.error(`Erreur lors de la suppression de la réservation ${id}:`, error);
      throw error;
    }
  },
};
