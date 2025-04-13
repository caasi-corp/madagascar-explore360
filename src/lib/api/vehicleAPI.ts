
import { getDB, saveDatabase, sqliteHelper } from '../db/sqlite';
import { Vehicle } from '../db/schema';

/**
 * API for vehicle operations
 */
export const vehicleAPI = {
  getAll: async () => {
    const db = await getDB();
    const vehicles = sqliteHelper.queryAll(db, "SELECT * FROM vehicles");
    
    return vehicles.map(vehicle => ({
      ...vehicle,
      features: JSON.parse(vehicle.features),
      images: vehicle.images ? JSON.parse(vehicle.images) : undefined,
      availability: Boolean(vehicle.availability),
      featured: vehicle.featured ? Boolean(vehicle.featured) : undefined
    })) as Vehicle[];
  },
  
  getById: async (id: string) => {
    const db = await getDB();
    const vehicle = sqliteHelper.queryOne(db, "SELECT * FROM vehicles WHERE id = $id", { $id: id });
    
    if (!vehicle) return null;
    
    return {
      ...vehicle,
      features: JSON.parse(vehicle.features),
      images: vehicle.images ? JSON.parse(vehicle.images) : undefined,
      availability: Boolean(vehicle.availability),
      featured: vehicle.featured ? Boolean(vehicle.featured) : undefined
    } as Vehicle;
  },
  
  getByType: async (type: string) => {
    const db = await getDB();
    const vehicles = sqliteHelper.queryAll(db, "SELECT * FROM vehicles WHERE type = $type", { $type: type });
    
    return vehicles.map(vehicle => ({
      ...vehicle,
      features: JSON.parse(vehicle.features),
      images: vehicle.images ? JSON.parse(vehicle.images) : undefined,
      availability: Boolean(vehicle.availability),
      featured: vehicle.featured ? Boolean(vehicle.featured) : undefined
    })) as Vehicle[];
  },
  
  getAvailable: async () => {
    const db = await getDB();
    const vehicles = sqliteHelper.queryAll(db, "SELECT * FROM vehicles WHERE availability = 1");
    
    return vehicles.map(vehicle => ({
      ...vehicle,
      features: JSON.parse(vehicle.features),
      images: vehicle.images ? JSON.parse(vehicle.images) : undefined,
      availability: Boolean(vehicle.availability),
      featured: vehicle.featured ? Boolean(vehicle.featured) : undefined
    })) as Vehicle[];
  },
  
  add: async (vehicle: Omit<Vehicle, 'id'>) => {
    const db = await getDB();
    const id = crypto.randomUUID();
    
    sqliteHelper.execute(
      db,
      `INSERT INTO vehicles (
        id, name, type, pricePerDay, seats, transmission, fuelType, 
        image, features, availability, description, featured, images
      ) VALUES (
        $id, $name, $type, $pricePerDay, $seats, $transmission, $fuelType, 
        $image, $features, $availability, $description, $featured, $images
      )`,
      {
        $id: id,
        $name: vehicle.name,
        $type: vehicle.type,
        $pricePerDay: vehicle.pricePerDay,
        $seats: vehicle.seats,
        $transmission: vehicle.transmission,
        $fuelType: vehicle.fuelType,
        $image: vehicle.image,
        $features: JSON.stringify(vehicle.features),
        $availability: vehicle.availability ? 1 : 0,
        $description: vehicle.description || null,
        $featured: vehicle.featured ? 1 : 0,
        $images: vehicle.images ? JSON.stringify(vehicle.images) : null
      }
    );
    
    await saveDatabase();
    
    return {
      ...vehicle,
      id
    } as Vehicle;
  },
  
  update: async (id: string, vehicle: Partial<Vehicle>) => {
    const db = await getDB();
    const existingVehicle = await vehicleAPI.getById(id);
    
    if (!existingVehicle) {
      throw new Error('Vehicle not found');
    }
    
    const updatedVehicle = { ...existingVehicle, ...vehicle };
    
    sqliteHelper.execute(
      db,
      `UPDATE vehicles SET 
        name = $name, 
        type = $type, 
        pricePerDay = $pricePerDay, 
        seats = $seats, 
        transmission = $transmission, 
        fuelType = $fuelType, 
        image = $image, 
        features = $features, 
        availability = $availability, 
        description = $description, 
        featured = $featured, 
        images = $images
       WHERE id = $id`,
      {
        $id: id,
        $name: updatedVehicle.name,
        $type: updatedVehicle.type,
        $pricePerDay: updatedVehicle.pricePerDay,
        $seats: updatedVehicle.seats,
        $transmission: updatedVehicle.transmission,
        $fuelType: updatedVehicle.fuelType,
        $image: updatedVehicle.image,
        $features: JSON.stringify(updatedVehicle.features),
        $availability: updatedVehicle.availability ? 1 : 0,
        $description: updatedVehicle.description || null,
        $featured: updatedVehicle.featured ? 1 : 0,
        $images: updatedVehicle.images ? JSON.stringify(updatedVehicle.images) : null
      }
    );
    
    await saveDatabase();
    
    return updatedVehicle;
  },
  
  delete: async (id: string) => {
    const db = await getDB();
    sqliteHelper.execute(db, "DELETE FROM vehicles WHERE id = $id", { $id: id });
    await saveDatabase();
  },
};
