
import { SQLiteDatabase } from '../types';
import { sqliteHelper } from '../helpers';
import { seedTours } from './tourSeed';
import { seedUsers } from './userSeed';
import { seedVehicles } from './vehicleSeed';
import { seedBookings } from './bookingSeed';
import { seedBanners } from './bannerSeed';

/**
 * Seeds the database with initial data
 * @param db The database to seed
 * @param force Force seeding even if the database already has data
 * @returns Whether seeding was successful
 */
export const seedSQLiteDatabase = async (
  db: SQLiteDatabase,
  force: boolean = false
): Promise<boolean> => {
  console.log("Vérification si la base de données a besoin d'être initialisée...");
  
  try {
    // Check if we already have data
    if (!force) {
      const userCount = sqliteHelper.queryOne(db, "SELECT COUNT(*) as count FROM users");
      if (userCount && userCount.count > 0) {
        console.log("Base de données déjà initialisée, pas besoin de l'alimenter");
        return true;
      }
    }
    
    console.log("Alimentation de la base de données avec les données initiales...");
    
    // Seed all tables
    await seedUsers(db);
    await seedTours(db);
    await seedVehicles(db);
    await seedBookings(db);
    await seedBanners(db);
    
    console.log("Base de données alimentée avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'alimentation de la base de données:", error);
    return false;
  }
};
