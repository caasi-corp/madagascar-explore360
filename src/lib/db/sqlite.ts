
import initSqlJs, { Database } from 'sql.js';
import localforage from 'localforage';
import { DB_CONFIG } from './config';
import { createTables } from './schema-creator';
import { seedSQLiteDatabase } from './sqliteSeed';

// SQLite database instance
let db: Database | null = null;

/**
 * Initialize database
 */
export const initDB = async (): Promise<Database> => {
  console.log("Initialisation de la base de données SQLite...");
  
  if (db) {
    return db;
  }

  try {
    // Try to load existing database from localforage
    const savedDBData = await localforage.getItem<Uint8Array>(DB_CONFIG.localStorageKey);
    
    // Initialize SQL.js
    const SQL = await initSqlJs({
      locateFile: file => `${DB_CONFIG.sqlJsCdnPath}${file}`
    });
    
    if (savedDBData) {
      console.log("Base de données existante chargée depuis le stockage local");
      db = new SQL.Database(savedDBData);
    } else {
      console.log("Création d'une nouvelle base de données SQLite");
      db = new SQL.Database();
      
      // Create tables
      createTables(db);
      
      // Save the database to localforage
      await saveDatabase();
    }
    
    // Seed the database if needed
    await seedSQLiteDatabase(db);
    
    return db;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données SQLite:", error);
    throw error;
  }
};

/**
 * Save the database to localforage
 */
export const saveDatabase = async (): Promise<void> => {
  if (!db) {
    console.error("Impossible de sauvegarder: base de données non initialisée");
    return;
  }
  
  try {
    const data = db.export();
    await localforage.setItem(DB_CONFIG.localStorageKey, data);
    console.log("Base de données sauvegardée dans le stockage local");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la base de données:", error);
  }
};

/**
 * Get the database instance
 */
export const getDB = async (): Promise<Database> => {
  if (!db) {
    return initDB();
  }
  return db;
};

/**
 * Reset the database
 */
export const resetDB = async (): Promise<Database> => {
  console.log("Réinitialisation de la base de données...");
  
  try {
    // Close existing database
    if (db) {
      db.close();
      db = null;
    }
    
    // Remove from localforage
    await localforage.removeItem(DB_CONFIG.localStorageKey);
    console.log("Base de données supprimée avec succès");
    
    // Reinitialize
    return initDB();
  } catch (error) {
    console.error("Erreur lors de la réinitialisation de la base de données:", error);
    throw error;
  }
};

// Re-export helpers
export { sqliteHelper } from './helpers';
