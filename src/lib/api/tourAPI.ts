
import { getDB } from '../db/db';
import { Tour } from '../db/schema';

/**
 * API for tour operations
 */
export const tourAPI = {
  getAll: async () => {
    const db = await getDB();
    return db.getAll('tours');
  },
  
  getById: async (id: string) => {
    const db = await getDB();
    return db.get('tours', id);
  },
  
  getByCategory: async (category: string) => {
    const db = await getDB();
    return db.getAllFromIndex('tours', 'by-category', category);
  },
  
  getByLocation: async (location: string) => {
    const db = await getDB();
    return db.getAllFromIndex('tours', 'by-location', location);
  },
  
  getFeatured: async () => {
    const db = await getDB();
    const allTours = await db.getAll('tours');
    return allTours.filter(tour => tour.featured);
  },
  
  getRelated: async (id: string, category: string) => {
    const db = await getDB();
    const allTours = await db.getAllFromIndex('tours', 'by-category', category);
    return allTours.filter(tour => tour.id !== id).slice(0, 4);
  },
  
  search: async (searchParams: {
    term?: string;
    category?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
    active?: boolean;
  }) => {
    const db = await getDB();
    let tours = await db.getAll('tours');
    
    if (searchParams.term) {
      const term = searchParams.term.toLowerCase();
      tours = tours.filter(tour => 
        tour.title.toLowerCase().includes(term) || 
        tour.description.toLowerCase().includes(term) || 
        tour.location.toLowerCase().includes(term)
      );
    }
    
    if (searchParams.category) {
      tours = tours.filter(tour => tour.category === searchParams.category);
    }
    
    if (searchParams.location) {
      tours = tours.filter(tour => tour.location === searchParams.location);
    }
    
    if (searchParams.minPrice !== undefined) {
      tours = tours.filter(tour => tour.price >= searchParams.minPrice!);
    }
    
    if (searchParams.maxPrice !== undefined) {
      tours = tours.filter(tour => tour.price <= searchParams.maxPrice!);
    }
    
    if (searchParams.featured !== undefined) {
      tours = tours.filter(tour => tour.featured === searchParams.featured);
    }
    
    if (searchParams.active !== undefined) {
      tours = tours.filter(tour => tour.active === searchParams.active);
    }
    
    return tours;
  },
  
  add: async (tour: Omit<Tour, 'id'>) => {
    const db = await getDB();
    const id = crypto.randomUUID();
    const newTour = { ...tour, id };
    await db.put('tours', newTour);
    return newTour;
  },
  
  update: async (id: string, tour: Partial<Tour>) => {
    const db = await getDB();
    const existingTour = await db.get('tours', id);
    if (!existingTour) {
      throw new Error('Tour not found');
    }
    const updatedTour = { ...existingTour, ...tour };
    await db.put('tours', updatedTour);
    return updatedTour;
  },
  
  delete: async (id: string) => {
    const db = await getDB();
    await db.delete('tours', id);
  },
  
  searchByPrice: async (minPrice: number, maxPrice: number) => {
    const db = await getDB();
    const allTours = await db.getAll('tours');
    return allTours.filter(tour => tour.price >= minPrice && tour.price <= maxPrice);
  },
  
  searchByDuration: async (minDays: number, maxDays: number) => {
    const db = await getDB();
    const allTours = await db.getAll('tours');
    return allTours.filter(tour => {
      const days = parseInt(tour.duration.split(' ')[0]);
      return days >= minDays && days <= maxDays;
    });
  },
  
  getAllCategories: async () => {
    const db = await getDB();
    const allTours = await db.getAll('tours');
    return [...new Set(allTours.map(tour => tour.category))].filter(Boolean);
  },
  
  getAllLocations: async () => {
    const db = await getDB();
    const allTours = await db.getAll('tours');
    return [...new Set(allTours.map(tour => tour.location))].filter(Boolean);
  }
};
