
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Check } from 'lucide-react';
import { Hotel } from '@/lib/db/schema';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  // Fonction pour afficher les étoiles
  const renderStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ));
  };

  // Fonction pour limiter le nombre de caractères dans la description
  const truncateFeatures = (features: string[], limit: number) => {
    if (features.length <= limit) return features;
    return [...features.slice(0, limit), `+${features.length - limit} autres`];
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white text-black font-semibold">
            {hotel.pricePerNight}€ / nuit
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold">{hotel.name}</h3>
          <div className="flex">
            {renderStars(hotel.stars)}
          </div>
        </div>
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{hotel.location}</span>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Équipements</p>
          <div className="flex flex-wrap gap-1">
            {truncateFeatures(hotel.features, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature.includes('+') ? feature : (
                  <div className="flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    {feature}
                  </div>
                )}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link to={`/hotels/${hotel.id}`}>Voir les détails</Link>
        </Button>
        <Button asChild size="sm" className="bg-madagascar-green hover:bg-madagascar-green/80">
          <Link to={`/hotels/${hotel.id}/book`}>Réserver</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
