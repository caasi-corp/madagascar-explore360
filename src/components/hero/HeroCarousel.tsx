
import React, { useEffect, useState } from 'react';
import { useHeroDroneEffect } from './HeroDroneEffect';
import { useImageTransition } from './useImageTransition';
import { HeroCarouselProps } from './HeroCarouselProps';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import HeroLoadingSkeleton from './HeroLoadingSkeleton';
import HeroImageLayer from './HeroImageLayer';
import CarouselNavigation from './CarouselNavigation';
import { useBreakpoint } from '@/hooks/use-mobile';

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images, backgroundImage }) => {
  const { 
    currentImageIndex, 
    previousImageIndex, 
    currentEffect, 
    isTransitioning,
    changeImage 
  } = useImageTransition({ images });
  
  const dronePosition = useHeroDroneEffect();
  const { isMobile, isTablet } = useBreakpoint();
  
  // Optimize image sizes based on device
  const imageSizes = isMobile 
    ? [600, 800] 
    : isTablet 
      ? [800, 1200] 
      : [1200, 1600, 2000];
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const { imagesPreloaded, progress } = useImagePreloader({
    imageUrls: backgroundImage ? [backgroundImage] : images,
    imageSizes: imageSizes,
    onProgress: setLoadingProgress,
    priority: true
  });
  
  const [isVisible, setIsVisible] = useState(false);

  const currentImage = backgroundImage || images[currentImageIndex];
  const previousImage = previousImageIndex >= 0 ? images[previousImageIndex] : currentImage;

  // Animation d'entrée pour un meilleur ressenti
  useEffect(() => {
    if (imagesPreloaded) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [imagesPreloaded]);
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {!imagesPreloaded && <HeroLoadingSkeleton progress={progress} />}
      
      {imagesPreloaded && (
        <>
          {/* Previous image layer */}
          <HeroImageLayer
            image={previousImage}
            isTransitioning={isTransitioning}
            currentEffect={currentEffect}
            dronePosition={dronePosition}
            isVisible={isVisible}
            isPrevious={true}
          />
          
          {/* Current image layer */}
          <HeroImageLayer
            image={currentImage}
            isTransitioning={isTransitioning}
            currentEffect={currentEffect}
            dronePosition={dronePosition}
            isVisible={isVisible}
          />
          
          {/* Navigation dots */}
          {images.length > 1 && (
            <CarouselNavigation
              images={images}
              currentImageIndex={currentImageIndex}
              onChangeImage={changeImage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HeroCarousel;
