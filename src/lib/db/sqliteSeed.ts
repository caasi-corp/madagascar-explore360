
import { Database } from 'sql.js';
import { saveDatabase, sqliteHelper } from './sqlite';
import { seedUsers } from './seed/userSeed';
import { seedTours } from './seed/tourSeed';
import { seedVehicles } from './seed/vehicleSeed';
import { seedBookings } from './seed/bookingSeed';
import { seedBanners } from './seed/bannerSeed';

/**
 * Check if database is empty
 */
const isDatabaseEmpty = async (db: Database): Promise<boolean> => {
  const usersCount = sqliteHelper.queryAll(db, "SELECT COUNT(*) as count FROM users")[0].count;
  return usersCount === 0;
};

/**
 * Seeds the database with initial data
 */
export const seedDatabase = async (db: Database): Promise<boolean> => {
  console.log("Vérification si la base de données a besoin d'être initialisée...");
  
  try {
    const empty = await isDatabaseEmpty(db);
    
    if (empty) {
      console.log("Base de données vide, ajout des données initiales...");
      
      // Seed users (must succeed)
      if (!await seedUsers(db)) {
        throw new Error("Échec de l'ajout des utilisateurs");
      }
      
      // Seed other data (can fail without halting)
      await seedTours(db);
      await seedVehicles(db);
      await seedBookings(db);
      await seedBanners(db);
      
      // Save database after seeding
      await saveDatabase();
      
      return true;
    } else {
      console.log("Base de données déjà initialisée, pas besoin de l'alimenter");
      return true;
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données:", error);
    return false;
  }
};
