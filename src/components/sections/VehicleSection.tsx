
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VehicleCard from '@/components/VehicleCard';
import { Vehicle } from '@/lib/db/schema';
import { VehicleService } from '@/lib/api/vehicle-service';

interface VehicleSectionProps {
  vehicles?: Vehicle[];
}

const VehicleSection: React.FC<VehicleSectionProps> = ({ vehicles: propVehicles }) => {
  // Fetch featured vehicles if no vehicles are provided as props
  const { data: apiVehicles, isLoading, isError } = useQuery({
    queryKey: ['vehicles', 'featured'],
    queryFn: () => VehicleService.getFeaturedVehicles(3),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    // Only fetch if no vehicles are provided as props
    enabled: !propVehicles || propVehicles.length === 0,
  });
  
  // Utiliser les véhicules des props si disponibles, sinon utiliser ceux de l'API
  const vehicles = propVehicles && propVehicles.length > 0 ? propVehicles : apiVehicles || [];

  return (
    <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold mb-3">Location de Véhicules</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg">
              Explorez Madagascar à votre rythme avec notre sélection de véhicules adaptés à tous les terrains et aventures.
            </p>
          </div>
          <div className="w-full lg:w-auto">
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <a href="/services/car-rental">
                <span>Voir Tous Les Véhicules</span>
                <Car className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        {isLoading && (!propVehicles || propVehicles.length === 0) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Une erreur s'est produite lors du chargement des véhicules.
            </p>
          </div>
        ) : vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id || index} vehicle={vehicle} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Aucun véhicule disponible pour le moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehicleSection;
