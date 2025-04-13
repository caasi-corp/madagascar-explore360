
import initSqlJs, { Database } from 'sql.js';
import localforage from 'localforage';
import { DB_CONFIG } from './config';
import { createTables } from './schema-creator';
import { seedSQLiteDatabase } from './seed/index';
import { sqliteHelper } from './helpers';

// SQLite database instance
let db: Database | null = null;
let lastInitTime = 0;

/**
 * Initialize database
 */
export const initDB = async (): Promise<Database> => {
  console.log("Initialisation de la base de données SQLite...");
  
  if (db) {
    console.log("Utilisation d'une instance SQLite existante");
    return db;
  }

  // Check if we've tried too recently
  const now = Date.now();
  if (now - lastInitTime < 2000) { // Prevent rapid consecutive init attempts
    console.log("Initialization attempted too recently, using throttle");
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  lastInitTime = now;

  try {
    // Try to load existing database from localforage
    const savedDBData = await localforage.getItem<Uint8Array>(DB_CONFIG.localStorageKey);
    
    // Initialize SQL.js with correct configuration
    const SQL = await initSqlJs({
      // Use the exact CDN path - this was likely one of the issues
      locateFile: () => 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm'
    });
    
    if (savedDBData) {
      console.log("Base de données existante chargée depuis le stockage local");
      try {
        db = new SQL.Database(savedDBData);
        console.log("Instance SQLite créée avec succès à partir des données sauvegardées");
        
        // Verify the database has the expected structure
        try {
          const tables = sqliteHelper.queryAll(db, "SELECT name FROM sqlite_master WHERE type='table'");
          console.log("Tables found in database:", tables.map(t => t.name).join(", "));
          
          if (tables.length === 0 || !tables.some(t => t.name === 'users')) {
            console.warn("Database missing expected tables, recreating...");
            db.close();
            throw new Error("Missing required tables");
          }
        } catch (e) {
          console.error("Error verifying database structure:", e);
          throw e;
        }
      } catch (e) {
        console.error("Erreur lors de la création de l'instance SQLite à partir des données sauvegardées:", e);
        console.log("Création d'une nouvelle base de données SQLite suite à l'erreur");
        
        // Remove potentially corrupted data
        await localforage.removeItem(DB_CONFIG.localStorageKey);
        
        db = new SQL.Database();
        
        // Create tables
        createTables(db);
      }
    } else {
      console.log("Création d'une nouvelle base de données SQLite");
      db = new SQL.Database();
      
      // Create tables
      createTables(db);
    }
    
    // Save the database to localforage
    await saveDatabase();
    
    // Seed the database if needed
    const seedResult = await seedSQLiteDatabase(db, false); // Don't force seed on first creation
    console.log("Résultat de l'initialisation des données:", seedResult ? "Succès" : "Échec");
    
    // Final verification
    try {
      const userCount = sqliteHelper.queryOne(db, "SELECT COUNT(*) as count FROM users");
      console.log(`Database contains ${userCount?.count || 0} users`);
      
      if (!userCount || userCount.count === 0) {
        console.warn("Database initialized but contains no users, forcing seed");
        
        // Attempt to re-seed
        console.log("Attempting to re-seed the database...");
        const reseedResult = await seedSQLiteDatabase(db, true);
        console.log("Re-seed result:", reseedResult ? "Success" : "Failed");
        
        await saveDatabase();
      }
    } catch (e) {
      console.error("Error verifying user count:", e);
    }
    
    return db;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données SQLite:", error);
    
    // Si l'erreur persiste, essayons de réinitialiser complètement la base
    try {
      console.log("Tentative de réinitialisation complète de la base de données");
      await localforage.removeItem(DB_CONFIG.localStorageKey);
      
      const SQL = await initSqlJs({
        locateFile: () => 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm'
      });
      
      db = new SQL.Database();
      createTables(db);
      await saveDatabase();
      await seedSQLiteDatabase(db, true); // Force re-seed
      await saveDatabase();
      
      return db;
    } catch (e) {
      console.error("Échec de la réinitialisation de la base de données:", e);
      throw new Error("Impossible d'initialiser la base de données SQLite après plusieurs tentatives");
    }
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
    const newDb = await initDB();
    
    // Force re-seed the database
    await seedSQLiteDatabase(newDb, true);
    await saveDatabase();
    
    console.log("Base de données réinitialisée et réalimentée avec succès");
    return newDb;
  } catch (error) {
    console.error("Erreur lors de la réinitialisation de la base de données:", error);
    throw error;
  }
};

// Re-export helpers
export { sqliteHelper } from './helpers';
