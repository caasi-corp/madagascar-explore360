
import { useState, useEffect } from 'react';
import { TourProps } from '@/components/TourCard';
import { tourSupabaseAPI } from '@/lib/api/supabase/tourAPI';
import { toast } from 'sonner';

// Données de secours en cas d'erreur
const fallbackTours: TourProps[] = [
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
];

export function useFeaturedTours(): TourProps[] {
  const [tours, setTours] = useState<TourProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        console.log("Tentative de récupération des circuits mis en avant...");
        const data = await tourSupabaseAPI.getFeatured();
        
        if (data && data.length > 0) {
          console.log('Circuits mis en avant chargés avec succès:', data.length);
          setTours(data);
        } else {
          console.log('Aucun circuit mis en avant trouvé, utilisation des données de secours');
          // Si aucun circuit n'est retourné, utiliser les données de secours
          setTours(fallbackTours);
          toast.info("Information", {
            description: "Les données de démonstration sont affichées car aucun circuit n'a été trouvé"
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des circuits mis en avant:', error);
        // En cas d'erreur, utiliser les données de secours
        setTours(fallbackTours);
        toast.error("Erreur", {
          description: "Impossible de charger les circuits mis en avant. Données de démonstration affichées."
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTours();
  }, []);
  
  return tours;
}
