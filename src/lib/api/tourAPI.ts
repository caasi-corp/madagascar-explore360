
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
};
