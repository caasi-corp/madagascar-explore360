
import { initDB } from "../db/db";
import type { Photo } from "../db/schema";

export type PhotoCategory = 'hero' | 'catamaran' | 'destination' | 'cruise' | 'experience';

export type { Photo };

const defaultPhotos: Photo[] = [
  // Hero images
  {
    id: "hero-1",
    url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    category: "hero",
    title: "Plage et vagues",
    description: "Plage tropicale avec vagues",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "hero-2",
    url: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    category: "hero",
    title: "Baleine",
    description: "Baleine dans l'océan",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "hero-3",
    url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    category: "hero",
    title: "Rivière et forêt",
    description: "Rivière à travers la forêt",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "hero-4",
    url: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    category: "hero",
    title: "Forêt et lac",
    description: "Vue sur le lac depuis la forêt",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "hero-5",
    url: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
    category: "hero",
    title: "Dunes de sable",
    description: "Dunes de sable au coucher du soleil",
    isActive: true,
    createdAt: new Date(),
  },
  
  // Catamaran images
  {
    id: "catamaran-1",
    url: "https://images.unsplash.com/photo-1563296291-14f26f10c20c",
    category: "catamaran",
    title: "Catamaran Paradis Bleu 1",
    description: "Vue principale du catamaran Paradis Bleu",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "catamaran-2",
    url: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166",
    category: "catamaran",
    title: "Catamaran Paradis Bleu 2",
    description: "Vue intérieure du catamaran Paradis Bleu",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "catamaran-3",
    url: "https://images.unsplash.com/photo-1542066559-83d5c27d5d6e",
    category: "catamaran",
    title: "Catamaran Paradis Bleu 3",
    description: "Vue du pont du catamaran Paradis Bleu",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "catamaran-4",
    url: "https://images.unsplash.com/photo-1556216576-a2eac9d8e7b7",
    category: "catamaran",
    title: "Catamaran Océan Nomade 1",
    description: "Vue principale du catamaran Océan Nomade",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "catamaran-5",
    url: "https://images.unsplash.com/photo-1562521623-d77d771453e0",
    category: "catamaran",
    title: "Catamaran Océan Nomade 2",
    description: "Vue intérieure du catamaran Océan Nomade",
    isActive: true,
    createdAt: new Date(),
  },
  
  // Cruise images
  {
    id: "cruise-1",
    url: "https://images.unsplash.com/photo-1540541338287-41700207dee6",
    category: "cruise",
    title: "Croisière Nosy Be",
    description: "Découverte de la Baie de Nosy Be",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "cruise-2",
    url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    category: "cruise",
    title: "Croisière Mitsio",
    description: "Les Îles de Mitsio",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "cruise-3",
    url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    category: "cruise",
    title: "Croisière Nosy Komba",
    description: "Tour de Nosy Komba",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "cruise-4",
    url: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    category: "cruise",
    title: "Croisière Radama",
    description: "Expédition Radama",
    isActive: true,
    createdAt: new Date(),
  },
  
  // Destination images
  {
    id: "destination-1",
    url: "https://images.unsplash.com/photo-1590523278191-304df6c77268",
    category: "destination",
    title: "Nosy Be",
    description: "L'île parfumée, point de départ de toutes nos croisières",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "destination-2",
    url: "https://images.unsplash.com/photo-1465447142348-e9952c393450",
    category: "destination",
    title: "Archipel de Mitsio",
    description: "Un paradis de biodiversité marine aux eaux turquoise",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "destination-3",
    url: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c",
    category: "destination",
    title: "Nosy Komba",
    description: "L'île aux lémuriens avec ses plages sauvages",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "destination-4",
    url: "https://images.unsplash.com/photo-1562523331-9ddcaeda6477",
    category: "destination",
    title: "Îles Radama",
    description: "Archipel préservé aux eaux cristallines et à la biodiversité exceptionnelle",
    isActive: true,
    createdAt: new Date(),
  }
];

export const photoAPI = {
  getAll: async (): Promise<Photo[]> => {
    const db = await initDB();
    
    try {
      let photos = await db.getAll('photos');
      
      if (!photos || photos.length === 0) {
        // Initialize with default photos if none exist
        for (const photo of defaultPhotos) {
          await db.put('photos', photo);
        }
        photos = defaultPhotos;
      }
      
      return photos;
    } catch (error) {
      console.error("Error getting photos:", error);
      return defaultPhotos;
    }
  },

  getByCategory: async (category: PhotoCategory): Promise<Photo[]> => {
    const db = await initDB();
    
    try {
      const allPhotos = await db.getAll('photos');
      
      if (!allPhotos || allPhotos.length === 0) {
        // Initialize with default photos if none exist
        for (const photo of defaultPhotos) {
          await db.put('photos', photo);
        }
        
        // Filter by category and return
        return defaultPhotos.filter(photo => photo.category === category);
      }
      
      return allPhotos.filter(photo => photo.category === category);
    } catch (error) {
      console.error("Error getting photos by category:", error);
      return defaultPhotos.filter(photo => photo.category === category);
    }
  },

  getActiveByCategory: async (category: PhotoCategory): Promise<Photo[]> => {
    const photos = await photoAPI.getByCategory(category);
    return photos.filter(photo => photo.isActive);
  },

  getById: async (id: string): Promise<Photo | undefined> => {
    const db = await initDB();
    try {
      return await db.get('photos', id);
    } catch (error) {
      console.error("Error getting photo by ID:", error);
      return undefined;
    }
  },

  add: async (photo: Omit<Photo, 'id' | 'createdAt'>): Promise<Photo> => {
    const db = await initDB();
    const newPhoto: Photo = {
      ...photo,
      id: `${photo.category}-${Date.now()}`,
      createdAt: new Date(),
    };
    
    try {
      await db.put('photos', newPhoto);
      return newPhoto;
    } catch (error) {
      console.error("Error adding photo:", error);
      throw error;
    }
  },

  update: async (id: string, photo: Partial<Photo>): Promise<Photo | undefined> => {
    const db = await initDB();
    
    try {
      const existingPhoto = await db.get('photos', id);
      
      if (!existingPhoto) {
        return undefined;
      }
      
      const updatedPhoto = {
        ...existingPhoto,
        ...photo,
      };
      
      await db.put('photos', updatedPhoto);
      return updatedPhoto;
    } catch (error) {
      console.error("Error updating photo:", error);
      throw error;
    }
  },

  toggleActive: async (id: string): Promise<Photo | undefined> => {
    const photo = await photoAPI.getById(id);
    if (!photo) return undefined;
    
    return photoAPI.update(id, { isActive: !photo.isActive });
  },

  delete: async (id: string): Promise<boolean> => {
    const db = await initDB();
    try {
      await db.delete('photos', id);
      return true;
    } catch (error) {
      console.error("Error deleting photo:", error);
      throw error;
    }
  }
};
