
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
    <div className="absolute bottom-4 right-4 z-20">
      <div className="flex gap-2 glass-effect p-2 rounded-full">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full glass-shimmer ${
              index === currentIndex ? 'bg-northgascar-teal' : 'bg-white/50'
            } transition-all duration-300`}
            onClick={() => onChangeImage(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarouselControls;
