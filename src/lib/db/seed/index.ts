
import { IDBPDatabase } from 'idb';
import { NorthGascarDB } from '../schema';
import { seedTours } from './tourSeed';
import { seedVehicles } from './vehicleSeed';
import { seedUsers } from './userSeed';
import { seedBookings } from './bookingSeed';
import { seedBanners } from './bannerSeed';

/**
 * Seeds the database with initial data
 * @param db The database connection
 * @returns Whether the seeding was successful
 */
export const seedDatabase = async (db: IDBPDatabase<NorthGascarDB>): Promise<boolean> => {
  try {
    // Seed the database with users (this is critical, so we throw if it fails)
    await seedUsers(db);
    
    // Seed the rest of the data (these are not critical, so we catch errors internally)
    await seedTours(db);
    await seedVehicles(db);
    await seedBookings(db);
    await seedBanners(db);
    
    return true;
  } catch (e) {
    console.error("Erreur critique lors de l'initialisation de la base de données:", e);
    return false;
  }
};
