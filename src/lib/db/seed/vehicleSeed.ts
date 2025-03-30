
import { IDBPDatabase } from 'idb';
import { NorthGascarDB, Vehicle } from '../schema';

/**
 * Seeds vehicle data into the database
 * @param db The database connection
 */
export const seedVehicles = async (db: IDBPDatabase<NorthGascarDB>): Promise<void> => {
  console.log("Ajout des véhicules...");
  
  const vehicles: Vehicle[] = [
    {
      id: 'v1',
      name: 'Toyota Land Cruiser',
      type: '4x4',
      pricePerDay: 89,
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
      features: ['Climatisation', 'GPS', 'Galerie de toit', '4x4', 'Bluetooth', 'Ports USB'],
      availability: true,
    },
    {
      id: 'v2',
      name: 'Yamaha TW200',
      type: 'motorcycle',
      pricePerDay: 45,
      seats: 2,
      transmission: 'Manual',
      fuelType: 'Petrol',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
      features: ['Casque inclus', 'Sacoches', 'Capacité tout-terrain', 'Économe en carburant'],
      availability: true,
    },
    {
      id: 'v3',
      name: 'BRP Can-Am Outlander',
      type: 'quad',
      pricePerDay: 65,
      seats: 1,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      image: 'https://images.unsplash.com/photo-1628985816814-b5ce00832b6a',
      features: ['Casque inclus', 'Coffre de rangement', 'Transmission 4x4', 'Garde au sol élevée'],
      availability: true,
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
