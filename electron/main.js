const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
const Database = require('better-sqlite3');
const dbPath = path.join(app.getPath('userData'), 'north-gascar.db');

let mainWindow;
let db;

function createWindow() {
  console.log('Creating Electron window...');
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const startUrl = isDev 
    ? 'http://localhost:8080' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;
  
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Initialize SQLite database
function initDatabase() {
  console.log('Initializing SQLite database at:', dbPath);
  
  try {
    const dbExists = fs.existsSync(dbPath);
    db = new Database(dbPath);
    
    // Create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS tours (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        location TEXT,
        duration TEXT,
        price REAL,
        rating REAL,
        image TEXT,
        featured INTEGER DEFAULT 0,
        category TEXT,
        active INTEGER DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS vehicles (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT,
        pricePerDay REAL,
        seats INTEGER,
        transmission TEXT,
        fuelType TEXT,
        image TEXT,
        description TEXT,
        featured INTEGER DEFAULT 0,
        availability INTEGER DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
      );

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
      );

      CREATE TABLE IF NOT EXISTS hotels (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT,
        stars INTEGER,
        pricePerNight REAL,
        image TEXT,
        availability INTEGER DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS flights (
        id TEXT PRIMARY KEY,
        departure TEXT NOT NULL,
        arrival TEXT NOT NULL,
        departureDate TEXT NOT NULL,
        departureTime TEXT NOT NULL,
        arrivalTime TEXT NOT NULL,
        airline TEXT,
        price REAL,
        availableSeats INTEGER
      );

      CREATE TABLE IF NOT EXISTS vehicle_features (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicleId TEXT NOT NULL,
        feature TEXT NOT NULL,
        FOREIGN KEY (vehicleId) REFERENCES vehicles(id)
      );

      CREATE TABLE IF NOT EXISTS vehicle_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicleId TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        FOREIGN KEY (vehicleId) REFERENCES vehicles(id)
      );

      CREATE TABLE IF NOT EXISTS hotel_features (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hotelId TEXT NOT NULL,
        feature TEXT NOT NULL,
        FOREIGN KEY (hotelId) REFERENCES hotels(id)
      );
    `);

    // Create indexes
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_tours_category ON tours(category);
      CREATE INDEX IF NOT EXISTS idx_tours_location ON tours(location);
      CREATE INDEX IF NOT EXISTS idx_vehicles_type ON vehicles(type);
      CREATE INDEX IF NOT EXISTS idx_bookings_userId ON bookings(userId);
      CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
      CREATE INDEX IF NOT EXISTS idx_hotels_location ON hotels(location);
      CREATE INDEX IF NOT EXISTS idx_flights_departure ON flights(departure);
      CREATE INDEX IF NOT EXISTS idx_flights_arrival ON flights(arrival);
      CREATE INDEX IF NOT EXISTS idx_flights_departureDate ON flights(departureDate);
    `);

    // Seed data if database was just created
    if (!dbExists) {
      seedDatabase();
    }
    
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Seed database with initial data
function seedDatabase() {
  console.log('Seeding database with initial data');
  
  try {
    // Sample users
    const users = [
      {
        id: '1',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        id: '2',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
      }
    ];
    
    const insertUser = db.prepare('INSERT INTO users (id, firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?, ?)');
    users.forEach(user => {
      insertUser.run(user.id, user.firstName, user.lastName, user.email, user.password, user.role);
    });
    
    // Sample tours
    const tours = [
      {
        id: '1',
        title: 'Découverte de Nosy Be',
        description: 'Explorez les merveilles de Nosy Be avec ce circuit de 5 jours.',
        location: 'Nosy Be',
        duration: '5 jours',
        price: 499.99,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1541401154946-62f8d84bd284',
        featured: 1,
        category: 'Plage',
        active: 1
      },
      {
        id: '2',
        title: 'Trekking dans les Tsingy',
        description: 'Une aventure inoubliable dans les formations rocheuses uniques des Tsingy.',
        location: 'Tsingy de Bemaraha',
        duration: '3 jours',
        price: 349.99,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1551249456-ca520b5c28b5',
        featured: 1,
        category: 'Aventure',
        active: 1
      }
    ];
    
    const insertTour = db.prepare('INSERT INTO tours (id, title, description, location, duration, price, rating, image, featured, category, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    tours.forEach(tour => {
      insertTour.run(tour.id, tour.title, tour.description, tour.location, tour.duration, tour.price, tour.rating, tour.image, tour.featured, tour.category, tour.active);
    });
    
    // Sample vehicles
    const vehicles = [
      {
        id: '1',
        name: 'Toyota Land Cruiser',
        type: '4x4',
        pricePerDay: 85.00,
        seats: 7,
        transmission: 'Manual',
        fuelType: 'Diesel',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
        description: 'Véhicule robuste pour explorer les régions difficiles d\'accès.',
        featured: 1,
        availability: 1
      },
      {
        id: '2',
        name: 'Renault Clio',
        type: 'car',
        pricePerDay: 45.00,
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Essence',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d',
        description: 'Voiture économique idéale pour les déplacements urbains.',
        featured: 0,
        availability: 1
      }
    ];
    
    const insertVehicle = db.prepare('INSERT INTO vehicles (id, name, type, pricePerDay, seats, transmission, fuelType, image, description, featured, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    vehicles.forEach(vehicle => {
      insertVehicle.run(vehicle.id, vehicle.name, vehicle.type, vehicle.pricePerDay, vehicle.seats, vehicle.transmission, vehicle.fuelType, vehicle.image, vehicle.description, vehicle.featured, vehicle.availability);
    });
    
    // Vehicle features
    const vehicleFeatures = [
      { vehicleId: '1', feature: 'Climatisation' },
      { vehicleId: '1', feature: '4 roues motrices' },
      { vehicleId: '1', feature: 'GPS' },
      { vehicleId: '2', feature: 'Climatisation' },
      { vehicleId: '2', feature: 'Bluetooth' }
    ];
    
    const insertVehicleFeature = db.prepare('INSERT INTO vehicle_features (vehicleId, feature) VALUES (?, ?)');
    vehicleFeatures.forEach(feature => {
      insertVehicleFeature.run(feature.vehicleId, feature.feature);
    });
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Reset database (drop and recreate)
function resetDatabase() {
  console.log('Resetting database...');
  
  try {
    // Close existing connection if open
    if (db) {
      db.close();
    }
    
    // Delete the database file
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log('Database file deleted');
    }
    
    // Reinitialize the database
    initDatabase();
    console.log('Database reset completed successfully');
    
    return true;
  } catch (error) {
    console.error('Error resetting database:', error);
    return false;
  }
}

// IPC handlers for database operations
function setupIpcHandlers() {
  // Users API
  ipcMain.handle('user:getAll', () => {
    return db.prepare('SELECT * FROM users').all();
  });
  
  ipcMain.handle('user:getById', (event, id) => {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  });
  
  ipcMain.handle('user:getByEmail', (event, email) => {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  });
  
  ipcMain.handle('user:authenticate', (event, { email, password }) => {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (user && user.password === password) {
      return { id: user.id, email: user.email, role: user.role };
    }
    return null;
  });
  
  ipcMain.handle('user:register', (event, userData) => {
    const { firstName, lastName, email, password } = userData;
    const id = generateUUID();
    
    try {
      db.prepare('INSERT INTO users (id, firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?, ?)').run(
        id, firstName, lastName, email, password, 'user'
      );
      return { id, email, role: 'user' };
    } catch (error) {
      console.error('Error registering user:', error);
      return null;
    }
  });
  
  // Ajout des nouveaux gestionnaires pour user:update et user:delete
  ipcMain.handle('user:update', (event, { id, ...userData }) => {
    const keys = Object.keys(userData);
    const values = Object.values(userData);
    
    if (keys.length === 0) return null;
    
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    try {
      db.prepare(`UPDATE users SET ${setClause} WHERE id = ?`).run(...values, id);
      return { id, ...userData };
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  });
  
  ipcMain.handle('user:delete', (event, id) => {
    try {
      db.prepare('DELETE FROM users WHERE id = ?').run(id);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  });
  
  // Tours API
  ipcMain.handle('tour:getAll', () => {
    return db.prepare('SELECT * FROM tours').all();
  });
  
  ipcMain.handle('tour:getById', (event, id) => {
    return db.prepare('SELECT * FROM tours WHERE id = ?').get(id);
  });
  
  ipcMain.handle('tour:getByCategory', (event, category) => {
    return db.prepare('SELECT * FROM tours WHERE category = ?').all(category);
  });
  
  ipcMain.handle('tour:getFeatured', () => {
    return db.prepare('SELECT * FROM tours WHERE featured = 1').all();
  });
  
  ipcMain.handle('tour:add', (event, tourData) => {
    const id = generateUUID();
    const keys = Object.keys(tourData);
    const values = Object.values(tourData);
    
    const placeholders = keys.map(() => '?').join(', ');
    const columns = ['id', ...keys].join(', ');
    
    try {
      db.prepare(`INSERT INTO tours (${columns}) VALUES (?, ${placeholders})`).run(id, ...values);
      return { id, ...tourData };
    } catch (error) {
      console.error('Error adding tour:', error);
      return null;
    }
  });
  
  ipcMain.handle('tour:update', (event, { id, ...tourData }) => {
    const keys = Object.keys(tourData);
    const values = Object.values(tourData);
    
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    try {
      db.prepare(`UPDATE tours SET ${setClause} WHERE id = ?`).run(...values, id);
      return { id, ...tourData };
    } catch (error) {
      console.error('Error updating tour:', error);
      return null;
    }
  });
  
  ipcMain.handle('tour:delete', (event, id) => {
    try {
      db.prepare('DELETE FROM tours WHERE id = ?').run(id);
      return true;
    } catch (error) {
      console.error('Error deleting tour:', error);
      return false;
    }
  });
  
  // Add similar handlers for vehicles, bookings, etc.
  // For brevity, I'm not including all of them here
  
  // Add handler for database reset
  ipcMain.handle('db:reset', async () => {
    return resetDatabase();
  });
}

// Helper function to generate UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// App lifecycle events
app.whenReady().then(() => {
  console.log('Electron app is ready');
  initDatabase();
  setupIpcHandlers();
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    // Close database connection
    if (db) {
      db.close();
    }
    app.quit();
  }
});

app.on('before-quit', () => {
  // Close database connection
  if (db) {
    db.close();
  }
});
