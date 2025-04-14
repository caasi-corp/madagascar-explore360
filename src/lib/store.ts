
/**
 * Re-export all database models and APIs
 */

// Exporter les schémas de données
export * from './db/schema';

// Exporter les API IndexedDB (ancienne implémentation)
export { initDB, getDB, resetDB } from './db/db';
export { tourAPI } from './api/tourAPI';
export { vehicleAPI } from './api/vehicleAPI';
export { userAPI } from './api/userAPI';
export { bookingAPI } from './api/bookingAPI';

// Exporter les API DBX (nouvelle implémentation)
export { initDBX, dbxAPI, migrateToDBX, resetDBX } from './dbx';

/**
 * Initialise la base de données appropriée selon le mode
 * @param mode Mode d'initialisation ('auto', 'indexeddb', 'dbx')
 */
export const initializeDatabase = async (mode: 'auto' | 'indexeddb' | 'dbx' = 'auto') => {
  try {
    console.log(`Initialisation de la base de données en mode: ${mode}`);
    
    if (mode === 'indexeddb') {
      // Initialiser uniquement IndexedDB
      const { initDB } = await import('./db/db');
      await initDB();
      console.log('IndexedDB initialisé avec succès');
      return true;
    }
    
    if (mode === 'dbx') {
      // Initialiser uniquement DBX
      const { initDBX } = await import('./dbx');
      const success = await initDBX();
      console.log('DBX initialisé avec succès:', success);
      return success;
    }
    
    // Mode auto: Tenter d'initialiser DBX d'abord, puis IndexedDB si nécessaire
    console.log('Mode auto: tentative d\'initialisation de DBX...');
    const { initDBX } = await import('./dbx');
    const dbxSuccess = await initDBX();
    
    if (dbxSuccess) {
      console.log('DBX initialisé avec succès en mode auto');
      return true;
    }
    
    console.log('DBX n\'a pas pu être initialisé, tentative avec IndexedDB...');
    const { initDB } = await import('./db/db');
    await initDB();
    console.log('IndexedDB initialisé avec succès en mode auto');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    return false;
  }
};
