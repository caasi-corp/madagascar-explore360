
import { supabase } from '@/integrations/supabase/client';
import { Vehicle } from '@/lib/db/schema';

/**
 * API pour les opérations sur les véhicules via Supabase
 */
export const vehicleSupabaseAPI = {
  getAll: async (): Promise<Vehicle[]> => {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*');
    
    if (error) {
      console.error('Erreur lors de la récupération des véhicules:', error);
      throw error;
    }
    
    return data.map(vehicle => ({
      id: vehicle.id,
      name: vehicle.name,
      type: vehicle.type,
      pricePerDay: vehicle.pricePerDay,
      seats: vehicle.seats,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuelType,
      image: vehicle.image,
      features: vehicle.features,
      availability: vehicle.availability !== false,
      description: vehicle.description || '',
      featured: vehicle.featured || false,
      images: vehicle.images || []
    }));
  },
  
  getById: async (id: string): Promise<Vehicle | null> => {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Véhicule non trouvé
      }
      console.error(`Erreur lors de la récupération du véhicule ${id}:`, error);
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      pricePerDay: data.pricePerDay,
      seats: data.seats,
      transmission: data.transmission,
      fuelType: data.fuelType,
      image: data.image,
      features: data.features,
      availability: data.availability !== false,
      description: data.description || '',
      featured: data.featured || false,
      images: data.images || []
    };
  },
  
  add: async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([vehicle])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de l\'ajout du véhicule:', error);
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      pricePerDay: data.pricePerDay,
      seats: data.seats,
      transmission: data.transmission,
      fuelType: data.fuelType,
      image: data.image,
      features: data.features,
      availability: data.availability !== false,
      description: data.description || '',
      featured: data.featured || false,
      images: data.images || []
    };
  },
  
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
    
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      pricePerDay: data.pricePerDay,
      seats: data.seats,
      transmission: data.transmission,
      fuelType: data.fuelType,
      image: data.image,
      features: data.features,
      availability: data.availability !== false,
      description: data.description || '',
      featured: data.featured || false,
      images: data.images || []
    };
  },
  
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
