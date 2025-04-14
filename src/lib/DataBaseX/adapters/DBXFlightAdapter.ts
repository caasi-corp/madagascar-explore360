
/**
 * Adaptateur pour les opérations sur les vols avec DBX
 */
import { Flight } from '../../db/schema';
import { dbxManager } from '../DBXManager';

export const DBXFlightAdapter = {
  getAll: (): Flight[] => {
    return dbxManager.readDBX<Flight>('flights');
  },
  
  getById: (id: string): Flight | undefined => {
    const flights = dbxManager.readDBX<Flight>('flights');
    return flights.find(flight => flight.id === id);
  },
  
  getByRoute: (departure: string, arrival: string): Flight[] => {
    const flights = dbxManager.readDBX<Flight>('flights');
    return flights.filter(flight => 
      flight.departure.toLowerCase() === departure.toLowerCase() && 
      flight.arrival.toLowerCase() === arrival.toLowerCase()
    );
  },
  
  getByDate: (date: string): Flight[] => {
    const flights = dbxManager.readDBX<Flight>('flights');
    return flights.filter(flight => flight.departureDate === date);
  },
  
  getAvailable: (): Flight[] => {
    const flights = dbxManager.readDBX<Flight>('flights');
    return flights.filter(flight => flight.availableSeats > 0);
  },
  
  add: (flight: Omit<Flight, 'id'>): Flight => {
    const id = crypto.randomUUID();
    const newFlight = { ...flight, id };
    return dbxManager.updateItem<Flight>('flights', newFlight);
  },
  
  update: (id: string, flightData: Partial<Flight>): Flight => {
    const flights = dbxManager.readDBX<Flight>('flights');
    const existingFlight = flights.find(f => f.id === id);
    
    if (!existingFlight) {
      throw new Error('Flight not found');
    }
    
    const updatedFlight = { ...existingFlight, ...flightData };
    return dbxManager.updateItem<Flight>('flights', updatedFlight);
  },
  
  delete: (id: string): boolean => {
    return dbxManager.deleteItem<Flight>('flights', id);
  },
  
  search: (searchParams: {
    departure?: string;
    arrival?: string;
    departureDate?: string;
    airline?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Flight[] => {
    let flights = dbxManager.readDBX<Flight>('flights');
    
    if (searchParams.departure) {
      flights = flights.filter(flight => 
        flight.departure.toLowerCase().includes(searchParams.departure!.toLowerCase())
      );
    }
    
    if (searchParams.arrival) {
      flights = flights.filter(flight => 
        flight.arrival.toLowerCase().includes(searchParams.arrival!.toLowerCase())
      );
    }
    
    if (searchParams.departureDate) {
      flights = flights.filter(flight => flight.departureDate === searchParams.departureDate);
    }
    
    if (searchParams.airline) {
      flights = flights.filter(flight => 
        flight.airline.toLowerCase().includes(searchParams.airline!.toLowerCase())
      );
    }
    
    if (searchParams.minPrice !== undefined) {
      flights = flights.filter(flight => flight.price >= searchParams.minPrice!);
    }
    
    if (searchParams.maxPrice !== undefined) {
      flights = flights.filter(flight => flight.price <= searchParams.maxPrice!);
    }
    
    return flights;
  }
};
