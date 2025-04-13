
import { IDBPDatabase } from 'idb';
import { NorthGascarDB } from './schema';
import { seedUsers } from './seed/userSeed';
import { seedTours } from './seed/tourSeed';
import { seedVehicles } from './seed/vehicleSeed';
import { seedBookings } from './seed/bookingSeed';
import { seedBanners } from './seed/bannerSeed';

/**
 * Seeds the database with initial data
 * @param db The IDBPDatabase connection
 */
export const seedIDBDatabase = async (db: IDBPDatabase<NorthGascarDB>): Promise<boolean> => {
  console.log("Vérification si la base de données IndexedDB a besoin d'être initialisée...");
  
  try {
    // Check if users exist
    const usersCount = await db.count('users');
    const empty = usersCount === 0;
    
    if (empty) {
      console.log("Base de données IndexedDB vide, ajout des données initiales...");
      
      // Seed users first (must succeed)
      try {
        await seedUsers(db);
      } catch (error) {
        console.error("Échec de l'ajout des utilisateurs:", error);
        throw new Error("Échec de l'ajout des utilisateurs");
      }
      
      // Seed other data (can fail without halting)
      try { await seedTours(db); } catch (e) { console.error("Erreur lors de l'ajout des tours:", e); }
      try { await seedVehicles(db); } catch (e) { console.error("Erreur lors de l'ajout des véhicules:", e); }
      try { await seedBookings(db); } catch (e) { console.error("Erreur lors de l'ajout des réservations:", e); }
      try { await seedBanners(db); } catch (e) { console.error("Erreur lors de l'ajout des bannières:", e); }
      
      return true;
    } else {
      console.log("Base de données IndexedDB déjà initialisée, pas besoin de l'alimenter");
      return true;
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données IndexedDB:", error);
    return false;
  }
};
