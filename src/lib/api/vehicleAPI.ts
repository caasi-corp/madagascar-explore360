
import { supabase } from "@/integrations/supabase/client";
import { Vehicle } from "../db/schema";

export const vehicleAPI = {
  // Get all vehicles
  getAll: async (): Promise<Vehicle[]> => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error retrieving vehicles:", error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in vehicleAPI.getAll:", error);
      throw error;
    }
  },
  
  // Get featured vehicles
  getFeatured: async (): Promise<Vehicle[]> => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error retrieving featured vehicles:", error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in vehicleAPI.getFeatured:", error);
      throw error;
    }
  },
  
  // Get a vehicle by ID
  getById: async (id: string): Promise<Vehicle | null> => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error retrieving vehicle ${id}:`, error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Error in vehicleAPI.getById:", error);
      throw error;
    }
  },
  
  // Get vehicles by type
  getByType: async (type: string): Promise<Vehicle[]> => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('type', type)
        .order('priceperday', { ascending: true });
      
      if (error) {
        console.error(`Error retrieving vehicles of type ${type}:`, error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in vehicleAPI.getByType:", error);
      throw error;
    }
  }
};
