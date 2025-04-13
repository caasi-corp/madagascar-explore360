
import { useState, useEffect } from 'react';
import { Vehicle } from '@/lib/db/schema';
import { vehicleAPI } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      try {
        setLoading(true);
        const data = await vehicleAPI.getFeatured();
        setVehicles(data);
      } catch (error) {
        console.error('Erreur lors du chargement des véhicules en vedette:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les véhicules en vedette",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedVehicles();
  }, [toast]);

  return vehicles;
};
