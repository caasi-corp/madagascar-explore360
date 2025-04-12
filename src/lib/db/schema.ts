
/**
 * Database schema definitions for the application
 */

// Define the interfaces for our database models
export interface Tour {
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
  active?: boolean;
}

export interface Vehicle {
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
  description?: string;
  featured?: boolean;
  images?: string[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface Booking {
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

export interface Hotel {
  id: string;
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  image: string;
  features: string[];
  availability: boolean;
}

export interface Flight {
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

export interface Photo {
  id: string;
  url: string;
  category: 'hero' | 'catamaran' | 'destination' | 'cruise' | 'experience';
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

// Define the database schema
import { DBSchema } from 'idb';

export interface NorthGascarDB extends DBSchema {
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
  photos: {
    key: string;
    value: Photo;
    indexes: {
      'by-category': string;
    };
  };
}
