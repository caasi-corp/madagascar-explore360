import React from 'react';
import { Check, Car, Users, Fuel, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { VehicleProps } from '@/hooks/useVehicles';

interface VehicleCardProps {
  vehicle: VehicleProps;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const getVehicleTypeIcon = (type: string) => {
    switch (type) {
      case 'car':
        return <Car size={18} />;
      case '4x4':
        return <Car size={18} />;
      case 'motorcycle':
        return <Car size={18} />;
      case 'quad':
        return <Car size={18} />;
      default:
        return <Car size={18} />;
    }
  };

  const getTranslatedTransmission = (transmission: 'Automatic' | 'Manual'): string => {
    return transmission === 'Automatic' ? 'Automatique' : 'Manuelle';
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-card border border-border">
      <div className="relative h-48">
        <img 
          src={vehicle.image} 
          alt={vehicle.name}
          className="w-full h-full object-cover"
        />
        <Badge 
          className={`absolute top-3 right-3 ${
            vehicle.availability 
              ? 'bg-green-500' 
              : 'bg-red-500'
          }`}
        >
          {vehicle.availability ? 'Disponible' : 'Non disponible'}
        </Badge>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl">{vehicle.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              {getVehicleTypeIcon(vehicle.type)}
              <span className="capitalize ml-1">{vehicle.type}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-madagascar-green">{vehicle.pricePerDay}€</div>
            <div className="text-sm text-muted-foreground">par jour</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 my-4">
          <div className="flex items-center text-sm">
            <Users size={16} className="mr-1 text-madagascar-green" />
            <span>{vehicle.seats} places</span>
          </div>
          <div className="flex items-center text-sm">
            <Fuel size={16} className="mr-1 text-madagascar-green" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center text-sm col-span-2">
            <Info size={16} className="mr-1 text-madagascar-green" />
            <span>{getTranslatedTransmission(vehicle.transmission)}</span>
          </div>
        </div>

        <div className="mt-3 mb-4">
          <h4 className="font-medium text-sm mb-2">Caractéristiques:</h4>
          <div className="grid grid-cols-2 gap-y-1 gap-x-2">
            {vehicle.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center text-xs">
                <Check size={14} className="mr-1 text-madagascar-green" />
                <span>{feature}</span>
              </div>
            ))}
            {vehicle.features.length > 4 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="link" size="sm" className="text-xs p-0 h-auto text-madagascar-blue dark:text-madagascar-yellow">
                      +{vehicle.features.length - 4} plus
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <ul className="list-disc pl-4">
                      {vehicle.features.slice(4).map((feature, index) => (
                        <li key={index} className="text-xs">{feature}</li>
                      ))}
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <Button 
          className="w-full bg-madagascar-green hover:bg-madagascar-green/80 text-white"
          disabled={!vehicle.availability}
        >
          {vehicle.availability ? 'Réserver maintenant' : 'Non disponible'}
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;
