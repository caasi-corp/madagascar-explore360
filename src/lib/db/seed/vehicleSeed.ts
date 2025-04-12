
import { IDBPDatabase } from 'idb';
import { NorthGascarDB, Vehicle } from '../schema';

/**
 * Seeds vehicle data into the database
 * @param db The database connection
 */
export const seedVehicles = async (db: IDBPDatabase<NorthGascarDB>): Promise<void> => {
  console.log("Vérification des véhicules...");
  
  try {
    // Vérifier si des véhicules existent déjà
    const existingVehicles = await db.count('vehicles');
    if (existingVehicles > 0) {
      console.log(`${existingVehicles} véhicules existent déjà dans la base de données`);
      return;
    }
    
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
        image: 'https://images.unsplash.com/photo-1566845735839-6e25c92269a1',
        features: ['Casque inclus', 'Coffre de rangement', 'Transmission 4x4', 'Garde au sol élevée'],
        availability: true,
      },
    ];
    
    try {
      const vehiclesTx = db.transaction('vehicles', 'readwrite');
      const vehiclesStore = vehiclesTx.objectStore('vehicles');
      for (const vehicle of vehicles) {
        try {
          await vehiclesStore.put(vehicle);
        } catch (err) {
          console.warn(`Impossible d'ajouter le véhicule ${vehicle.id}, il existe peut-être déjà.`);
        }
      }
      await vehiclesTx.done;
      console.log("Véhicules ajoutés avec succès");
    } catch (err) {
      console.error("Erreur lors de la transaction d'ajout de véhicules:", err);
    }
  } catch (e) {
    console.error("Erreur lors de l'ajout des véhicules:", e);
  }
};
