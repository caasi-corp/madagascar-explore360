
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Settings, Users, Fuel, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@/lib/db/schema';
import { toast } from 'sonner';

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  console.log('VehicleList - vehicles:', vehicles);
  
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Aucun véhicule ne correspond à votre recherche. Veuillez essayer d'autres critères.
        </p>
      </div>
    );
  }
  
  const handleBooking = (vehicle: Vehicle) => {
    toast.success(`Réservation initiée pour ${vehicle.name}`, {
      description: "Vous serez redirigé vers le formulaire de réservation"
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={vehicle.image ? `${vehicle.image.split('?')[0]}` : '/placeholder.svg'} 
              alt={vehicle.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold">{vehicle.name}</h3>
              <span className="text-lg font-bold text-madagascar-green">
                {vehicle.pricePerDay}€<span className="text-sm font-normal">/jour</span>
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <MapPin size={16} className="mr-1" />
              <span>Antananarivo</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs flex items-center">
                <Settings size={12} className="mr-1" />
                {vehicle.transmission === 'Automatic' ? 'Automatique' : 'Manuelle'}
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs flex items-center">
                <Fuel size={12} className="mr-1" />
                {vehicle.fuelType}
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs flex items-center">
                <Users size={12} className="mr-1" />
                {vehicle.seats} places
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs flex items-center">
                <Car size={12} className="mr-1" />
                {vehicle.type === 'car' ? 'Voiture' : 
                 vehicle.type === '4x4' ? '4x4' : 
                 vehicle.type === 'motorcycle' ? 'Moto' : 'Quad'}
              </div>
            </div>
            
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Caractéristiques:</h4>
                <div className="flex flex-wrap gap-1">
                  {vehicle.features.slice(0, 4).map((feature, index) => (
                    <span key={index} className="text-xs text-gray-600 dark:text-gray-400">
                      {index > 0 ? ' • ' : ''}{feature}
                    </span>
                  ))}
                  {vehicle.features.length > 4 && (
                    <span className="text-xs text-blue-500">+{vehicle.features.length - 4}</span>
                  )}
                </div>
              </div>
            )}
            
            <Button 
              className="w-full bg-madagascar-green text-white"
              onClick={() => handleBooking(vehicle)}
            >
              Réserver
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VehicleList;
