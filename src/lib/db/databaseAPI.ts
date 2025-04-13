
import { getDB, sqliteHelper } from './sqlite';
import { Banner, Booking, Tour, User, Vehicle } from './schema';

/**
 * API for database management and table data visualization
 */
export const databaseAPI = {
  /**
   * Get table names from the database
   */
  getTables: async (): Promise<string[]> => {
    try {
      const db = await getDB();
      const result = sqliteHelper.queryAll(
        db,
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
      );
      return result.map(row => row.name as string);
    } catch (error) {
      console.error("Erreur lors de la récupération des tables:", error);
      return [];
    }
  },

  /**
   * Get table schema/structure
   */
  getTableSchema: async (tableName: string): Promise<any[]> => {
    try {
      const db = await getDB();
      return sqliteHelper.queryAll(db, `PRAGMA table_info(${tableName})`);
    } catch (error) {
      console.error(`Erreur lors de la récupération du schéma de ${tableName}:`, error);
      return [];
    }
  },

  /**
   * Get all data from a table
   */
  getTableData: async (tableName: string): Promise<any[]> => {
    try {
      const db = await getDB();
      return sqliteHelper.queryAll(db, `SELECT * FROM ${tableName} LIMIT 100`);
    } catch (error) {
      console.error(`Erreur lors de la récupération des données de ${tableName}:`, error);
      return [];
    }
  },

  /**
   * Get record by ID
   */
  getRecordById: async (tableName: string, id: string): Promise<any> => {
    try {
      const db = await getDB();
      return sqliteHelper.queryOne(db, `SELECT * FROM ${tableName} WHERE id = ?`, { 1: id });
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'enregistrement #${id}:`, error);
      return null;
    }
  },

  /**
   * Update record in table
   */
  updateRecord: async (tableName: string, id: string, data: any): Promise<boolean> => {
    try {
      const db = await getDB();
      
      // Build SET clause for the SQL UPDATE statement
      const setClause = Object.keys(data)
        .filter(key => key !== 'id')
        .map(key => `${key} = ?`)
        .join(', ');
      
      // Build parameters object with values
      const params: {[key: string]: any} = {};
      let paramIndex = 1;
      
      Object.entries(data).filter(([key]) => key !== 'id').forEach(([_, value]) => {
        params[paramIndex++] = value;
      });
      
      // Add ID as the last parameter
      params[paramIndex] = id;
      
      // Execute the UPDATE query
      const success = sqliteHelper.execute(
        db,
        `UPDATE ${tableName} SET ${setClause} WHERE id = ?`,
        params
      );
      
      return success;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'enregistrement #${id}:`, error);
      return false;
    }
  },

  /**
   * Delete record from table
   */
  deleteRecord: async (tableName: string, id: string): Promise<boolean> => {
    try {
      const db = await getDB();
      return sqliteHelper.execute(db, `DELETE FROM ${tableName} WHERE id = ?`, { 1: id });
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'enregistrement #${id}:`, error);
      return false;
    }
  },

  /**
   * Insert new record into table
   */
  insertRecord: async (tableName: string, data: any): Promise<boolean> => {
    try {
      const db = await getDB();
      
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map((_, index) => `?`).join(', ');
      
      // Build parameters object with values
      const params: {[key: string]: any} = {};
      let paramIndex = 1;
      
      Object.values(data).forEach((value) => {
        params[paramIndex++] = value;
      });
      
      // Execute the INSERT query
      const success = sqliteHelper.execute(
        db,
        `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`,
        params
      );
      
      return success;
    } catch (error) {
      console.error(`Erreur lors de l'insertion d'un nouvel enregistrement:`, error);
      return false;
    }
  },

  /**
   * Execute custom SQL query
   */
  executeQuery: async (sql: string): Promise<any> => {
    try {
      const db = await getDB();
      
      // Determine if it's a SELECT query or a modifying query
      const isSelectQuery = sql.trim().toLowerCase().startsWith('select');
      
      if (isSelectQuery) {
        return sqliteHelper.queryAll(db, sql);
      } else {
        return { success: sqliteHelper.execute(db, sql) };
      }
    } catch (error) {
      console.error(`Erreur lors de l'exécution de la requête SQL:`, error);
      return { error: (error as Error).message };
    }
  },

  /**
   * Get database stats
   */
  getDatabaseStats: async (): Promise<{ [key: string]: number }> => {
    try {
      const db = await getDB();
      const tables = await databaseAPI.getTables();
      
      const stats: { [key: string]: number } = {};
      
      for (const table of tables) {
        const countResult = sqliteHelper.queryOne(db, `SELECT COUNT(*) as count FROM ${table}`);
        stats[table] = countResult?.count || 0;
      }
      
      return stats;
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
      return {};
    }
  }
};
