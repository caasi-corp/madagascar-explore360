
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
  },

  // Create a new vehicle
  create: async (vehicle: Omit<Vehicle, 'id' | 'created_at'>): Promise<Vehicle> => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .insert([vehicle])
        .select()
        .single();
      
      if (error) {
        console.error("Error creating vehicle:", error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Error in vehicleAPI.create:", error);
      throw error;
    }
  },
  
  // Update an existing vehicle
  update: async (id: string, updates: Partial<Vehicle>): Promise<Vehicle> => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error(`Error updating vehicle ${id}:`, error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Error in vehicleAPI.update:", error);
      throw error;
    }
  },
  
  // Delete a vehicle
  delete: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error(`Error deleting vehicle ${id}:`, error);
        throw error;
      }
    } catch (error) {
      console.error("Error in vehicleAPI.delete:", error);
      throw error;
    }
  }
};
