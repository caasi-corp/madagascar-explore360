
import { supabase } from "@/integrations/supabase/client";
import { Vehicle } from "../db/schema";

export const vehicleAPI = {
  // Récupérer tous les véhicules
  getAll: async (): Promise<Vehicle[]> => {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*');
    
    if (error) {
      console.error("Erreur lors de la récupération des véhicules:", error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer les véhicules mis en avant
  getFeatured: async (): Promise<Vehicle[]> => {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('featured', true)
      .eq('availability', true);
    
    if (error) {
      console.error("Erreur lors de la récupération des véhicules en vedette:", error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer un véhicule par son ID
  getById: async (id: string): Promise<Vehicle | null> => {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Erreur lors de la récupération du véhicule ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Filtrer les véhicules par type
  getByType: async (type: string): Promise<Vehicle[]> => {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('type', type)
      .eq('availability', true);
    
    if (error) {
      console.error(`Erreur lors de la récupération des véhicules de type ${type}:`, error);
      throw error;
    }
    
    return data || [];
  },
  
  // Ajouter un nouveau véhicule
  create: async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([vehicle])
      .select()
      .single();
    
    if (error) {
      console.error("Erreur lors de la création du véhicule:", error);
      throw error;
    }
    
    return data;
  },
  
  // Mettre à jour un véhicule existant
  update: async (id: string, updates: Partial<Vehicle>): Promise<Vehicle> => {
    const { data, error } = await supabase
      .from('vehicles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour du véhicule ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Supprimer un véhicule
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Erreur lors de la suppression du véhicule ${id}:`, error);
      throw error;
    }
  }
};
