
import { openDB, IDBPDatabase } from 'idb';
import { NorthGascarDB, Tour, Vehicle, User, Booking } from './schema';
import { seedData } from './seed';

let dbPromise: Promise<IDBPDatabase<NorthGascarDB>>;

/**
 * Initializes the IndexedDB database
 * @returns A promise of the database connection
 */
export const initDB = async () => {
  if (!dbPromise) {
    dbPromise = openDB<NorthGascarDB>('north-gascar-db', 1, {
      upgrade(db) {
        // Create tours store
        if (!db.objectStoreNames.contains('tours')) {
          const toursStore = db.createObjectStore('tours', { keyPath: 'id' });
          toursStore.createIndex('by-category', 'category');
          toursStore.createIndex('by-location', 'location');
        }
        
        // Create vehicles store
        if (!db.objectStoreNames.contains('vehicles')) {
          const vehiclesStore = db.createObjectStore('vehicles', { keyPath: 'id' });
          vehiclesStore.createIndex('by-type', 'type');
        }
        
        // Create users store
        if (!db.objectStoreNames.contains('users')) {
          const usersStore = db.createObjectStore('users', { keyPath: 'id' });
          usersStore.createIndex('by-email', 'email', { unique: true });
        }
        
        // Create bookings store
        if (!db.objectStoreNames.contains('bookings')) {
          const bookingsStore = db.createObjectStore('bookings', { keyPath: 'id' });
          bookingsStore.createIndex('by-userId', 'userId');
          bookingsStore.createIndex('by-status', 'status');
        }
        
        // Create hotels store
        if (!db.objectStoreNames.contains('hotels')) {
          const hotelsStore = db.createObjectStore('hotels', { keyPath: 'id' });
          hotelsStore.createIndex('by-location', 'location');
        }
        
        // Create flights store
        if (!db.objectStoreNames.contains('flights')) {
          const flightsStore = db.createObjectStore('flights', { keyPath: 'id' });
          flightsStore.createIndex('by-departure', 'departure');
          flightsStore.createIndex('by-arrival', 'arrival');
          flightsStore.createIndex('by-departureDate', 'departureDate');
        }
        
        // Add sample data
        seedData(db);
      },
    });
  }
  return dbPromise;
};

/**
 * Gets the database connection
 * @returns A promise of the database connection
 */
export const getDB = async () => {
  if (!dbPromise) {
    return initDB();
  }
  return dbPromise;
};
