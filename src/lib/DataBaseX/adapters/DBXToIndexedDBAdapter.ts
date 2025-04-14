
/**
 * Adaptateur pour convertir les données entre IndexedDB et les fichiers DBX
 * Permet une transition en douceur vers le nouveau système
 */
import { IDBPDatabase } from 'idb';
import { NorthGascarDB, Tour, Vehicle, User, Booking, Hotel, Flight } from '../../db/schema';
import { dbxManager, DBXDataType } from '../DBXManager';

/**
 * Convertit les données d'IndexedDB vers des fichiers DBX
 */
export const migrateFromIndexedDBToDBX = async (db: IDBPDatabase<NorthGascarDB>): Promise<void> => {
  console.log("Migration des données depuis IndexedDB vers DBX...");
  
  try {
    // Migration des tours
    const tours = await db.getAll('tours');
    dbxManager.writeDBX<Tour>('tours', tours);
    console.log(`${tours.length} tours migrés vers DBX`);
    
    // Migration des véhicules
    const vehicles = await db.getAll('vehicles');
    dbxManager.writeDBX<Vehicle>('vehicles', vehicles);
    console.log(`${vehicles.length} véhicules migrés vers DBX`);
    
    // Migration des utilisateurs
    const users = await db.getAll('users');
    dbxManager.writeDBX<User>('users', users);
    console.log(`${users.length} utilisateurs migrés vers DBX`);
    
    // Migration des réservations
    const bookings = await db.getAll('bookings');
    dbxManager.writeDBX<Booking>('bookings', bookings);
    console.log(`${bookings.length} réservations migrées vers DBX`);
    
    // Migration des hôtels (si présents)
    try {
      const hotels = await db.getAll('hotels');
      dbxManager.writeDBX<Hotel>('hotels', hotels);
      console.log(`${hotels.length} hôtels migrés vers DBX`);
    } catch (e) {
      console.log("Pas de migration d'hôtels - table non trouvée");
    }
    
    // Migration des vols (si présents)
    try {
      const flights = await db.getAll('flights');
      dbxManager.writeDBX<Flight>('flights', flights);
      console.log(`${flights.length} vols migrés vers DBX`);
    } catch (e) {
      console.log("Pas de migration de vols - table non trouvée");
    }
    
    console.log("Migration des données vers DBX terminée avec succès");
  } catch (error) {
    console.error("Erreur lors de la migration vers DBX:", error);
  }
};
