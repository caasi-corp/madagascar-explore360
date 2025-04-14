
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tour } from '@/lib/db/schema';

interface TourDetailHeroProps {
  tour: Tour;
}

const TourDetailHero: React.FC<TourDetailHeroProps> = ({ tour }) => {
  return (
    <div 
      className="relative h-[50vh] md:h-[60vh] bg-cover bg-center" 
      style={{ backgroundImage: `url(${tour.image})` }}
    >
      <div className="absolute inset-0 bg-black/40 flex items-end">
        <div className="container mx-auto px-4 py-8">
          <Button variant="outline" className="bg-white/10 backdrop-blur-sm mb-4" asChild>
            <Link to="/tours">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux circuits
            </Link>
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{tour.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-white">
            <div className="flex items-center">
              <MapPin size={18} className="mr-1" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-1" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center text-madagascar-yellow">
              <Star size={18} className="mr-1 fill-madagascar-yellow" />
              <span>{tour.rating.toFixed(1)}</span>
            </div>
            {tour.category && (
              <Badge className="bg-madagascar-yellow/80 text-madagascar-blue">{tour.category}</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailHero;
