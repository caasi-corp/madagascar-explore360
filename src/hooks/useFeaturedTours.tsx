
import { useEffect, useState } from 'react';
import { TourProps } from '@/components/TourCard';
import { tourAPI } from '@/lib/api/tourAPI';
import { dbx, initDB } from '@/lib/DatabaseX/db';

export function useFeaturedTours(): TourProps[] {
  const [tours, setTours] = useState<TourProps[]>([]);
  
  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Assurons-nous que la base de données est initialisée
        await initDB();
        
        // Récupérer les circuits en vedette
        const featuredTours = await tourAPI.getFeatured();
        
        if (featuredTours && featuredTours.length > 0) {
          setTours(featuredTours);
        } else {
          console.log('Aucun circuit en vedette trouvé, utilisation des données de secours');
          // Utiliser les données de secours
          setTours([
            {
              id: '1',
              title: 'Circuit Allée des Baobabs',
              description: 'Découvrez l\'emblématique Allée des Baobabs, l\'un des sites les plus célèbres de Madagascar.',
              location: 'Morondava',
              duration: '2 Jours',
              price: 299,
              rating: 4.9,
              image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
              featured: true,
              category: 'Nature',
              active: true,
            },
            {
              id: '2',
              title: 'Randonnée Lémuriens à Andasibe',
              description: 'Randonnez à travers le Parc National d\'Andasibe et rencontrez différentes espèces de lémuriens dans leur habitat naturel.',
              location: 'Andasibe',
              duration: '3 Jours',
              price: 349,
              rating: 4.8,
              image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
              featured: true,
              category: 'Faune',
              active: true,
            },
            {
              id: '3',
              title: 'Aventure au Parc National de l\'Isalo',
              description: 'Découvrez les paysages époustouflants du Parc National de l\'Isalo avec ses canyons, cascades et piscines naturelles.',
              location: 'Isalo',
              duration: '4 Jours',
              price: 499,
              rating: 4.7,
              image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
              featured: true,
              category: 'Aventure',
              active: true,
            },
            {
              id: '4',
              title: 'Paradis de l\'île de Nosy Be',
              description: 'Détendez-vous sur les magnifiques plages de Nosy Be, la principale destination balnéaire de Madagascar.',
              location: 'Nosy Be',
              duration: '5 Jours',
              price: 599,
              rating: 4.9,
              image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
              featured: false,
              category: 'Plage',
              active: true,
            },
          ]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des circuits en vedette:', error);
        // Utiliser des données de secours en cas d'erreur
        setTours([
          {
            id: '1',
            title: 'Circuit Allée des Baobabs',
            description: 'Découvrez l\'emblématique Allée des Baobabs, l\'un des sites les plus célèbres de Madagascar.',
            location: 'Morondava',
            duration: '2 Jours',
            price: 299,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
            featured: true,
            category: 'Nature',
            active: true,
          },
          {
            id: '2',
            title: 'Randonnée Lémuriens à Andasibe',
            description: 'Randonnez à travers le Parc National d\'Andasibe et rencontrez différentes espèces de lémuriens dans leur habitat naturel.',
            location: 'Andasibe',
            duration: '3 Jours',
            price: 349,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
            featured: true,
            category: 'Faune',
            active: true,
          },
        ]);
      }
    };

    fetchTours();
  }, []);

  return tours;
}
