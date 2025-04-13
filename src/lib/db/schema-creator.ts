import { Database } from 'sql.js';

/**
 * Creates database tables and indexes
 */
export const createTables = (db: Database): void => {
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
  
  createAdditionalTables(db);
  createIndexes(db);
};

// Create additional tables to keep function size manageable
const createAdditionalTables = (db: Database): void => {
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
};

// Create database indexes
const createIndexes = (db: Database): void => {
  // Create tour indexes
  db.run("CREATE INDEX IF NOT EXISTS idx_tours_category ON tours(category)");
  db.run("CREATE INDEX IF NOT EXISTS idx_tours_location ON tours(location)");
  
  // Create vehicle indexes
  db.run("CREATE INDEX IF NOT EXISTS idx_vehicles_type ON vehicles(type)");
  
  // Create user indexes
  db.run("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)");
  
  // Create booking indexes
  db.run("CREATE INDEX IF NOT EXISTS idx_bookings_userId ON bookings(userId)");
  db.run("CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)");
  
  // Create other indexes
  db.run("CREATE INDEX IF NOT EXISTS idx_hotels_location ON hotels(location)");
  db.run("CREATE INDEX IF NOT EXISTS idx_flights_departure ON flights(departure)");
  db.run("CREATE INDEX IF NOT EXISTS idx_flights_arrival ON flights(arrival)");
  db.run("CREATE INDEX IF NOT EXISTS idx_flights_departureDate ON flights(departureDate)");
  db.run("CREATE INDEX IF NOT EXISTS idx_banners_page ON banners(page)");
  db.run("CREATE INDEX IF NOT EXISTS idx_banners_isActive ON banners(isActive)");
};
