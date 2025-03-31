
import React from 'react';
import { MapPin, Clock, Star, Users, Tag } from 'lucide-react';

interface TourMetadataProps {
  location: string;
  duration: string;
  rating: number;
  groupSize?: string;
  category?: string;
}

const TourMetadata: React.FC<TourMetadataProps> = ({ 
  location, 
  duration, 
  rating, 
  groupSize, 
  category 
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex items-center text-sm">
        <MapPin className="mr-2 h-5 w-5 text-madagascar-green" />
        {location}
      </div>
      <div className="flex items-center text-sm">
        <Clock className="mr-2 h-5 w-5 text-madagascar-green" />
        {duration}
      </div>
      <div className="flex items-center text-sm">
        <Star className="mr-2 h-5 w-5 text-yellow-500" />
        {rating}/5
      </div>
      {groupSize && (
        <div className="flex items-center text-sm">
          <Users className="mr-2 h-5 w-5 text-madagascar-green" />
          {groupSize}
        </div>
      )}
      {category && (
        <div className="flex items-center text-sm">
          <Tag className="mr-2 h-5 w-5 text-madagascar-green" />
          {category}
        </div>
      )}
    </div>
  );
};

export default TourMetadata;
