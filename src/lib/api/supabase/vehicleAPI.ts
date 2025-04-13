
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
      type: vehicle.type as "car" | "4x4" | "motorcycle" | "quad",
      pricePerDay: vehicle.priceperday,
      seats: vehicle.seats,
      transmission: vehicle.transmission as "Automatic" | "Manual",
      fuelType: vehicle.fueltype,
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
      type: data.type as "car" | "4x4" | "motorcycle" | "quad",
      pricePerDay: data.priceperday,
      seats: data.seats,
      transmission: data.transmission as "Automatic" | "Manual",
      fuelType: data.fueltype,
      image: data.image,
      features: data.features,
      availability: data.availability !== false,
      description: data.description || '',
      featured: data.featured || false,
      images: data.images || []
    };
  },
  
  add: async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    // Transformer l'objet Vehicle pour correspondre au schéma de la table Supabase
    const vehicleData = {
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
      featured: vehicle.featured,
      images: vehicle.images
    };
    
    const { data, error } = await supabase
      .from('vehicles')
      .insert([vehicleData])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de l\'ajout du véhicule:', error);
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      type: data.type as "car" | "4x4" | "motorcycle" | "quad",
      pricePerDay: data.priceperday,
      seats: data.seats,
      transmission: data.transmission as "Automatic" | "Manual",
      fuelType: data.fueltype,
      image: data.image,
      features: data.features,
      availability: data.availability !== false,
      description: data.description || '',
      featured: data.featured || false,
      images: data.images || []
    };
  },
  
  update: async (id: string, updates: Partial<Vehicle>): Promise<Vehicle> => {
    // Transformer les mises à jour pour correspondre au schéma de la table Supabase
    const vehicleUpdates: any = {};
    
    if (updates.name) vehicleUpdates.name = updates.name;
    if (updates.type) vehicleUpdates.type = updates.type;
    if (updates.pricePerDay !== undefined) vehicleUpdates.priceperday = updates.pricePerDay;
    if (updates.seats !== undefined) vehicleUpdates.seats = updates.seats;
    if (updates.transmission) vehicleUpdates.transmission = updates.transmission;
    if (updates.fuelType) vehicleUpdates.fueltype = updates.fuelType;
    if (updates.image) vehicleUpdates.image = updates.image;
    if (updates.features) vehicleUpdates.features = updates.features;
    if (updates.availability !== undefined) vehicleUpdates.availability = updates.availability;
    if (updates.description !== undefined) vehicleUpdates.description = updates.description;
    if (updates.featured !== undefined) vehicleUpdates.featured = updates.featured;
    if (updates.images) vehicleUpdates.images = updates.images;
    
    const { data, error } = await supabase
      .from('vehicles')
      .update(vehicleUpdates)
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
      type: data.type as "car" | "4x4" | "motorcycle" | "quad",
      pricePerDay: data.priceperday,
      seats: data.seats,
      transmission: data.transmission as "Automatic" | "Manual",
      fuelType: data.fueltype,
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
