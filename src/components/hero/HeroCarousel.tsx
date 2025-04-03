
import React from 'react';
import { HeroCarouselProps } from './HeroCarouselProps';
import HeroBackgroundLayer from './carousel/HeroBackgroundLayer';
import HeroCarouselControls from './carousel/HeroCarouselControls';
import { useImageTransition } from './useImageTransition';

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images, backgroundImage }) => {
  const { 
    currentImageIndex, 
    previousImageIndex, 
    currentEffect, 
    isTransitioning,
    changeImage 
  } = useImageTransition({ images });
  
  const currentImage = backgroundImage || images[currentImageIndex];
  const previousImage = previousImageIndex >= 0 ? images[previousImageIndex] : currentImage;

  return (
    <>
      {/* Previous image layer */}
      <HeroBackgroundLayer 
        image={previousImage}
        isActive={false}
        effect={currentEffect}
        isTransitioning={isTransitioning}
      />
      
      {/* Current image layer */}
      <HeroBackgroundLayer 
        image={currentImage}
        isActive={true}
        effect={currentEffect}
        isTransitioning={isTransitioning}
        zIndex={isTransitioning ? 0 : 1}
      />
      
      <HeroCarouselControls 
        images={images}
        currentIndex={currentImageIndex}
        onChangeImage={changeImage}
      />
    </>
  );
};

export default HeroCarousel;
