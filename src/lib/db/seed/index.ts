
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
    
    // Si des utilisateurs existent déjà, on vérifie si c'est une première installation 
    // ou si la base de données est déjà initialisée
    if (existingUsers.length > 0) {
      console.log("Des utilisateurs existent déjà, vérification du contenu de la base...");
      
      // Vérifier si d'autres collections contiennent des données
      const tours = await db.getAll('tours');
      const vehicles = await db.getAll('vehicles');
      
      if (tours.length > 0 && vehicles.length > 0) {
        console.log("La base de données semble déjà complètement initialisée");
        return;
      }
      
      console.log("Certaines collections sont vides, on continue l'initialisation...");
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
