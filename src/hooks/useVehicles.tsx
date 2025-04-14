
import { useState, useEffect } from 'react';
import { Vehicle } from '@/lib/db/schema';
import { vehicleAPI } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';

// Define the adapter interface to match VehicleProps expected by VehicleCard
export interface VehicleProps {
  id: string;
  name: string;
  type: 'car' | '4x4' | 'motorcycle' | 'quad';
  pricePerDay: number;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: string;
  image: string;
  features: string[];
  availability: boolean;
}

// Convert Vehicle from DB to VehicleProps for component use
export const adaptVehicleToProps = (vehicle: Vehicle): VehicleProps => {
  return {
    id: vehicle.id,
    name: vehicle.name,
    type: vehicle.type as 'car' | '4x4' | 'motorcycle' | 'quad',
    pricePerDay: vehicle.priceperday,
    seats: vehicle.seats,
    transmission: vehicle.transmission as 'Automatic' | 'Manual',
    fuelType: vehicle.fueltype,
    image: vehicle.image,
    features: vehicle.features,
    availability: vehicle.availability ?? true
  };
};

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      try {
        setLoading(true);
        const data = await vehicleAPI.getFeatured();
        // Use adapter to convert Vehicle[] to VehicleProps[]
        setVehicles(data.map(adaptVehicleToProps));
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
