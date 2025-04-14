
/**
 * Point d'entrée principal pour la base de données DBX
 * Expose les adaptateurs et fonctions utilitaires pour manipuler la base de données
 */
import { initializeDBXData } from './DataBaseX/seed/dbxSeedManager';
import { migrateFromIndexedDBToDBX } from './DataBaseX/adapters/DBXToIndexedDBAdapter';
import { dbxManager } from './DataBaseX/DBXManager';
import { DBXTourAdapter } from './DataBaseX/adapters/DBXTourAdapter';
import { DBXVehicleAdapter } from './DataBaseX/adapters/DBXVehicleAdapter';
import { DBXUserAdapter } from './DataBaseX/adapters/DBXUserAdapter';
import { DBXBookingAdapter } from './DataBaseX/adapters/DBXBookingAdapter';

// Initialisation de la base de données DBX
export const initDBX = async () => {
  console.log("Initialisation de la base de données DBX...");
  
  try {
    // Initialiser les données dans les fichiers DBX
    initializeDBXData();
    
    console.log("Base de données DBX initialisée avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données DBX:", error);
    return false;
  }
};

// Adaptateurs pour les différentes entités
export const dbxAPI = {
  tours: DBXTourAdapter,
  vehicles: DBXVehicleAdapter,
  users: DBXUserAdapter,
  bookings: DBXBookingAdapter
};

// Migration depuis IndexedDB
export const migrateToDBX = async (db: any) => {
  return migrateFromIndexedDBToDBX(db);
};

// Réinitialiser la base de données DBX
export const resetDBX = () => {
  dbxManager.clearCache();
  initializeDBXData();
  return true;
};
