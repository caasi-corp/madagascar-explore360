
import { supabase } from '@/integrations/supabase/client';
import { Tour } from '@/lib/db/schema';

/**
 * API pour les opérations sur les circuits via Supabase
 */
export const tourSupabaseAPI = {
  getAll: async (): Promise<Tour[]> => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*');
      
      if (error) {
        console.error('Erreur lors de la récupération des circuits:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception lors de la récupération des circuits:', error);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  },
  
  getById: async (id: string): Promise<Tour | null> => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Circuit non trouvé
        }
        console.error(`Erreur lors de la récupération du circuit ${id}:`, error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error(`Exception lors de la récupération du circuit ${id}:`, error);
      return null;
    }
  },
  
  getFeatured: async (): Promise<Tour[]> => {
    try {
      // Éviter les politiques RLS qui causent la récursion infinie
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('featured', true)
        .eq('active', true);
      
      if (error) {
        console.error('Erreur lors de la récupération des circuits mis en avant:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception lors de la récupération des circuits mis en avant:', error);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  },
  
  getRelated: async (tourId: string, category: string): Promise<Tour[]> => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('category', category)
        .eq('active', true)
        .neq('id', tourId)
        .limit(4);
      
      if (error) {
        console.error(`Erreur lors de la récupération des circuits similaires pour ${tourId}:`, error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error(`Exception lors de la récupération des circuits similaires pour ${tourId}:`, error);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  },
  
  add: async (tour: Omit<Tour, 'id'>): Promise<Tour> => {
    const { data, error } = await supabase
      .from('tours')
      .insert([tour])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de l\'ajout du circuit:', error);
      throw error;
    }
    
    return data;
  },
  
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
