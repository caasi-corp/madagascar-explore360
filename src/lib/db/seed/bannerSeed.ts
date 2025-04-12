
import { IDBPDatabase } from 'idb';
import { NorthGascarDB, Banner } from '../schema';

/**
 * Seeds banner data into the database
 * @param db The database connection
 */
export const seedBanners = async (db: IDBPDatabase<NorthGascarDB>): Promise<void> => {
  console.log("Initialisation des bannières par défaut...");
  
  try {
    // Vérifions d'abord si des bannières existent déjà
    const existingBanners = await db.getAll('banners');
    
    if (existingBanners.length > 0) {
      console.log(`${existingBanners.length} bannières déjà présentes, pas besoin d'en ajouter.`);
      return;
    }
    
    const now = new Date().toISOString();
    
    const banners: Banner[] = [
      {
        id: 'banner-home-1',
        name: 'Bannière Accueil Principal',
        imagePath: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
        page: 'home',
        isActive: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'banner-tours-1',
        name: 'Bannière Circuits',
        imagePath: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4',
        page: 'tours',
        isActive: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'banner-vehicles-1',
        name: 'Bannière Véhicules',
        imagePath: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
        page: 'vehicules',
        isActive: true,
        createdAt: now,
        updatedAt: now
      }
    ];
    
    // Utilisons une seule transaction pour toutes les bannières
    const tx = db.transaction('banners', 'readwrite');
    for (const banner of banners) {
      await tx.store.add(banner);
      console.log(`Bannière ajoutée: ${banner.name}`);
    }
    
    await tx.done;
    console.log("Bannières ajoutées avec succès.");
  } catch (e) {
    console.error("Erreur lors de l'ajout des bannières:", e);
  }
};
