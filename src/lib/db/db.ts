
import { openDB, IDBPDatabase } from 'idb';
import { NorthGascarDB } from './schema';

let dbPromise: Promise<IDBPDatabase<NorthGascarDB>>;

/**
 * Initializes the IndexedDB database
 * @returns A promise of the database connection
 */
export const initDB = async () => {
  console.log("Initialisation de la base de données...");
  
  if (!dbPromise) {
    try {
      dbPromise = openDB<NorthGascarDB>('northgascar-db', 1, {
        upgrade(db, oldVersion, newVersion, transaction) {
          console.log(`Mise à jour de la base de données de la version ${oldVersion} vers ${newVersion}`);
          
          // Create tours store
          if (!db.objectStoreNames.contains('tours')) {
            console.log("Création du store 'tours'");
            const toursStore = db.createObjectStore('tours', { keyPath: 'id' });
            toursStore.createIndex('by-category', 'category');
            toursStore.createIndex('by-location', 'location');
          }
          
          // Create vehicles store
          if (!db.objectStoreNames.contains('vehicles')) {
            console.log("Création du store 'vehicles'");
            const vehiclesStore = db.createObjectStore('vehicles', { keyPath: 'id' });
            vehiclesStore.createIndex('by-type', 'type');
          }
          
          // Create users store
          if (!db.objectStoreNames.contains('users')) {
            console.log("Création du store 'users'");
            const usersStore = db.createObjectStore('users', { keyPath: 'id' });
            usersStore.createIndex('by-email', 'email', { unique: true });
          }
          
          // Create bookings store
          if (!db.objectStoreNames.contains('bookings')) {
            console.log("Création du store 'bookings'");
            const bookingsStore = db.createObjectStore('bookings', { keyPath: 'id' });
            bookingsStore.createIndex('by-userId', 'userId');
            bookingsStore.createIndex('by-status', 'status');
          }
          
          // Create hotels store
          if (!db.objectStoreNames.contains('hotels')) {
            console.log("Création du store 'hotels'");
            const hotelsStore = db.createObjectStore('hotels', { keyPath: 'id' });
            hotelsStore.createIndex('by-location', 'location');
          }
          
          // Create flights store
          if (!db.objectStoreNames.contains('flights')) {
            console.log("Création du store 'flights'");
            const flightsStore = db.createObjectStore('flights', { keyPath: 'id' });
            flightsStore.createIndex('by-departure', 'departure');
            flightsStore.createIndex('by-arrival', 'arrival');
            flightsStore.createIndex('by-departureDate', 'departureDate');
          }
          
          // Create banners store
          if (!db.objectStoreNames.contains('banners')) {
            console.log("Création du store 'banners'");
            const bannersStore = db.createObjectStore('banners', { keyPath: 'id' });
            bannersStore.createIndex('by-page', 'page');
            bannersStore.createIndex('by-isActive', 'isActive');
          }
        },
      });
      
      const db = await dbPromise;
      console.log("Base de données initialisée, vérification des données");
      
      // Vérifier si des utilisateurs existent déjà
      const usersCount = await db.count('users');
      console.log(`Nombre d'utilisateurs trouvés: ${usersCount}`);
      
      // Si aucun utilisateur n'existe, utiliser un autre mécanisme pour initialiser les données
      // Remarque: nous ne pouvons pas utiliser directement la méthode seedDatabase ici en raison de l'incompatibilité des types
      
      return db;
    } catch (error) {
      console.error("Erreur lors de l'initialisation de la base de données:", error);
      throw error;
    }
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

/**
 * Resets the database by deleting it and reinitializing
 */
export const resetDB = async () => {
  console.log("Réinitialisation de la base de données...");
  
  try {
    // Close any existing connections
    if (dbPromise) {
      const db = await dbPromise;
      db.close();
      dbPromise = null;
    }
    
    // Delete the database
    await indexedDB.deleteDatabase('northgascar-db');
    console.log("Base de données supprimée avec succès");
    
    // Reinitialize
    const newDb = await initDB();
    console.log("Base de données réinitialisée avec succès");
    
    return newDb;
  } catch (error) {
    console.error("Erreur lors de la réinitialisation de la base de données:", error);
    throw error;
  }
};
