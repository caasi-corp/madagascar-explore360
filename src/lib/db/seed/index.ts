
import { seedTours } from './tourSeed';
import { seedVehicles } from './vehicleSeed';
import { seedUsers } from './userSeed';
import { seedBookings } from './bookingSeed';
import { seedPhotos } from '../../api/photoAPI';
import { getDB } from '../db';

// Export all seed functions
export const seedAll = async () => {
  const db = await getDB();
  await seedTours(db);
  await seedVehicles(db);
  await seedUsers(db);
  await seedBookings(db);
  await seedPhotos();
};

export { seedTours, seedVehicles, seedUsers, seedBookings, seedPhotos };
