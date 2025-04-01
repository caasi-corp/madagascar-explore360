
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { AnimatedBadge } from '@/components/ui/animated-badge';

export interface VehicleProps {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  seats: number;
  transmission: string;
  fuelType: string;
  image: string;
  features: string[];
  availability: boolean;
}

interface VehicleCardProps {
  vehicle: VehicleProps;
  index?: number;
  showCta?: boolean;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ 
  vehicle,
  index = 0,
  showCta = true
}) => {
  // Image par défaut si l'URL est vide ou invalide
  const defaultImage = '/placeholder.svg';
  
  // S'assurer que image est une chaîne de caractères et pas undefined ou null
  const imageString = typeof vehicle.image === 'string' ? vehicle.image : '';
  const imageUrl = imageString && imageString.trim() !== '' ? imageString : defaultImage;
  
  console.log("Vehicle image URL:", imageUrl);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image loading error, using placeholder");
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Empêcher les boucles infinies
    target.src = defaultImage;
  };

  return (
    <AnimatedContainer
      className="rounded-lg border overflow-hidden bg-card h-full flex flex-col"
      delay={index * 150}
      onlyWhenVisible={true}
    >
      <div className="relative h-48 w-full">
        <img 
          src={imageUrl} 
          alt={vehicle.name} 
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading={index < 3 ? "eager" : "lazy"}
        />
        
        <AnimatedBadge
          className={`absolute top-4 right-4 ${
            vehicle.availability 
              ? "bg-green-500" 
              : "bg-red-500"
          } text-white`}
          delay={(index * 150) + 200}
        >
          {vehicle.availability ? "Disponible" : "Indisponible"}
        </AnimatedBadge>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl">{vehicle.name}</h3>
          <AnimatedBadge variant="outline" delay={(index * 150) + 300}>
            {vehicle.type === 'car' ? 'Voiture' : 
             vehicle.type === '4x4' ? '4x4' : 
             vehicle.type === 'motorcycle' ? 'Moto' : 'Quad'}
          </AnimatedBadge>
        </div>
        
        <div className="text-lg font-bold text-madagascar-green mb-4">
          {vehicle.pricePerDay} € <span className="text-sm font-normal text-muted-foreground">/ jour</span>
        </div>
        
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Places:</span> 
            <span className="font-medium">{vehicle.seats}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Transmission:</span>
            <span className="font-medium">{vehicle.transmission === 'Automatic' ? 'Automatique' : 'Manuelle'}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <span className="text-muted-foreground">Carburant:</span>
            <span className="font-medium">{vehicle.fuelType}</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="text-sm font-medium mb-2">Caractéristiques:</p>
          <div className="flex flex-wrap gap-2">
            {vehicle.features && vehicle.features.slice(0, 4).map((feature, i) => (
              <AnimatedBadge 
                key={feature} 
                variant="secondary" 
                className="text-xs"
                delay={(index * 150) + 400 + (i * 100)}
              >
                {feature}
              </AnimatedBadge>
            ))}
            {vehicle.features && vehicle.features.length > 4 && (
              <AnimatedBadge 
                variant="secondary" 
                className="text-xs"
                delay={(index * 150) + 800}
              >
                +{vehicle.features.length - 4}
              </AnimatedBadge>
            )}
          </div>
        </div>
        
        {showCta && (
          <div className="mt-5">
            <Button 
              className="w-full bg-madagascar-green text-white"
              disabled={!vehicle.availability}
            >
              {vehicle.availability ? "Réserver Maintenant" : "Non Disponible"}
            </Button>
          </div>
        )}
      </div>
    </AnimatedContainer>
  );
};

export default VehicleCard;
