
/**
 * Re-export all database models and APIs
 */

// Exporter les schémas de données
export * from './db/schema';

// Exporter les API IndexedDB (ancienne implémentation)
export { initDB } from './db/db';
export { tourAPI } from './api/tourAPI';
export { vehicleAPI } from './api/vehicleAPI';
export { userAPI } from './api/userAPI';
export { bookingAPI } from './api/bookingAPI';

// Exporter les API DBX (nouvelle implémentation)
export { initDBX, dbxAPI, migrateToDBX, resetDBX } from './dbx';
