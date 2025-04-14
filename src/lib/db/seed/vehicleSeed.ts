import { IDBPDatabase } from 'idb';
import { Vehicle } from '../schema';

/**
 * Seeds vehicle data into the database
 * @param db The database connection
 */
export const seedVehicles = async (db: any): Promise<void> => {
  console.log("Ajout des véhicules...");
  
  const vehicles: Vehicle[] = [
    {
      id: 'v1',
      name: 'Toyota Land Cruiser',
      type: '4x4',
      description: 'Véhicule 4x4 robuste, parfait pour les terrains difficiles de Madagascar.',
      seats: 7,
      transmission: 'Manual',
      fueltype: 'Diesel',
      priceperday: 80,
      image: 'https://images.unsplash.com/photo-1455310485008-41f674535f7e',
      images: [],
      features: ['4x4', 'Climatisation', 'GPS', 'Bluetooth'],
      featured: true,
      availability: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'v2',
      name: 'Yamaha TW200',
      type: 'motorcycle',
      description: 'Véhicule moto compact, idéal pour les trajets courts.',
      seats: 2,
      transmission: 'Manual',
      fueltype: 'Petrol',
      priceperday: 45,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
      images: [],
      features: ['Casque inclus', 'Sacoches', 'Capacité tout-terrain', 'Économe en carburant'],
      featured: true,
      availability: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'v3',
      name: 'BRP Can-Am Outlander',
      type: 'quad',
      description: 'Véhicule quad robuste, idéal pour les terrains difficiles.',
      seats: 1,
      transmission: 'Automatic',
      fueltype: 'Petrol',
      priceperday: 65,
      image: 'https://images.unsplash.com/photo-1566845735839-6e25c92269a1',
      images: [],
      features: ['Casque inclus', 'Coffre de rangement', 'Transmission 4x4', 'Garde au sol élevée'],
      featured: true,
      availability: true,
      created_at: new Date().toISOString()
    },
  ];
  
  try {
    const vehiclesTx = db.transaction('vehicles', 'readwrite');
    const vehiclesStore = vehiclesTx.objectStore('vehicles');
    for (const vehicle of vehicles) {
      await vehiclesStore.put(vehicle);
    }
    await vehiclesTx.done;
    console.log("Véhicules ajoutés avec succès");
  } catch (e) {
    console.error("Erreur lors de l'ajout des véhicules:", e);
  }
};
