
import React, { useState } from 'react';
import { optimizeImageUrl, getImageThumbnail } from '@/lib/imageOptimizer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Users, Calendar, Tag } from 'lucide-react';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Optimiser les URL d'images
  const thumbnailUrl = getImageThumbnail(tour.image);
  const fullImageUrl = optimizeImageUrl(tour.image);
  
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
    <Card className={`overflow-hidden hover:shadow-lg transition-all hover:translate-y-[-5px] ${className}`}>
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {/* Image de préchargement (miniature floue) */}
        <img
          src={thumbnailUrl}
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        
        {/* Image principale */}
        <img
          src={fullImageUrl}
          alt={tour.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ position: 'absolute', top: 0, left: 0 }}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
          decoding="async"
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
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-xl line-clamp-2">{tour.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 pt-0">
        <CardDescription className="line-clamp-2">
          {tour.description}
        </CardDescription>
        
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
            <span className="truncate">{tour.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1.5 h-4 w-4 flex-shrink-0" />
            <span>{tour.duration}</span>
          </div>
          
          {tour.groupSize && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-1.5 h-4 w-4 flex-shrink-0" />
              <span>Max {tour.groupSize} pers.</span>
            </div>
          )}
          
          {tour.startDate && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
              <span className="truncate">Prochain départ: {tour.startDate}</span>
            </div>
          )}
        </div>
        
        {tour.language && tour.language.length > 0 && (
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            {tour.language.map((lang, index) => (
              <Badge key={index} variant="outline" className="bg-muted/50 text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center">
          <Star className="mr-1 h-5 w-5 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium">{tour.rating}</span>
        </div>
        <div>
          <span className="text-xl font-bold">€{formattedPrice}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
