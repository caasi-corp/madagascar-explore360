
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRandomAnimation } from '@/lib/animation';

export interface TourProps {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  featured?: boolean;
  category?: string;
}

interface TourCardProps {
  tour: TourProps;
  animationIndex?: number;
}

const TourCard: React.FC<TourCardProps> = ({ tour, animationIndex = 0 }) => {
  // Utiliser une animation aléatoire avec un délai basé sur l'index
  const animationClass = `opacity-0 ${useRandomAnimation(1)[0]}`;
  const animationDelay = `${animationIndex * 150}ms`;
  
  return (
    <div 
      className={`group rounded-lg overflow-hidden shadow-md border border-border hover:shadow-xl transition-all duration-300 hover-scale bg-card ${animationClass}`}
      style={{ animationDelay, animationFillMode: 'forwards' }}
    >
      <div className="relative overflow-hidden h-48 md:h-64">
        <img 
          src={tour.image} 
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {tour.featured && (
          <Badge className="absolute top-3 left-3 bg-madagascar-yellow text-madagascar-blue animate-pulse">
            À la une
          </Badge>
        )}
        {tour.category && (
          <Badge variant="secondary" className="absolute top-3 right-3">
            {tour.category}
          </Badge>
        )}
      </div>
      
      <div className="p-4 md:p-5 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg md:text-xl line-clamp-2">{tour.title}</h3>
          <div className="flex items-center gap-1 text-madagascar-yellow">
            <Star size={16} className="fill-madagascar-yellow" />
            <span className="font-medium">{tour.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin size={16} className="mr-1" />
          <span>{tour.location}</span>
        </div>
        
        <p className="text-foreground/80 text-sm line-clamp-2">{tour.description}</p>
        
        <div className="flex justify-between items-center text-sm pt-2">
          <div className="flex items-center text-muted-foreground">
            <Clock size={16} className="mr-1" />
            <span>{tour.duration}</span>
          </div>
          <div className="font-bold text-lg text-madagascar-green">${tour.price}</div>
        </div>
        
        <Link to={`/tours/${tour.id}`}>
          <Button 
            className="w-full mt-2 bg-madagascar-green hover:bg-madagascar-green/80 text-white"
          >
            Voir Détails
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
