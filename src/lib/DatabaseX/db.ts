
/**
 * Gestionnaire central de la base de données DatabaseX
 */

import { DBXTour, DBXVehicle, DBXUser, DBXBooking, DBXBanner } from './types';

// Données en mémoire pour simuler le stockage dans les fichiers .dbx
const memoryDB: {
  tours: DBXTour[];
  vehicles: DBXVehicle[];
  users: DBXUser[];
  bookings: DBXBooking[];
  banners: DBXBanner[];
} = {
  tours: [],
  vehicles: [],
  users: [],
  bookings: [],
  banners: []
};

// Fonction pour simuler la lecture d'un fichier .dbx
const readDatabase = <T>(collection: keyof typeof memoryDB): T[] => {
  console.log(`Lecture de la collection ${collection} depuis DatabaseX`);
  return memoryDB[collection] as T[];
};

// Fonction pour simuler l'écriture dans un fichier .dbx
const writeDatabase = <T>(collection: keyof typeof memoryDB, data: T[]): void => {
  console.log(`Écriture dans la collection ${collection} de DatabaseX`);
  memoryDB[collection] = data as any;
};

/**
 * Initialise la base de données avec des données initiales
 */
export const initDB = async (): Promise<void> => {
  console.log("Initialisation de la base de données DatabaseX...");
  
  // Vérifier si les données existent déjà
  if (memoryDB.users.length === 0) {
    // Charger les données initiales depuis le module seed
    const { seedDatabase } = await import('./seed');
    await seedDatabase();
  }
  
  console.log("Base de données DatabaseX initialisée avec succès");
};

/**
 * Réinitialise la base de données
 */
export const resetDB = async (): Promise<void> => {
  console.log("Réinitialisation de la base de données DatabaseX...");
  
  // Vider toutes les collections
  memoryDB.tours = [];
  memoryDB.vehicles = [];
  memoryDB.users = [];
  memoryDB.bookings = [];
  memoryDB.banners = [];
  
  // Réinitialiser avec les données de départ
  await initDB();
  
  console.log("Base de données DatabaseX réinitialisée avec succès");
};

// Exportation des fonctions d'accès aux données
export const dbx = {
  read: readDatabase,
  write: writeDatabase,
  
  // Collections spécifiques
  tours: {
    getAll: () => readDatabase<DBXTour>('tours'),
    getById: (id: string) => readDatabase<DBXTour>('tours').find(tour => tour.id === id),
    getByCategory: (category: string) => readDatabase<DBXTour>('tours').filter(tour => tour.category === category),
    getFeatured: () => readDatabase<DBXTour>('tours').filter(tour => tour.featured),
    add: (tour: Omit<DBXTour, 'id'>) => {
      const id = crypto.randomUUID();
      const newTour = { ...tour, id };
      const tours = readDatabase<DBXTour>('tours');
      tours.push(newTour);
      writeDatabase('tours', tours);
      return newTour;
    },
    update: (id: string, updates: Partial<DBXTour>) => {
      const tours = readDatabase<DBXTour>('tours');
      const index = tours.findIndex(tour => tour.id === id);
      if (index === -1) return null;
      
      tours[index] = { ...tours[index], ...updates };
      writeDatabase('tours', tours);
      return tours[index];
    },
    delete: (id: string) => {
      const tours = readDatabase<DBXTour>('tours');
      const newTours = tours.filter(tour => tour.id !== id);
      writeDatabase('tours', newTours);
      return true;
    }
  },
  
  vehicles: {
    getAll: () => readDatabase<DBXVehicle>('vehicles'),
    getById: (id: string) => readDatabase<DBXVehicle>('vehicles').find(vehicle => vehicle.id === id),
    getByType: (type: string) => readDatabase<DBXVehicle>('vehicles').filter(vehicle => vehicle.type === type),
    getAvailable: () => readDatabase<DBXVehicle>('vehicles').filter(vehicle => vehicle.availability),
    add: (vehicle: Omit<DBXVehicle, 'id'>) => {
      const id = crypto.randomUUID();
      const newVehicle = { ...vehicle, id };
      const vehicles = readDatabase<DBXVehicle>('vehicles');
      vehicles.push(newVehicle);
      writeDatabase('vehicles', vehicles);
      return newVehicle;
    },
    update: (id: string, updates: Partial<DBXVehicle>) => {
      const vehicles = readDatabase<DBXVehicle>('vehicles');
      const index = vehicles.findIndex(vehicle => vehicle.id === id);
      if (index === -1) return null;
      
      vehicles[index] = { ...vehicles[index], ...updates };
      writeDatabase('vehicles', vehicles);
      return vehicles[index];
    },
    delete: (id: string) => {
      const vehicles = readDatabase<DBXVehicle>('vehicles');
      const newVehicles = vehicles.filter(vehicle => vehicle.id !== id);
      writeDatabase('vehicles', newVehicles);
      return true;
    }
  },
  
  users: {
    getAll: () => readDatabase<DBXUser>('users'),
    getById: (id: string) => readDatabase<DBXUser>('users').find(user => user.id === id),
    getByEmail: (email: string) => readDatabase<DBXUser>('users').find(user => user.email.toLowerCase() === email.toLowerCase()),
    add: (user: Omit<DBXUser, 'id'>) => {
      const id = crypto.randomUUID();
      const newUser = { ...user, id };
      const users = readDatabase<DBXUser>('users');
      users.push(newUser);
      writeDatabase('users', users);
      return newUser;
    },
    update: (id: string, updates: Partial<DBXUser>) => {
      const users = readDatabase<DBXUser>('users');
      const index = users.findIndex(user => user.id === id);
      if (index === -1) return null;
      
      users[index] = { ...users[index], ...updates };
      writeDatabase('users', users);
      return users[index];
    },
    delete: (id: string) => {
      const users = readDatabase<DBXUser>('users');
      const newUsers = users.filter(user => user.id !== id);
      writeDatabase('users', newUsers);
      return true;
    }
  },
  
  bookings: {
    getAll: () => readDatabase<DBXBooking>('bookings'),
    getById: (id: string) => readDatabase<DBXBooking>('bookings').find(booking => booking.id === id),
    getByUserId: (userId: string) => readDatabase<DBXBooking>('bookings').filter(booking => booking.userId === userId),
    getByStatus: (status: string) => readDatabase<DBXBooking>('bookings').filter(booking => booking.status === status),
    add: (booking: Omit<DBXBooking, 'id' | 'createdAt'>) => {
      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      const newBooking = { ...booking, id, createdAt };
      const bookings = readDatabase<DBXBooking>('bookings');
      bookings.push(newBooking);
      writeDatabase('bookings', bookings);
      return newBooking;
    },
    update: (id: string, updates: Partial<DBXBooking>) => {
      const bookings = readDatabase<DBXBooking>('bookings');
      const index = bookings.findIndex(booking => booking.id === id);
      if (index === -1) return null;
      
      bookings[index] = { ...bookings[index], ...updates };
      writeDatabase('bookings', bookings);
      return bookings[index];
    },
    delete: (id: string) => {
      const bookings = readDatabase<DBXBooking>('bookings');
      const newBookings = bookings.filter(booking => booking.id !== id);
      writeDatabase('bookings', newBookings);
      return true;
    }
  },
  
  banners: {
    getAll: () => readDatabase<DBXBanner>('banners'),
    getById: (id: string) => readDatabase<DBXBanner>('banners').find(banner => banner.id === id),
    getByPage: (page: string) => readDatabase<DBXBanner>('banners').filter(banner => banner.page === page),
    getActiveByPage: (page: string) => readDatabase<DBXBanner>('banners').find(banner => banner.page === page && banner.isActive),
    add: (banner: Omit<DBXBanner, 'id' | 'createdAt' | 'updatedAt'>) => {
      const id = `banner-${Date.now()}`;
      const now = new Date().toISOString();
      
      // Si cette bannière est active, désactiver les autres pour la même page
      if (banner.isActive) {
        const banners = readDatabase<DBXBanner>('banners');
        const updatedBanners = banners.map(existingBanner => {
          if (existingBanner.page === banner.page && existingBanner.isActive) {
            return { ...existingBanner, isActive: false, updatedAt: now };
          }
          return existingBanner;
        });
        writeDatabase('banners', updatedBanners);
      }
      
      const newBanner = { 
        ...banner, 
        id, 
        createdAt: now, 
        updatedAt: now 
      };
      
      const banners = readDatabase<DBXBanner>('banners');
      banners.push(newBanner);
      writeDatabase('banners', banners);
      return id;
    },
    update: (id: string, updates: Partial<Omit<DBXBanner, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const banners = readDatabase<DBXBanner>('banners');
      const index = banners.findIndex(banner => banner.id === id);
      if (index === -1) return false;
      
      const now = new Date().toISOString();
      
      // Si on active cette bannière, désactiver les autres de la même page
      if (updates.isActive && !banners[index].isActive) {
        const page = updates.page || banners[index].page;
        for (let i = 0; i < banners.length; i++) {
          if (i !== index && banners[i].page === page && banners[i].isActive) {
            banners[i] = { ...banners[i], isActive: false, updatedAt: now };
          }
        }
      }
      
      banners[index] = { 
        ...banners[index], 
        ...updates, 
        updatedAt: now 
      };
      
      writeDatabase('banners', banners);
      return true;
    },
    delete: (id: string) => {
      const banners = readDatabase<DBXBanner>('banners');
      const newBanners = banners.filter(banner => banner.id !== id);
      writeDatabase('banners', newBanners);
      return true;
    }
  }
};
