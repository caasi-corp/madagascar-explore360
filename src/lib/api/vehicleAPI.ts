
import { supabase } from '@/integrations/supabase/client';

export const vehicleAPI = {
  // Récupérer tous les véhicules
  async getAll() {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Erreur lors de la récupération des véhicules:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer les véhicules mis en avant
  async getFeatured() {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('featured', true)
      .eq('availability', true)
      .order('priceperday', { ascending: true });
    
    if (error) {
      console.error('Erreur lors de la récupération des véhicules mis en avant:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer un véhicule par ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Erreur lors de la récupération du véhicule ${id}:`, error);
      return null;
    }
    
    return data;
  },
  
  // Créer un nouveau véhicule
  async create(vehicle: any) {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([
        {
          name: vehicle.name,
          type: vehicle.type,
          seats: vehicle.seats,
          transmission: vehicle.transmission,
          fueltype: vehicle.fueltype,
          features: vehicle.features || [],
          priceperday: vehicle.priceperday,
          availability: vehicle.availability !== undefined ? vehicle.availability : true,
          featured: vehicle.featured !== undefined ? vehicle.featured : false,
          image: vehicle.image,
          images: vehicle.images || [],
          description: vehicle.description
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de la création du véhicule:', error);
      throw error;
    }
    
    return data;
  },
  
  // Mettre à jour un véhicule
  async update(id: string, vehicleData: any) {
    const { data, error } = await supabase
      .from('vehicles')
      .update({
        name: vehicleData.name,
        type: vehicleData.type,
        seats: vehicleData.seats,
        transmission: vehicleData.transmission,
        fueltype: vehicleData.fueltype,
        features: vehicleData.features,
        priceperday: vehicleData.priceperday,
        availability: vehicleData.availability,
        featured: vehicleData.featured,
        image: vehicleData.image,
        images: vehicleData.images,
        description: vehicleData.description
      })
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
  async delete(id: string) {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Erreur lors de la suppression du véhicule ${id}:`, error);
      throw error;
    }
    
    return true;
  },
  
  // Mettre à jour le statut de disponibilité d'un véhicule
  async toggleAvailability(id: string, availability: boolean) {
    const { data, error } = await supabase
      .from('vehicles')
      .update({ availability })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour de la disponibilité du véhicule ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Mettre à jour le statut mis en avant d'un véhicule
  async toggleFeatured(id: string, featured: boolean) {
    const { data, error } = await supabase
      .from('vehicles')
      .update({ featured })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour du statut mis en avant du véhicule ${id}:`, error);
      throw error;
    }
    
    return data;
  }
};
