
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VehicleProps } from '@/components/VehicleCard';

interface VehicleListProps {
  vehicles: VehicleProps[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Aucun véhicule ne correspond à votre recherche. Veuillez essayer d'autres critères.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="glass-card overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={vehicle.image} 
              alt={vehicle.name} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">{vehicle.name}</h3>
              <span className="text-lg font-bold text-madagascar-green">{vehicle.pricePerDay}€<span className="text-sm font-normal">/jour</span></span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <MapPin size={16} className="mr-1" />
              <span>Antananarivo</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs flex items-center">
                <Settings size={12} className="mr-1" />
                {vehicle.transmission === 'Automatic' ? 'Automatique' : 'Manuelle'}
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs">
                {vehicle.fuelType}
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs">
                {vehicle.seats} places
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs">
                {vehicle.type === 'car' ? 'Voiture' : 
                 vehicle.type === '4x4' ? '4x4' : 
                 vehicle.type === 'motorcycle' ? 'Moto' : 'Quad'}
              </div>
            </div>
            
            <Button className="w-full glass-button bg-madagascar-green text-white">
              Réserver
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VehicleList;
