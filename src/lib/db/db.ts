
import { openDB } from 'idb';
import { NorthGascarDB } from './schema';
import { seedTours } from './seed/tourSeed';
import { seedVehicles } from './seed/vehicleSeed';
import { seedUsers } from './seed/userSeed';
import { seedBookings } from './seed/bookingSeed';
import { seedPhotos } from '../api/photoAPI';

// Initialize the database
export const initDB = async () => {
  const db = await openDB<NorthGascarDB>('northgascar-db', 1, {
    upgrade(db) {
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains('tours')) {
        const tourStore = db.createObjectStore('tours', { keyPath: 'id' });
        tourStore.createIndex('by-category', 'category');
        tourStore.createIndex('by-location', 'location');
      }

      if (!db.objectStoreNames.contains('vehicles')) {
        const vehicleStore = db.createObjectStore('vehicles', { keyPath: 'id' });
        vehicleStore.createIndex('by-type', 'type');
      }

      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', { keyPath: 'id' });
        userStore.createIndex('by-email', 'email', { unique: true });
      }

      if (!db.objectStoreNames.contains('bookings')) {
        const bookingStore = db.createObjectStore('bookings', { keyPath: 'id' });
        bookingStore.createIndex('by-userId', 'userId');
        bookingStore.createIndex('by-status', 'status');
      }

      if (!db.objectStoreNames.contains('hotels')) {
        const hotelStore = db.createObjectStore('hotels', { keyPath: 'id' });
        hotelStore.createIndex('by-location', 'location');
      }

      if (!db.objectStoreNames.contains('flights')) {
        const flightStore = db.createObjectStore('flights', { keyPath: 'id' });
        flightStore.createIndex('by-departure', 'departure');
        flightStore.createIndex('by-arrival', 'arrival');
        flightStore.createIndex('by-departureDate', 'departureDate');
      }
      
      if (!db.objectStoreNames.contains('photos')) {
        const photoStore = db.createObjectStore('photos', { keyPath: 'id' });
        photoStore.createIndex('by-category', 'category');
      }
    },
    blocking() {
      console.log('Another version of the database was opened in another tab');
    },
    blocked() {
      console.log('Database upgrade is blocked by another connection');
    },
  });

  // Seed the database with initial data
  await seedTours();
  await seedVehicles();
  await seedUsers();
  await seedBookings();
  await seedPhotos();

  return db;
};
