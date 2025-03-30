
import { IDBPDatabase } from 'idb';
import { NorthGascarDB } from '../schema';
import { seedUsers } from './userSeed';
import { seedTours } from './tourSeed';
import { seedVehicles } from './vehicleSeed';
import { seedBookings } from './bookingSeed';

/**
 * Seeds the database with initial data
 * @param db The database connection
 */
export const seedData = async (db: IDBPDatabase<NorthGascarDB>) => {
  console.log("Début du processus de seed de la base de données");
  
  try {
    // Vérifier d'abord si des données existent déjà
    const existingUsers = await db.getAll('users');
    if (existingUsers.length > 0) {
      console.log("Des utilisateurs existent déjà, le seed ne sera pas exécuté");
      return;
    }
    
    // Seed users first - CRITICAL
    await seedUsers(db);
    
    // Seed other data only if users were successfully added
    await seedTours(db);
    await seedVehicles(db);
    await seedBookings(db);
    
    console.log("Seed de la base de données terminé avec succès");
  } catch (error) {
    console.error("Erreur générale durant le seed de la base de données:", error);
    throw error;
  }
};
