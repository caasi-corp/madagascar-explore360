
import { Database } from 'sql.js';
import { saveDatabase } from './sqlite';
import { seedSQLiteDatabase as seedSQLiteImplementation } from './seed/index';
import { SQLiteDatabase } from './types';

/**
 * Seeds the SQLite database with initial data
 */
export const seedSQLiteDatabase = async (db: SQLiteDatabase): Promise<boolean> => {
  console.log("Initialisation de la base de données SQLite...");
  
  try {
    // Use our implementation from index
    const success = await seedSQLiteImplementation(db);
    
    // Save database after all changes
    if (success) {
      await saveDatabase();
    }
    
    return success;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données SQLite:", error);
    return false;
  }
};
