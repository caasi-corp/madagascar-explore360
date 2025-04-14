import { supabase } from '@/integrations/supabase/client';
import { mapSupabaseVehicle } from '@/types/supabase';

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
    
    return data.map(vehicle => mapSupabaseVehicle(vehicle)) || [];
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
    
    return mapSupabaseVehicle(data);
  },
  
  // Ajouter un nouveau véhicule
  async add(vehicle: any) {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([
        {
          name: vehicle.name,
          type: vehicle.type,
          priceperday: vehicle.pricePerDay,
          seats: vehicle.seats,
          transmission: vehicle.transmission,
          fueltype: vehicle.fuelType,
          image: vehicle.image,
          features: vehicle.features,
          availability: vehicle.availability,
          description: vehicle.description,
          featured: vehicle.featured || false,
          images: vehicle.images || []
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de la création du véhicule:', error);
      throw error;
    }
    
    return mapSupabaseVehicle(data);
  },
  
  // Mettre à jour un véhicule
  async update(id: string, vehicle: any) {
    const { data, error } = await supabase
      .from('vehicles')
      .update({
        name: vehicle.name,
        type: vehicle.type,
        priceperday: vehicle.pricePerDay,
        seats: vehicle.seats,
        transmission: vehicle.transmission,
        fueltype: vehicle.fuelType,
        image: vehicle.image,
        features: vehicle.features,
        availability: vehicle.availability,
        description: vehicle.description,
        featured: vehicle.featured
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour du véhicule ${id}:`, error);
      throw error;
    }
    
    return mapSupabaseVehicle(data);
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
