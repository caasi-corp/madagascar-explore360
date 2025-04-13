
import { useState, useEffect } from 'react';
import { Tour } from '@/lib/db/schema';
import { tourAPI } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';

export const useFeaturedTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        setLoading(true);
        const data = await tourAPI.getFeatured();
        setTours(data);
      } catch (error) {
        console.error('Erreur lors du chargement des circuits en vedette:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les circuits en vedette",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTours();
  }, [toast]);

  return tours;
};
