
import React from 'react';
import { Calendar, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface VehicleProps {
  id: string;
  name: string;
  type: string;
  description?: string;
  seats: number;
  transmission: string;
  price: number;
  image: string;
  fuelType?: string;
  pricePerDay?: number; // Added to match usage in the code
  features?: string[];
  availability?: boolean;
}

interface VehicleCardProps {
  vehicle: VehicleProps;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  // Use pricePerDay if it exists, otherwise use price
  const displayPrice = vehicle.pricePerDay || vehicle.price;
  
  return (
    <Card className="hover-scale overflow-hidden">
      <div className="relative overflow-hidden h-48">
        <img 
          src={vehicle.image} 
          alt={vehicle.name} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        <Badge className="absolute top-3 right-3 bg-white/80 text-madagascar-blue font-medium">
          {displayPrice}€/jour
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{vehicle.name}</h3>
          <Badge variant="outline" className="capitalize">
            {vehicle.type}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {vehicle.description || ""}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-sm">
            <Car size={16} className="mr-1 text-madagascar-blue" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar size={16} className="mr-1 text-madagascar-blue" />
            <span>{vehicle.seats} places</span>
          </div>
        </div>
        
        <Button 
          className="w-full bg-white border border-madagascar-blue text-madagascar-blue hover:bg-madagascar-blue hover:text-white"
        >
          Réserver
        </Button>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
