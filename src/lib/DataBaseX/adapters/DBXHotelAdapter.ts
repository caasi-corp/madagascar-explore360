
/**
 * Adaptateur pour les opérations sur les hôtels avec DBX
 */
import { Hotel } from '../../db/schema';
import { dbxManager } from '../DBXManager';

export const DBXHotelAdapter = {
  getAll: (): Hotel[] => {
    return dbxManager.readDBX<Hotel>('hotels');
  },
  
  getById: (id: string): Hotel | undefined => {
    const hotels = dbxManager.readDBX<Hotel>('hotels');
    return hotels.find(hotel => hotel.id === id);
  },
  
  getByLocation: (location: string): Hotel[] => {
    const hotels = dbxManager.readDBX<Hotel>('hotels');
    return hotels.filter(hotel => hotel.location.toLowerCase().includes(location.toLowerCase()));
  },
  
  getAvailable: (): Hotel[] => {
    const hotels = dbxManager.readDBX<Hotel>('hotels');
    return hotels.filter(hotel => hotel.availability);
  },
  
  add: (hotel: Omit<Hotel, 'id'>): Hotel => {
    const id = crypto.randomUUID();
    const newHotel = { ...hotel, id };
    return dbxManager.updateItem<Hotel>('hotels', newHotel);
  },
  
  update: (id: string, hotelData: Partial<Hotel>): Hotel => {
    const hotels = dbxManager.readDBX<Hotel>('hotels');
    const existingHotel = hotels.find(h => h.id === id);
    
    if (!existingHotel) {
      throw new Error('Hotel not found');
    }
    
    const updatedHotel = { ...existingHotel, ...hotelData };
    return dbxManager.updateItem<Hotel>('hotels', updatedHotel);
  },
  
  delete: (id: string): boolean => {
    return dbxManager.deleteItem<Hotel>('hotels', id);
  },
  
  search: (searchParams: {
    term?: string;
    location?: string;
    minStars?: number;
    maxStars?: number;
    minPrice?: number;
    maxPrice?: number;
  }): Hotel[] => {
    let hotels = dbxManager.readDBX<Hotel>('hotels');
    
    if (searchParams.term) {
      const term = searchParams.term.toLowerCase();
      hotels = hotels.filter(hotel => 
        hotel.name.toLowerCase().includes(term) || 
        hotel.location.toLowerCase().includes(term)
      );
    }
    
    if (searchParams.location) {
      hotels = hotels.filter(hotel => 
        hotel.location.toLowerCase().includes(searchParams.location!.toLowerCase())
      );
    }
    
    if (searchParams.minStars !== undefined) {
      hotels = hotels.filter(hotel => hotel.stars >= searchParams.minStars!);
    }
    
    if (searchParams.maxStars !== undefined) {
      hotels = hotels.filter(hotel => hotel.stars <= searchParams.maxStars!);
    }
    
    if (searchParams.minPrice !== undefined) {
      hotels = hotels.filter(hotel => hotel.pricePerNight >= searchParams.minPrice!);
    }
    
    if (searchParams.maxPrice !== undefined) {
      hotels = hotels.filter(hotel => hotel.pricePerNight <= searchParams.maxPrice!);
    }
    
    return hotels;
  }
};
