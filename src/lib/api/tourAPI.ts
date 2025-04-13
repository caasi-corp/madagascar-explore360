
import { supabase } from "@/integrations/supabase/client";
import { Tour } from "../db/schema";

export const tourAPI = {
  // Récupérer tous les circuits
  getAll: async (): Promise<Tour[]> => {
    const { data, error } = await supabase
      .from('tours')
      .select('*');
    
    if (error) {
      console.error("Erreur lors de la récupération des circuits:", error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer les circuits mis en avant
  getFeatured: async (): Promise<Tour[]> => {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('featured', true)
      .eq('active', true);
    
    if (error) {
      console.error("Erreur lors de la récupération des circuits en vedette:", error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer un circuit par son ID
  getById: async (id: string): Promise<Tour | null> => {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Erreur lors de la récupération du circuit ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Récupérer des circuits similaires (même catégorie, sauf le circuit actuel)
  getRelated: async (currentId: string, category: string): Promise<Tour[]> => {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('category', category)
      .eq('active', true)
      .neq('id', currentId)
      .limit(4);
    
    if (error) {
      console.error("Erreur lors de la récupération des circuits similaires:", error);
      throw error;
    }
    
    return data || [];
  },
  
  // Ajouter un nouveau circuit
  create: async (tour: Omit<Tour, 'id'>): Promise<Tour> => {
    const { data, error } = await supabase
      .from('tours')
      .insert([tour])
      .select()
      .single();
    
    if (error) {
      console.error("Erreur lors de la création du circuit:", error);
      throw error;
    }
    
    return data;
  },
  
  // Mettre à jour un circuit existant
  update: async (id: string, updates: Partial<Tour>): Promise<Tour> => {
    const { data, error } = await supabase
      .from('tours')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour du circuit ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Supprimer un circuit
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('tours')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Erreur lors de la suppression du circuit ${id}:`, error);
      throw error;
    }
  }
};
