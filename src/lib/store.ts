
/**
 * Re-export all database models and APIs
 */
export * from './db/schema';
export { tourAPI } from './api/tourAPI';
export { vehicleAPI } from './api/vehicleAPI';
export { userAPI } from './api/userAPI';
export { bookingAPI } from './api/bookingAPI';
export { fileAPI } from './api/fileAPI';

// Utilisation d'imports dynamiques pour eviter les erreurs
export const initDB = async () => {
  const module = await import('./db/db');
  return module.initDB();
};
