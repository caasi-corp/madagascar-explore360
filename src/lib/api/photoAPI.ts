
import { Photo } from '../db/schema';
import { getDB } from '../db/db';

// Fonction pour générer un ID unique
const generateId = () => {
  return 'photo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
};

// API pour les photos
export const photoAPI = {
  // Récupérer toutes les photos
  async getAllPhotos(): Promise<Photo[]> {
    const db = await getDB();
    return db.getAll('photos');
  },

  // Récupérer les photos par catégorie
  async getPhotosByCategory(category: Photo['category']): Promise<Photo[]> {
    const db = await getDB();
    const index = db.transaction('photos').store.index('by-category');
    return index.getAll(category);
  },

  // Récupérer une photo par son ID
  async getPhotoById(id: string): Promise<Photo | undefined> {
    const db = await getDB();
    return db.get('photos', id);
  },

  // Ajouter une nouvelle photo
  async addPhoto(photo: Omit<Photo, 'id' | 'createdAt'>): Promise<Photo> {
    const db = await getDB();
    const newPhoto: Photo = {
      id: generateId(),
      ...photo,
      createdAt: new Date().toISOString()
    };
    await db.add('photos', newPhoto);
    return newPhoto;
  },

  // Mettre à jour une photo existante
  async updatePhoto(id: string, updates: Partial<Omit<Photo, 'id' | 'createdAt'>>): Promise<Photo | undefined> {
    const db = await getDB();
    const existingPhoto = await db.get('photos', id);
    
    if (!existingPhoto) {
      return undefined;
    }
    
    const updatedPhoto: Photo = {
      ...existingPhoto,
      ...updates
    };
    
    await db.put('photos', updatedPhoto);
    return updatedPhoto;
  },

  // Supprimer une photo
  async deletePhoto(id: string): Promise<boolean> {
    const db = await getDB();
    await db.delete('photos', id);
    return true;
  }
};

// Données initiales pour amorcer la base de données
export const seedPhotos = async () => {
  const db = await getDB();
  const count = await db.count('photos');
  
  if (count === 0) {
    const defaultBanners = [
      {
        id: 'photo_banner_1',
        title: 'Plage et vagues',
        url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
        description: 'Magnifique plage avec des vagues bleues',
        category: 'banner' as const,
        active: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'photo_banner_2',
        title: 'Baleine',
        url: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4',
        description: 'Une baleine nageant dans l\'océan',
        category: 'banner' as const,
        active: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'photo_banner_3',
        title: 'Rivière et forêt',
        url: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
        description: 'Rivière traversant une forêt luxuriante',
        category: 'banner' as const,
        active: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'photo_banner_4',
        title: 'Forêt et lac',
        url: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
        description: 'Forêt entourant un lac paisible',
        category: 'banner' as const,
        active: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'photo_banner_5',
        title: 'Dunes de sable',
        url: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
        description: 'Dunes de sable dorées au coucher du soleil',
        category: 'banner' as const,
        active: true,
        createdAt: new Date().toISOString()
      }
    ];
    
    const photoTx = db.transaction('photos', 'readwrite');
    const photoStore = photoTx.objectStore('photos');
    
    for (const photo of defaultBanners) {
      await photoStore.add(photo);
    }
    
    await photoTx.done;
    console.log("Photos par défaut ajoutées avec succès");
  } else {
    console.log(`${count} photos existent déjà dans la base de données`);
  }
};
