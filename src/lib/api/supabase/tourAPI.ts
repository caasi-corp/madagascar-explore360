
import { supabase } from '@/integrations/supabase/client';
import { Tour } from '@/lib/db/schema';

/**
 * API pour les opérations sur les circuits touristiques via Supabase
 */
export const tourSupabaseAPI = {
  getAll: async (): Promise<Tour[]> => {
    const { data, error } = await supabase
      .from('tours')
      .select('*');
    
    if (error) {
      console.error('Erreur lors de la récupération des circuits:', error);
      throw error;
    }
    
    return data.map(tour => ({
      id: tour.id,
      title: tour.title,
      description: tour.description,
      location: tour.location,
      duration: tour.duration,
      price: tour.price,
      rating: tour.rating,
      image: tour.image,
      featured: tour.featured || false,
      category: tour.category || '',
      active: tour.active !== false
    }));
  },
  
  getById: async (id: string): Promise<Tour | null> => {
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
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      location: data.location,
      duration: data.duration,
      price: data.price,
      rating: data.rating,
      image: data.image,
      featured: data.featured || false,
      category: data.category || '',
      active: data.active !== false
    };
  },
  
  getFeatured: async (): Promise<Tour[]> => {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('featured', true)
      .eq('active', true);
    
    if (error) {
      console.error('Erreur lors de la récupération des circuits mis en avant:', error);
      throw error;
    }
    
    return data.map(tour => ({
      id: tour.id,
      title: tour.title,
      description: tour.description,
      location: tour.location,
      duration: tour.duration,
      price: tour.price,
      rating: tour.rating,
      image: tour.image,
      featured: tour.featured || false,
      category: tour.category || '',
      active: tour.active !== false
    }));
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
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      location: data.location,
      duration: data.duration,
      price: data.price,
      rating: data.rating,
      image: data.image,
      featured: data.featured || false,
      category: data.category || '',
      active: data.active !== false
    };
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
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      location: data.location,
      duration: data.duration,
      price: data.price,
      rating: data.rating,
      image: data.image,
      featured: data.featured || false,
      category: data.category || '',
      active: data.active !== false
    };
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
