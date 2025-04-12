
import { seedTours } from './tourSeed';
import { seedVehicles } from './vehicleSeed';
import { seedUsers } from './userSeed';
import { seedBookings } from './bookingSeed';
import { seedPhotos } from '../../api/photoAPI';

// Export all seed functions
export const seedAll = async () => {
  await seedTours();
  await seedVehicles();
  await seedUsers();
  await seedBookings();
  await seedPhotos();
};

export { seedTours, seedVehicles, seedUsers, seedBookings, seedPhotos };
