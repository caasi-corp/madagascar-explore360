import { supabase } from "@/integrations/supabase/client";
import { Tour } from "../db/schema";

export const tourAPI = {
  // Get all tours
  getAll: async (): Promise<Tour[]> => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error retrieving tours:", error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in tourAPI.getAll:", error);
      throw error;
    }
  },
  
  // Get featured tours
  getFeatured: async (): Promise<Tour[]> => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error retrieving featured tours:", error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in tourAPI.getFeatured:", error);
      throw error;
    }
  },
  
  // Get a tour by ID
  getById: async (id: string): Promise<Tour | null> => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error retrieving tour ${id}:`, error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Error in tourAPI.getById:", error);
      throw error;
    }
  },
  
  // Get tours by category
  getByCategory: async (category: string): Promise<Tour[]> => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('category', category)
        .eq('active', true)
        .order('price', { ascending: true });
      
      if (error) {
        console.error(`Error retrieving tours of category ${category}:`, error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in tourAPI.getByCategory:", error);
      throw error;
    }
  },

  // Update the getRelated method to ensure type safety
  getRelated: async (tourId: string, limit: number = 3): Promise<Tour[]> => {
    try {
      // First get the tour to find its category
      const { data: tour, error: tourError } = await supabase
        .from('tours')
        .select('category')
        .eq('id', tourId)
        .single();
      
      if (tourError) {
        console.error(`Error retrieving tour ${tourId} for related tours:`, tourError);
        throw tourError;
      }
      
      if (!tour) {
        return [];
      }
      
      // Then get related tours with same category but different ID
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('category', tour.category)
        .neq('id', tourId)
        .eq('active', true)
        .limit(limit);
      
      if (error) {
        console.error(`Error retrieving related tours for ${tourId}:`, error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error("Error in tourAPI.getRelated:", error);
      throw error;
    }
  }
};
