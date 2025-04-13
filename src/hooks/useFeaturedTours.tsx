
import { useState, useEffect } from 'react';
import { TourProps } from '@/components/TourCard';
import { tourAPI } from '@/lib/store';

export function useFeaturedTours() {
  const [featuredTours, setFeaturedTours] = useState<TourProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        setLoading(true);
        const tours = await tourAPI.getFeatured();
        console.log('Tours mis en avant chargés:', tours);
        setFeaturedTours(tours);
      } catch (error) {
        console.error('Erreur lors du chargement des tours mis en avant:', error);
        // Fallback to static data in case of error
        setFeaturedTours([
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
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTours();
  }, []);

  return { featuredTours, loading };
}
