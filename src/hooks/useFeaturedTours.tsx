
import { useState, useEffect } from 'react';
import { Tour } from '@/lib/db/schema';
import { tourAPI } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';

// Fallback tours data that matches the Tour type
const fallbackTours: Tour[] = [
  {
    id: '1',
    title: 'Parc National d\'Andasibe',
    description: 'Découvrez la faune et la flore uniques de Madagascar',
    location: 'Andasibe',
    duration: '2 jours',
    price: 199,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1661155702216-d3e9f012d6f7',
    category: 'nature',
    active: true,
    featured: true,
    created_at: null
  },
  {
    id: '2',
    title: 'Avenue des Baobabs',
    description: 'Admirez les célèbres baobabs au coucher du soleil',
    location: 'Morondava',
    duration: '1 jour',
    price: 99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1547471080-3cc20479a792',
    category: 'nature',
    active: true,
    featured: true,
    created_at: null
  },
  {
    id: '3',
    title: 'Nosy Be',
    description: 'Profitez des plages paradisiaques de l\'île aux parfums',
    location: 'Nosy Be',
    duration: '5 jours',
    price: 499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5',
    category: 'plage',
    active: true,
    featured: true,
    created_at: null
  },
  {
    id: '4',
    title: 'Parc National de l\'Isalo',
    description: 'Randonnée à travers des canyons spectaculaires',
    location: 'Isalo',
    duration: '3 jours',
    price: 299,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1551907234-fb773fb08a2a',
    category: 'aventure',
    active: true,
    featured: true,
    created_at: null
  }
];

export const useFeaturedTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tourAPI.getFeatured();
        setTours(data);
      } catch (err: any) {
        console.error('Erreur lors du chargement des circuits en vedette:', err);
        
        // Set fallback data when API fails
        setTours(fallbackTours);
        
        // Set error message for UI display
        if (err?.message?.includes("infinite recursion")) {
          setError("Problème de configuration de la base de données. Utilisation des données de secours.");
        } else {
          setError("Impossible de charger les circuits en vedette");
        }
        
        toast({
          title: "Erreur",
          description: "Impossible de charger les circuits en vedette. Affichage des données de secours.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTours();
  }, [toast]);

  return { tours, loading, error };
};
