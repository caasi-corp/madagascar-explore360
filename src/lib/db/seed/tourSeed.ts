
import { IDBPDatabase } from 'idb';
import { NorthGascarDB, Tour } from '../schema';

/**
 * Seeds tour data into the database
 * @param db The database connection
 */
export const seedTours = async (db: IDBPDatabase<NorthGascarDB>): Promise<void> => {
  console.log("Ajout des circuits touristiques...");
  
  const tours: Tour[] = [
    {
      id: '1',
      title: 'Allée des Baobabs Tour',
      description: "Découvrez l'emblématique Allée des Baobabs, l'un des sites les plus célèbres de Madagascar.",
      location: 'Morondava',
      duration: '2 Jours',
      price: 299,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      featured: true,
      category: 'Nature',
    },
    {
      id: '2',
      title: 'Trek aux Lémuriens à Andasibe',
      description: 'Parcourez le Parc National d\'Andasibe et rencontrez différentes espèces de lémuriens dans leur habitat naturel.',
      location: 'Andasibe',
      duration: '3 Jours',
      price: 349,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      featured: true,
      category: 'Faune',
    },
    {
      id: '3',
      title: 'Aventure au Parc National d\'Isalo',
      description: 'Découvrez les paysages étonnants du Parc National d\'Isalo avec ses canyons, cascades et piscines naturelles.',
      location: 'Isalo',
      duration: '4 Jours',
      price: 499,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
      featured: true,
      category: 'Aventure',
    },
    {
      id: '4',
      title: 'Paradis de l\'île Nosy Be',
      description: 'Relaxez-vous sur les magnifiques plages de Nosy Be, la principale destination balnéaire de Madagascar.',
      location: 'Nosy Be',
      duration: '5 Jours',
      price: 599,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
      featured: false,
      category: 'Plage',
    },
    {
      id: '5',
      title: 'Expédition au Parc National de Ranomafana',
      description: 'Explorez les forêts luxuriantes de Ranomafana et observez des espèces rares de lémuriens, d\'oiseaux et de caméléons.',
      location: 'Ranomafana',
      duration: '3 Jours',
      price: 389,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a',
      featured: false,
      category: 'Faune',
    },
    {
      id: '6',
      title: 'Trek au Tsingy de Bemaraha',
      description: 'Voyagez à travers les spectaculaires formations calcaires du Parc National du Tsingy de Bemaraha.',
      location: 'Bemaraha',
      duration: '4 Jours',
      price: 649,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1504623953583-4ae307ea839f',
      featured: false,
      category: 'Aventure',
    },
  ];
  
  try {
    const toursTx = db.transaction('tours', 'readwrite');
    const toursStore = toursTx.objectStore('tours');
    for (const tour of tours) {
      await toursStore.put(tour);
    }
    await toursTx.done;
    console.log("Tours ajoutés avec succès");
  } catch (e) {
    console.error("Erreur lors de l'ajout des tours:", e);
  }
};
