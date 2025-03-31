import React, { useState } from 'react';
import { optimizeImageUrl, getImageThumbnail } from '@/lib/imageOptimizer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star } from 'lucide-react';

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
  
  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all ${className}`}>
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
        
        {tour.featured && (
          <Badge className="absolute top-2 right-2 bg-madagascar-yellow/90 hover:bg-madagascar-yellow text-black font-medium">
            Populaire
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <CardTitle>{tour.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <CardDescription>
          {tour.description}
        </CardDescription>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          {tour.location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          {tour.duration}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center">
          <Star className="mr-1 h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium">{tour.rating}</span>
        </div>
        <div>
          <span className="text-xl font-bold">€{tour.price}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
