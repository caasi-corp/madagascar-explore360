
import React from 'react';

interface CarouselNavigationProps {
  images: string[];
  currentImageIndex: number;
  onChangeImage: (index: number) => void;
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({ 
  images, 
  currentImageIndex, 
  onChangeImage 
}) => {
  return (
    <div className="absolute bottom-4 right-4 z-20">
      <div className="flex gap-2 glass-effect p-2 rounded-full">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full glass-shimmer ${
              index === currentImageIndex ? 'bg-northgascar-teal' : 'bg-white/50'
            } transition-all duration-300`}
            onClick={() => onChangeImage(index)}
            aria-label={`Image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselNavigation;
