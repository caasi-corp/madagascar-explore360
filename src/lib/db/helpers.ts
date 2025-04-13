
import { Database } from 'sql.js';

/**
 * Helper functions for database operations
 */
export const sqliteHelper = {
  // Convert array to JSON string for storage
  arrayToString: (arr: any[]): string => {
    return JSON.stringify(arr);
  },
  
  // Convert JSON string back to array
  stringToArray: (str: string): any[] => {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.error("Erreur lors de la conversion d'une chaîne en tableau:", e);
      return [];
    }
  },
  
  // Execute a query and return all results
  queryAll: (db: Database, query: string, params: any = {}): any[] => {
    try {
      const stmt = db.prepare(query);
      stmt.bind(params);
      
      const results = [];
      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }
      stmt.free();
      return results;
    } catch (e) {
      console.error("Erreur lors de l'exécution de la requête:", e);
      return [];
    }
  },
  
  // Execute a query and return the first result
  queryOne: (db: Database, query: string, params: any = {}): any | null => {
    try {
      const stmt = db.prepare(query);
      stmt.bind(params);
      
      if (stmt.step()) {
        const result = stmt.getAsObject();
        stmt.free();
        return result;
      }
      stmt.free();
      return null;
    } catch (e) {
      console.error("Erreur lors de l'exécution de la requête:", e);
      return null;
    }
  },
  
  // Execute a query without returning results (for INSERT, UPDATE, DELETE)
  execute: (db: Database, query: string, params: any = {}): boolean => {
    try {
      const stmt = db.prepare(query);
      stmt.bind(params);
      stmt.step();
      stmt.free();
      return true;
    } catch (e) {
      console.error("Erreur lors de l'exécution de la requête:", e);
      return false;
    }
  }
};
