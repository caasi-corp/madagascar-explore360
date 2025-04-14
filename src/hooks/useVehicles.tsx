
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

// Hard-coded fallback vehicles data
const fallbackVehicles: VehicleProps[] = [
  {
    id: 'v1',
    name: 'Toyota Land Cruiser',
    type: '4x4',
    pricePerDay: 89,
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
    features: ['Climatisation', 'GPS', 'Porte-bagages', '4x4', 'Bluetooth', 'Ports USB'],
    availability: true,
  },
  {
    id: 'v2',
    name: 'Yamaha TW200',
    type: 'motorcycle',
    pricePerDay: 45,
    seats: 2,
    transmission: 'Manual',
    fuelType: 'Essence',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    features: ['Casque inclus', 'Sacoches', 'Capacité tout-terrain', 'Économe en carburant'],
    availability: true,
  },
  {
    id: 'v3',
    name: 'BRP Can-Am Outlander',
    type: 'quad',
    pricePerDay: 65,
    seats: 1,
    transmission: 'Automatic',
    fuelType: 'Essence',
    image: 'https://images.unsplash.com/photo-1566845735839-6e25c92269a1',
    features: ['Casque inclus', 'Coffre de rangement', '4x4', 'Garde au sol élevée'],
    availability: true,
  },
  {
    id: 'v4',
    name: 'Toyota Corolla',
    type: 'car',
    pricePerDay: 55,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Essence',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588',
    features: ['Climatisation', 'Bluetooth', 'Économe en carburant', 'Ports USB'],
    availability: true,
  },
];

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
        // Set fallback data when API fails
        setVehicles(fallbackVehicles);
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
