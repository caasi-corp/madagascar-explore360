
import { Database } from 'sql.js';
import { seedUsers } from './userSeed';
import { seedTours } from './tourSeed';
import { seedVehicles } from './vehicleSeed';
import { seedBookings } from './bookingSeed';
import { seedBanners } from './bannerSeed';
import { sqliteHelper } from '../helpers';

/**
 * Check if database is empty
 */
const isDatabaseEmpty = (db: Database): boolean => {
  const usersCount = sqliteHelper.queryAll(db, "SELECT COUNT(*) as count FROM users")[0].count;
  return usersCount === 0;
};

/**
 * Seeds the database with initial data
 */
export const seedDatabase = async (db: Database): Promise<boolean> => {
  console.log("Vérification si la base de données a besoin d'être initialisée...");
  
  try {
    const empty = isDatabaseEmpty(db);
    
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
