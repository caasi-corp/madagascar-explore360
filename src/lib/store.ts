
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface Tour {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  featured?: boolean;
  category?: string;
}

interface Vehicle {
  id: string;
  name: string;
  type: 'car' | '4x4' | 'motorcycle' | 'quad';
  pricePerDay: number;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: string;
  image: string;
  features: string[];
  availability: boolean;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

interface Booking {
  id: string;
  userId: string;
  tourId?: string;
  vehicleId?: string;
  hotelId?: string;
  flightId?: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  totalPrice: number;
  createdAt: string;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  image: string;
  features: string[];
  availability: boolean;
}

interface Flight {
  id: string;
  departure: string;
  arrival: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  airline: string;
  price: number;
  availableSeats: number;
}

interface NorthGascarDB extends DBSchema {
  tours: {
    key: string;
    value: Tour;
    indexes: {
      'by-category': string;
      'by-location': string;
    };
  };
  vehicles: {
    key: string;
    value: Vehicle;
    indexes: {
      'by-type': string;
    };
  };
  users: {
    key: string;
    value: User;
    indexes: {
      'by-email': string;
    };
  };
  bookings: {
    key: string;
    value: Booking;
    indexes: {
      'by-userId': string;
      'by-status': string;
    };
  };
  hotels: {
    key: string;
    value: Hotel;
    indexes: {
      'by-location': string;
    };
  };
  flights: {
    key: string;
    value: Flight;
    indexes: {
      'by-departure': string;
      'by-arrival': string;
      'by-departureDate': string;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<NorthGascarDB>>;

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
        seedInitialData(db);
      },
    });
  }
  return dbPromise;
};

const seedInitialData = async (db: IDBPDatabase<NorthGascarDB>) => {
  // Seed tours
  const tours: Tour[] = [
    {
      id: '1',
      title: 'Avenue of the Baobabs Tour',
      description: 'Experience the iconic Avenue of the Baobabs, one of Madagascar\'s most famous landmarks.',
      location: 'Morondava',
      duration: '2 Days',
      price: 299,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      featured: true,
      category: 'Nature',
    },
    {
      id: '2',
      title: 'Lemur Trekking in Andasibe',
      description: 'Trek through the Andasibe National Park and encounter various species of lemurs in their natural habitat.',
      location: 'Andasibe',
      duration: '3 Days',
      price: 349,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      featured: true,
      category: 'Wildlife',
    },
    {
      id: '3',
      title: 'Isalo National Park Adventure',
      description: 'Discover the stunning landscapes of Isalo National Park with its canyons, waterfalls and natural pools.',
      location: 'Isalo',
      duration: '4 Days',
      price: 499,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
      featured: true,
      category: 'Adventure',
    },
    {
      id: '4',
      title: 'Nosy Be Island Paradise',
      description: 'Relax on the beautiful beaches of Nosy Be, Madagascar\'s premier beach destination.',
      location: 'Nosy Be',
      duration: '5 Days',
      price: 599,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
      featured: false,
      category: 'Beach',
    },
    {
      id: '5',
      title: 'Ranomafana National Park Expedition',
      description: 'Explore the lush rainforests of Ranomafana and spot rare species of lemurs, birds and chameleons.',
      location: 'Ranomafana',
      duration: '3 Days',
      price: 389,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a',
      featured: false,
      category: 'Wildlife',
    },
    {
      id: '6',
      title: 'Tsingy de Bemaraha Trek',
      description: 'Journey through the spectacular limestone formations of the Tsingy de Bemaraha National Park.',
      location: 'Bemaraha',
      duration: '4 Days',
      price: 649,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1504623953583-4ae307ea839f',
      featured: false,
      category: 'Adventure',
    },
  ];
  
  // Seed vehicles
  const vehicles: Vehicle[] = [
    {
      id: 'v1',
      name: 'Toyota Land Cruiser',
      type: '4x4',
      pricePerDay: 89,
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
      features: ['Air Conditioning', 'GPS Navigation', 'Roof Rack', '4x4 Drive', 'Bluetooth', 'USB Ports'],
      availability: true,
    },
    {
      id: 'v2',
      name: 'Yamaha TW200',
      type: 'motorcycle',
      pricePerDay: 45,
      seats: 2,
      transmission: 'Manual',
      fuelType: 'Petrol',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
      features: ['Helmet Included', 'Saddlebags', 'Off-road Capability', 'Fuel Efficient'],
      availability: true,
    },
    {
      id: 'v3',
      name: 'BRP Can-Am Outlander',
      type: 'quad',
      pricePerDay: 65,
      seats: 1,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      image: 'https://images.unsplash.com/photo-1566845735839-6e25c92269a1',
      features: ['Helmet Included', 'Storage Box', '4x4 Drive', 'High Ground Clearance'],
      availability: true,
    },
  ];
  
  // Add admin user
  const adminUser: User = {
    id: 'admin1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@northgascartours.com',
    password: 'admin', // In a real app, this would be hashed
    role: 'admin',
  };

  // Store data
  const tourStore = db.transaction('tours', 'readwrite').objectStore('tours');
  for (const tour of tours) {
    tourStore.put(tour);
  }
  
  const vehicleStore = db.transaction('vehicles', 'readwrite').objectStore('vehicles');
  for (const vehicle of vehicles) {
    vehicleStore.put(vehicle);
  }
  
  const userStore = db.transaction('users', 'readwrite').objectStore('users');
  userStore.put(adminUser);
};

// Tours API
export const tourAPI = {
  getAll: async () => {
    const db = await initDB();
    return db.getAll('tours');
  },
  
  getById: async (id: string) => {
    const db = await initDB();
    return db.get('tours', id);
  },
  
  getByCategory: async (category: string) => {
    const db = await initDB();
    return db.getAllFromIndex('tours', 'by-category', category);
  },
  
  getByLocation: async (location: string) => {
    const db = await initDB();
    return db.getAllFromIndex('tours', 'by-location', location);
  },
  
  getFeatured: async () => {
    const db = await initDB();
    const allTours = await db.getAll('tours');
    return allTours.filter(tour => tour.featured);
  },
  
  add: async (tour: Omit<Tour, 'id'>) => {
    const db = await initDB();
    const id = crypto.randomUUID();
    const newTour = { ...tour, id };
    await db.put('tours', newTour);
    return newTour;
  },
  
  update: async (id: string, tour: Partial<Tour>) => {
    const db = await initDB();
    const existingTour = await db.get('tours', id);
    if (!existingTour) {
      throw new Error('Tour not found');
    }
    const updatedTour = { ...existingTour, ...tour };
    await db.put('tours', updatedTour);
    return updatedTour;
  },
  
  delete: async (id: string) => {
    const db = await initDB();
    await db.delete('tours', id);
  },
};

// Vehicles API
export const vehicleAPI = {
  getAll: async () => {
    const db = await initDB();
    return db.getAll('vehicles');
  },
  
  getById: async (id: string) => {
    const db = await initDB();
    return db.get('vehicles', id);
  },
  
  getByType: async (type: string) => {
    const db = await initDB();
    return db.getAllFromIndex('vehicles', 'by-type', type);
  },
  
  getAvailable: async () => {
    const db = await initDB();
    const allVehicles = await db.getAll('vehicles');
    return allVehicles.filter(vehicle => vehicle.availability);
  },
  
  add: async (vehicle: Omit<Vehicle, 'id'>) => {
    const db = await initDB();
    const id = crypto.randomUUID();
    const newVehicle = { ...vehicle, id };
    await db.put('vehicles', newVehicle);
    return newVehicle;
  },
  
  update: async (id: string, vehicle: Partial<Vehicle>) => {
    const db = await initDB();
    const existingVehicle = await db.get('vehicles', id);
    if (!existingVehicle) {
      throw new Error('Vehicle not found');
    }
    const updatedVehicle = { ...existingVehicle, ...vehicle };
    await db.put('vehicles', updatedVehicle);
    return updatedVehicle;
  },
  
  delete: async (id: string) => {
    const db = await initDB();
    await db.delete('vehicles', id);
  },
};

// User API
export const userAPI = {
  getAll: async () => {
    const db = await initDB();
    return db.getAll('users');
  },
  
  getById: async (id: string) => {
    const db = await initDB();
    return db.get('users', id);
  },
  
  getByEmail: async (email: string) => {
    const db = await initDB();
    return db.getFromIndex('users', 'by-email', email);
  },
  
  authenticate: async (email: string, password: string) => {
    const user = await userAPI.getByEmail(email);
    if (user && user.password === password) { // In a real app, use proper password comparison
      return { id: user.id, email: user.email, role: user.role };
    }
    return null;
  },
  
  register: async (userData: Omit<User, 'id' | 'role'>) => {
    const db = await initDB();
    // Check if email already exists
    const existingUser = await userAPI.getByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    const id = crypto.randomUUID();
    const newUser = { ...userData, id, role: 'user' as const };
    await db.put('users', newUser);
    return { id: newUser.id, email: newUser.email, role: newUser.role };
  },
  
  update: async (id: string, userData: Partial<User>) => {
    const db = await initDB();
    const existingUser = await db.get('users', id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    const updatedUser = { ...existingUser, ...userData };
    await db.put('users', updatedUser);
    return { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role };
  },
  
  delete: async (id: string) => {
    const db = await initDB();
    await db.delete('users', id);
  },
};

// Booking API
export const bookingAPI = {
  getAll: async () => {
    const db = await initDB();
    return db.getAll('bookings');
  },
  
  getById: async (id: string) => {
    const db = await initDB();
    return db.get('bookings', id);
  },
  
  getByUserId: async (userId: string) => {
    const db = await initDB();
    return db.getAllFromIndex('bookings', 'by-userId', userId);
  },
  
  getByStatus: async (status: string) => {
    const db = await initDB();
    return db.getAllFromIndex('bookings', 'by-status', status);
  },
  
  add: async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const db = await initDB();
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const newBooking = { ...booking, id, createdAt };
    await db.put('bookings', newBooking);
    return newBooking;
  },
  
  update: async (id: string, booking: Partial<Booking>) => {
    const db = await initDB();
    const existingBooking = await db.get('bookings', id);
    if (!existingBooking) {
      throw new Error('Booking not found');
    }
    const updatedBooking = { ...existingBooking, ...booking };
    await db.put('bookings', updatedBooking);
    return updatedBooking;
  },
  
  delete: async (id: string) => {
    const db = await initDB();
    await db.delete('bookings', id);
  },
};

export type { Tour, Vehicle, User, Booking, Hotel, Flight };
