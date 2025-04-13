import initSqlJs, { Database } from 'sql.js';
import localforage from 'localforage';

// SQLite database instance
let db: Database | null = null;

// Initialize database
export const initDB = async (): Promise<Database> => {
  console.log("Initialisation de la base de données SQLite...");
  
  if (db) {
    return db;
  }

  try {
    // Try to load existing database from localforage
    const savedDBData = await localforage.getItem<Uint8Array>('northgascar-sqlite-db');
    
    // Initialize SQL.js
    const SQL = await initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
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
    
    return db;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données SQLite:", error);
    throw error;
  }
};

// Create database tables
const createTables = (db: Database): void => {
  console.log("Création des tables SQLite...");
  
  // Create tours table
  db.run(`
    CREATE TABLE IF NOT EXISTS tours (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT NOT NULL,
      duration TEXT NOT NULL,
      price REAL NOT NULL,
      rating REAL NOT NULL,
      image TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      category TEXT,
      active INTEGER DEFAULT 1
    )
  `);
  
  // Create vehicles table
  db.run(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      pricePerDay REAL NOT NULL,
      seats INTEGER NOT NULL,
      transmission TEXT NOT NULL,
      fuelType TEXT NOT NULL,
      image TEXT NOT NULL,
      features TEXT NOT NULL,
      availability INTEGER NOT NULL DEFAULT 1,
      description TEXT,
      featured INTEGER DEFAULT 0,
      images TEXT
    )
  `);
  
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);
  
  // Create bookings table
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      tourId TEXT,
      vehicleId TEXT,
      hotelId TEXT,
      flightId TEXT,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      status TEXT NOT NULL,
      totalPrice REAL NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);
  
  // Create hotels table
  db.run(`
    CREATE TABLE IF NOT EXISTS hotels (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      stars INTEGER NOT NULL,
      pricePerNight REAL NOT NULL,
      image TEXT NOT NULL,
      features TEXT NOT NULL,
      availability INTEGER NOT NULL DEFAULT 1
    )
  `);
  
  // Create flights table
  db.run(`
    CREATE TABLE IF NOT EXISTS flights (
      id TEXT PRIMARY KEY,
      departure TEXT NOT NULL,
      arrival TEXT NOT NULL,
      departureDate TEXT NOT NULL,
      departureTime TEXT NOT NULL,
      arrivalTime TEXT NOT NULL,
      airline TEXT NOT NULL,
      price REAL NOT NULL,
      availableSeats INTEGER NOT NULL
    )
  `);
  
  // Create banners table
  db.run(`
    CREATE TABLE IF NOT EXISTS banners (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      imagePath TEXT NOT NULL,
      page TEXT NOT NULL,
      description TEXT,
      isActive INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);
  
  // Create indexes
  db.run("CREATE INDEX IF NOT EXISTS idx_tours_category ON tours(category)");
  db.run("CREATE INDEX IF NOT EXISTS idx_tours_location ON tours(location)");
  db.run("CREATE INDEX IF NOT EXISTS idx_vehicles_type ON vehicles(type)");
  db.run("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)");
  db.run("CREATE INDEX IF NOT EXISTS idx_bookings_userId ON bookings(userId)");
  db.run("CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)");
  db.run("CREATE INDEX IF NOT EXISTS idx_hotels_location ON hotels(location)");
  db.run("CREATE INDEX IF NOT EXISTS idx_flights_departure ON flights(departure)");
  db.run("CREATE INDEX IF NOT EXISTS idx_flights_arrival ON flights(arrival)");
  db.run("CREATE INDEX IF NOT EXISTS idx_flights_departureDate ON flights(departureDate)");
  db.run("CREATE INDEX IF NOT EXISTS idx_banners_page ON banners(page)");
  db.run("CREATE INDEX IF NOT EXISTS idx_banners_isActive ON banners(isActive)");
};

// Save the database to localforage
export const saveDatabase = async (): Promise<void> => {
  if (!db) {
    console.error("Impossible de sauvegarder: base de données non initialisée");
    return;
  }
  
  try {
    const data = db.export();
    await localforage.setItem('northgascar-sqlite-db', data);
    console.log("Base de données sauvegardée dans le stockage local");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la base de données:", error);
  }
};

// Get the database instance
export const getDB = async (): Promise<Database> => {
  if (!db) {
    return initDB();
  }
  return db;
};

// Reset the database
export const resetDB = async (): Promise<Database> => {
  console.log("Réinitialisation de la base de données...");
  
  try {
    // Close existing database
    if (db) {
      db.close();
      db = null;
    }
    
    // Remove from localforage
    await localforage.removeItem('northgascar-sqlite-db');
    console.log("Base de données supprimée avec succès");
    
    // Reinitialize
    return initDB();
  } catch (error) {
    console.error("Erreur lors de la réinitialisation de la base de données:", error);
    throw error;
  }
};

// Helper functions for common operations
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
