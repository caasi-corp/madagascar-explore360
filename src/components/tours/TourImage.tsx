
import React from 'react';

interface TourImageProps {
  image: string;
  title: string;
  featured: boolean;
}

const TourImage: React.FC<TourImageProps> = ({ image, title, featured }) => {
  return (
    <div className="relative rounded-lg overflow-hidden h-80 mb-6">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
      {featured && (
        <div className="absolute top-4 right-4 bg-yellow-500 text-black font-semibold px-3 py-1 rounded-full">
          Populaire
        </div>
      )}
    </div>
  );
};

export default TourImage;
