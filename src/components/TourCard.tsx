
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Users, Calendar, Tag } from 'lucide-react';
import { ProgressiveImage } from '@/components/ui/progressive-image';

export interface TourProps {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  featured: boolean;
  category?: string;
  startDate?: string;
  groupSize?: number;
  difficulty?: 'Facile' | 'Modéré' | 'Difficile';
  language?: string[];
}

interface TourCardProps {
  tour: TourProps;
  className?: string;
  animationIndex?: number;
}

const TourCard: React.FC<TourCardProps> = ({ tour, className, animationIndex = 0 }) => {
  // Priority loading for first few tours
  const isPriority = animationIndex < 2;
  
  // Fonction pour déterminer la couleur du badge de difficulté
  const getDifficultyColor = () => {
    switch (tour.difficulty) {
      case 'Facile': return 'bg-green-500 hover:bg-green-600';
      case 'Modéré': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Difficile': return 'bg-red-500 hover:bg-red-600';
      default: return '';
    }
  };

  // Formater le prix avec séparateur de milliers
  const formattedPrice = new Intl.NumberFormat('fr-FR').format(tour.price);
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="relative h-36 sm:h-48 overflow-hidden bg-gray-200">
        <ProgressiveImage 
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
          containerClassName="w-full h-full"
          priority={isPriority}
          width={isPriority ? 800 : 400}
        />
        
        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {tour.featured && (
            <Badge className="bg-madagascar-yellow/90 hover:bg-madagascar-yellow text-black font-medium">
              Populaire
            </Badge>
          )}
          {tour.category && (
            <Badge className="bg-madagascar-green/80 hover:bg-madagascar-green text-white">
              {tour.category}
            </Badge>
          )}
          {tour.difficulty && (
            <Badge className={`${getDifficultyColor()} text-white`}>
              {tour.difficulty}
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="pb-1 pt-3 px-3 sm:pb-2 sm:px-4 sm:pt-4">
        <CardTitle className="text-base sm:text-lg md:text-xl line-clamp-2">{tour.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 sm:gap-3 pt-0 px-3 sm:px-4">
        <CardDescription className="line-clamp-2 text-xs sm:text-sm">
          {tour.description}
        </CardDescription>
        
        <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-1">
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">{tour.location}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <Clock className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span>{tour.duration}</span>
          </div>
          
          {tour.groupSize && (
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
              <Users className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>Max {tour.groupSize} pers.</span>
            </div>
          )}
          
          {tour.startDate && (
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="truncate">Départ: {tour.startDate}</span>
            </div>
          )}
        </div>
        
        {tour.language && tour.language.length > 0 && (
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            {tour.language.map((lang, index) => (
              <Badge key={index} variant="outline" className="bg-muted/50 text-xs px-1 py-0 h-5">
                {lang}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-1 pb-3 px-3 sm:pt-2 sm:pb-4 sm:px-4">
        <div className="flex items-center">
          <Star className="mr-1 h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-yellow-500" />
          <span className="text-xs sm:text-sm font-medium">{tour.rating}</span>
        </div>
        <div>
          <span className="text-base sm:text-lg font-bold">€{formattedPrice}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
