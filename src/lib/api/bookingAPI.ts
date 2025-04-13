
import { supabase } from "@/integrations/supabase/client";
import { Booking } from "../db/schema";

export const bookingAPI = {
  // Récupérer toutes les réservations (admin)
  getAll: async (): Promise<Booking[]> => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*');
    
    if (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer les réservations d'un utilisateur
  getByUserId: async (userId: string): Promise<Booking[]> => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      console.error(`Erreur lors de la récupération des réservations de l'utilisateur ${userId}:`, error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer une réservation par son ID
  getById: async (id: string): Promise<Booking | null> => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Erreur lors de la récupération de la réservation ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Créer une nouvelle réservation
  create: async (booking: Omit<Booking, 'id'>): Promise<Booking> => {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();
    
    if (error) {
      console.error("Erreur lors de la création de la réservation:", error);
      throw error;
    }
    
    return data;
  },
  
  // Mettre à jour une réservation
  update: async (id: string, updates: Partial<Booking>): Promise<Booking> => {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour de la réservation ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Annuler une réservation
  cancel: async (id: string): Promise<Booking> => {
    return await bookingAPI.update(id, { status: 'Annulé' });
  }
};
