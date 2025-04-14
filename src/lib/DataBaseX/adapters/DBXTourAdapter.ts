
/**
 * Adaptateur pour les opérations sur les tours avec DBX
 */
import { Tour } from '../../db/schema';
import { dbxManager } from '../DBXManager';

export const DBXTourAdapter = {
  getAll: (): Tour[] => {
    return dbxManager.readDBX<Tour>('tours');
  },
  
  getById: (id: string): Tour | undefined => {
    const tours = dbxManager.readDBX<Tour>('tours');
    return tours.find(tour => tour.id === id);
  },
  
  getByCategory: (category: string): Tour[] => {
    const tours = dbxManager.readDBX<Tour>('tours');
    return tours.filter(tour => tour.category === category);
  },
  
  getByLocation: (location: string): Tour[] => {
    const tours = dbxManager.readDBX<Tour>('tours');
    return tours.filter(tour => tour.location === location);
  },
  
  getFeatured: (): Tour[] => {
    const tours = dbxManager.readDBX<Tour>('tours');
    return tours.filter(tour => tour.featured);
  },
  
  add: (tour: Omit<Tour, 'id'>): Tour => {
    const id = crypto.randomUUID();
    const newTour = { ...tour, id };
    return dbxManager.updateItem<Tour>('tours', newTour);
  },
  
  update: (id: string, tourData: Partial<Tour>): Tour => {
    const tours = dbxManager.readDBX<Tour>('tours');
    const existingTour = tours.find(t => t.id === id);
    
    if (!existingTour) {
      throw new Error('Tour not found');
    }
    
    const updatedTour = { ...existingTour, ...tourData };
    return dbxManager.updateItem<Tour>('tours', updatedTour);
  },
  
  delete: (id: string): boolean => {
    return dbxManager.deleteItem<Tour>('tours', id);
  },
  
  search: (searchParams: {
    term?: string;
    category?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
    active?: boolean;
  }): Tour[] => {
    let tours = dbxManager.readDBX<Tour>('tours');
    
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
      tours = tours.filter(tour => tour.price >= searchParams.minPrice);
    }
    
    if (searchParams.maxPrice !== undefined) {
      tours = tours.filter(tour => tour.price <= searchParams.maxPrice);
    }
    
    if (searchParams.featured !== undefined) {
      tours = tours.filter(tour => tour.featured === searchParams.featured);
    }
    
    if (searchParams.active !== undefined) {
      tours = tours.filter(tour => tour.active === searchParams.active);
    }
    
    return tours;
  }
};
