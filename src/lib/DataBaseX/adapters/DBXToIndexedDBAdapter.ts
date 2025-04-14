
/**
 * Adaptateur pour migrer les données d'IndexedDB vers DBX
 */
import { IDBPDatabase } from 'idb';
import { NorthGascarDB } from '../../db/schema';
import { dbxManager } from '../DBXManager';

/**
 * Migre les données d'IndexedDB vers DBX
 * @param db La connexion à la base de données IndexedDB
 */
export const migrateFromIndexedDBToDBX = async (db: IDBPDatabase<NorthGascarDB>): Promise<boolean> => {
  console.log("Début de la migration des données d'IndexedDB vers DBX...");
  
  try {
    // Migrer les utilisateurs
    console.log("Migration des utilisateurs...");
    const users = await db.getAll('users');
    if (users.length > 0) {
      dbxManager.writeDBX('users', users);
      console.log(`${users.length} utilisateurs migrés avec succès`);
    }
    
    // Migrer les circuits
    console.log("Migration des circuits...");
    const tours = await db.getAll('tours');
    if (tours.length > 0) {
      dbxManager.writeDBX('tours', tours);
      console.log(`${tours.length} circuits migrés avec succès`);
    }
    
    // Migrer les véhicules
    console.log("Migration des véhicules...");
    const vehicles = await db.getAll('vehicles');
    if (vehicles.length > 0) {
      dbxManager.writeDBX('vehicles', vehicles);
      console.log(`${vehicles.length} véhicules migrés avec succès`);
    }
    
    // Migrer les réservations
    console.log("Migration des réservations...");
    const bookings = await db.getAll('bookings');
    if (bookings.length > 0) {
      dbxManager.writeDBX('bookings', bookings);
      console.log(`${bookings.length} réservations migrées avec succès`);
    }
    
    // Migrer les hôtels (si présents)
    console.log("Migration des hôtels...");
    try {
      const hotels = await db.getAll('hotels');
      if (hotels.length > 0) {
        dbxManager.writeDBX('hotels', hotels);
        console.log(`${hotels.length} hôtels migrés avec succès`);
      }
    } catch (e) {
      console.log("Aucun hôtel à migrer ou store non disponible");
    }
    
    // Migrer les vols (si présents)
    console.log("Migration des vols...");
    try {
      const flights = await db.getAll('flights');
      if (flights.length > 0) {
        dbxManager.writeDBX('flights', flights);
        console.log(`${flights.length} vols migrés avec succès`);
      }
    } catch (e) {
      console.log("Aucun vol à migrer ou store non disponible");
    }
    
    console.log("Migration terminée avec succès!");
    return true;
  } catch (error) {
    console.error("Erreur lors de la migration:", error);
    return false;
  }
};

/**
 * Vérifie si des données existent dans DBX
 * Retourne true si des données existent, false sinon
 */
export const checkDBXData = (): boolean => {
  const users = dbxManager.readDBX('users');
  return users.length > 0;
};
