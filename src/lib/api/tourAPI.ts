
import { getDB, saveDatabase, sqliteHelper } from '../db/sqlite';
import { Tour } from '../db/schema';

/**
 * API for tour operations
 */
export const tourAPI = {
  getAll: async () => {
    const db = await getDB();
    const tours = sqliteHelper.queryAll(db, "SELECT * FROM tours");
    return tours.map(tour => ({
      ...tour,
      featured: Boolean(tour.featured),
      active: Boolean(tour.active)
    })) as Tour[];
  },
  
  getById: async (id: string) => {
    const db = await getDB();
    const tour = sqliteHelper.queryOne(db, "SELECT * FROM tours WHERE id = $id", { $id: id });
    
    if (!tour) return null;
    
    return {
      ...tour,
      featured: Boolean(tour.featured),
      active: Boolean(tour.active)
    } as Tour;
  },
  
  getByCategory: async (category: string) => {
    const db = await getDB();
    const tours = sqliteHelper.queryAll(db, "SELECT * FROM tours WHERE category = $category", { $category: category });
    
    return tours.map(tour => ({
      ...tour,
      featured: Boolean(tour.featured),
      active: Boolean(tour.active)
    })) as Tour[];
  },
  
  getByLocation: async (location: string) => {
    const db = await getDB();
    const tours = sqliteHelper.queryAll(db, "SELECT * FROM tours WHERE location = $location", { $location: location });
    
    return tours.map(tour => ({
      ...tour,
      featured: Boolean(tour.featured),
      active: Boolean(tour.active)
    })) as Tour[];
  },
  
  getFeatured: async () => {
    const db = await getDB();
    const tours = sqliteHelper.queryAll(db, "SELECT * FROM tours WHERE featured = 1");
    
    return tours.map(tour => ({
      ...tour,
      featured: Boolean(tour.featured),
      active: Boolean(tour.active)
    })) as Tour[];
  },
  
  getRelated: async (id: string, category: string) => {
    const db = await getDB();
    const tours = sqliteHelper.queryAll(
      db, 
      "SELECT * FROM tours WHERE category = $category AND id != $id LIMIT 4", 
      { $category: category, $id: id }
    );
    
    return tours.map(tour => ({
      ...tour,
      featured: Boolean(tour.featured),
      active: Boolean(tour.active)
    })) as Tour[];
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
    let query = "SELECT * FROM tours WHERE 1=1";
    const params: any = {};
    
    if (searchParams.category) {
      query += " AND category = $category";
      params.$category = searchParams.category;
    }
    
    if (searchParams.location) {
      query += " AND location = $location";
      params.$location = searchParams.location;
    }
    
    if (searchParams.minPrice !== undefined) {
      query += " AND price >= $minPrice";
      params.$minPrice = searchParams.minPrice;
    }
    
    if (searchParams.maxPrice !== undefined) {
      query += " AND price <= $maxPrice";
      params.$maxPrice = searchParams.maxPrice;
    }
    
    if (searchParams.featured !== undefined) {
      query += " AND featured = $featured";
      params.$featured = searchParams.featured ? 1 : 0;
    }
    
    if (searchParams.active !== undefined) {
      query += " AND active = $active";
      params.$active = searchParams.active ? 1 : 0;
    }
    
    const tours = sqliteHelper.queryAll(db, query, params);
    
    // If there's a search term, we need to filter in JavaScript since SQLite doesn't have full-text search by default
    let filteredTours = tours;
    if (searchParams.term) {
      const term = searchParams.term.toLowerCase();
      filteredTours = tours.filter(tour => 
        tour.title.toLowerCase().includes(term) || 
        tour.description.toLowerCase().includes(term) || 
        tour.location.toLowerCase().includes(term)
      );
    }
    
    return filteredTours.map(tour => ({
      ...tour,
      featured: Boolean(tour.featured),
      active: Boolean(tour.active)
    })) as Tour[];
  },
  
  add: async (tour: Omit<Tour, 'id'>) => {
    const db = await getDB();
    const id = crypto.randomUUID();
    const featured = tour.featured ? 1 : 0;
    const active = tour.active ? 1 : 0;
    
    sqliteHelper.execute(
      db,
      `INSERT INTO tours (id, title, description, location, duration, price, rating, image, featured, category, active)
       VALUES ($id, $title, $description, $location, $duration, $price, $rating, $image, $featured, $category, $active)`,
      {
        $id: id,
        $title: tour.title,
        $description: tour.description,
        $location: tour.location,
        $duration: tour.duration,
        $price: tour.price,
        $rating: tour.rating,
        $image: tour.image,
        $featured: featured,
        $category: tour.category || null,
        $active: active
      }
    );
    
    await saveDatabase();
    
    return {
      ...tour,
      id
    } as Tour;
  },
  
  update: async (id: string, tour: Partial<Tour>) => {
    const db = await getDB();
    const existingTour = await tourAPI.getById(id);
    
    if (!existingTour) {
      throw new Error('Tour not found');
    }
    
    const updatedTour = { ...existingTour, ...tour };
    const featured = updatedTour.featured ? 1 : 0;
    const active = updatedTour.active ? 1 : 0;
    
    sqliteHelper.execute(
      db,
      `UPDATE tours SET 
       title = $title, 
       description = $description, 
       location = $location, 
       duration = $duration, 
       price = $price, 
       rating = $rating, 
       image = $image, 
       featured = $featured, 
       category = $category,
       active = $active
       WHERE id = $id`,
      {
        $id: id,
        $title: updatedTour.title,
        $description: updatedTour.description,
        $location: updatedTour.location,
        $duration: updatedTour.duration,
        $price: updatedTour.price,
        $rating: updatedTour.rating,
        $image: updatedTour.image,
        $featured: featured,
        $category: updatedTour.category || null,
        $active: active
      }
    );
    
    await saveDatabase();
    
    return updatedTour;
  },
  
  delete: async (id: string) => {
    const db = await getDB();
    sqliteHelper.execute(db, "DELETE FROM tours WHERE id = $id", { $id: id });
    await saveDatabase();
  },
  
  searchByPrice: async (minPrice: number, maxPrice: number) => {
    const db = await getDB();
    const tours = sqliteHelper.queryAll(
      db, 
      "SELECT * FROM tours WHERE price >= $minPrice AND price <= $maxPrice",
      { $minPrice: minPrice, $maxPrice: maxPrice }
    );
    
    return tours.map(tour => ({
      ...tour,
      featured: Boolean(tour.featured),
      active: Boolean(tour.active)
    })) as Tour[];
  },
  
  searchByDuration: async (minDays: number, maxDays: number) => {
    const db = await getDB();
    const allTours = await tourAPI.getAll();
    
    return allTours.filter(tour => {
      const days = parseInt(tour.duration.split(' ')[0]);
      return days >= minDays && days <= maxDays;
    });
  },
  
  getAllCategories: async () => {
    const db = await getDB();
    const categories = sqliteHelper.queryAll(db, "SELECT DISTINCT category FROM tours WHERE category IS NOT NULL");
    return categories.map(row => row.category);
  },
  
  getAllLocations: async () => {
    const db = await getDB();
    const locations = sqliteHelper.queryAll(db, "SELECT DISTINCT location FROM tours WHERE location IS NOT NULL");
    return locations.map(row => row.location);
  }
};
