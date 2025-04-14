
/**
 * Exporte toutes les fonctionnalités de la base de données DBX
 */
export * from './DBXManager';
export { DBXTourAdapter } from './adapters/DBXTourAdapter';
export { DBXVehicleAdapter } from './adapters/DBXVehicleAdapter';
export { DBXUserAdapter } from './adapters/DBXUserAdapter';
export { DBXBookingAdapter } from './adapters/DBXBookingAdapter';
export { initializeDBXData } from './seed/dbxSeedManager';
export { migrateFromIndexedDBToDBX } from './adapters/DBXToIndexedDBAdapter';
