
import React from 'react';

interface HeroCarouselControlsProps {
  images: string[];
  currentIndex: number;
  onChangeImage: (index: number) => void;
}

const HeroCarouselControls: React.FC<HeroCarouselControlsProps> = ({
  images,
  currentIndex,
  onChangeImage
}) => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex gap-3 glass-effect px-4 py-3 rounded-full">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full glass-shimmer transition-all duration-300 ${
              index === currentIndex ? 'bg-northgascar-teal scale-125' : 'bg-white/50'
            }`}
            onClick={() => onChangeImage(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarouselControls;
