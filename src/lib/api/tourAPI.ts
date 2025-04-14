
import { supabase } from '@/integrations/supabase/client';

export const tourAPI = {
  // Récupérer tous les tours
  async getAll() {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('title', { ascending: true });
    
    if (error) {
      console.error('Erreur lors de la récupération des tours:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer les tours mis en avant
  async getFeatured() {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('featured', true)
      .eq('active', true)
      .order('rating', { ascending: false });
    
    if (error) {
      console.error('Erreur lors de la récupération des tours mis en avant:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer un tour par ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Erreur lors de la récupération du tour ${id}:`, error);
      return null;
    }
    
    return data;
  },
  
  // Créer un nouveau tour
  async create(tour: any) {
    const { data, error } = await supabase
      .from('tours')
      .insert([
        {
          title: tour.title,
          description: tour.description,
          location: tour.location,
          duration: tour.duration,
          price: tour.price,
          rating: tour.rating || 0,
          image: tour.image,
          category: tour.category,
          active: tour.active !== undefined ? tour.active : true,
          featured: tour.featured !== undefined ? tour.featured : false
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de la création du tour:', error);
      throw error;
    }
    
    return data;
  },
  
  // Mettre à jour un tour
  async update(id: string, tourData: any) {
    const { data, error } = await supabase
      .from('tours')
      .update({
        title: tourData.title,
        description: tourData.description,
        location: tourData.location,
        duration: tourData.duration,
        price: tourData.price,
        rating: tourData.rating,
        image: tourData.image,
        category: tourData.category,
        active: tourData.active,
        featured: tourData.featured
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour du tour ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Supprimer un tour
  async delete(id: string) {
    const { error } = await supabase
      .from('tours')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Erreur lors de la suppression du tour ${id}:`, error);
      throw error;
    }
    
    return true;
  },
  
  // Mettre à jour le statut actif d'un tour
  async toggleStatus(id: string, active: boolean) {
    const { data, error } = await supabase
      .from('tours')
      .update({ active })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour du statut du tour ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Mettre à jour le statut mis en avant d'un tour
  async toggleFeatured(id: string, featured: boolean) {
    const { data, error } = await supabase
      .from('tours')
      .update({ featured })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour du statut mis en avant du tour ${id}:`, error);
      throw error;
    }
    
    return data;
  }
};
