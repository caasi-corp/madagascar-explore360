
import React, { useState } from 'react';
import { getTransitionClasses } from './HeroTransitionEffects';
import { ProgressiveImage } from '../ui/progressive-image';

interface HeroImageLayerProps {
  image: string;
  isTransitioning: boolean;
  currentEffect: string;
  dronePosition: {
    x: number;
    y: number;
    scale: number;
  };
  isVisible: boolean;
  isPrevious?: boolean;
}

const HeroImageLayer: React.FC<HeroImageLayerProps> = ({
  image,
  isTransitioning,
  currentEffect,
  dronePosition,
  isVisible,
  isPrevious = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Clean image URL by removing query parameters
  const cleanImageUrl = image ? image.split('?')[0] : '';
  
  // Determine z-index based on image state
  const zIndex = isPrevious ? 0 : (isTransitioning ? 0 : 1);
  
  // Determine if blur effect should be applied
  const shouldBlur = 
    (isPrevious && isTransitioning && (currentEffect === 'blur-fade' || currentEffect === 'blur-zoom')) ||
    (!isPrevious && !isTransitioning && (currentEffect === 'blur-fade' || currentEffect === 'blur-zoom'));
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-all duration-1500 ${
        isTransitioning ? getTransitionClasses(currentEffect) : ''} ${
        isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        overflow: 'hidden',
        transform: `scale(${dronePosition.scale}) translate(${dronePosition.x}%, ${dronePosition.y}%)`,
        transition: `transform 2s ease-out, filter 1.5s ease-out, opacity 0.5s ease-in`,
        filter: shouldBlur ? 'blur(8px)' : 'blur(0px)',
        zIndex,
      }}
    >
      {/* Gradient overlay for enhanced contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10"></div>
      
      {/* Optimized progressive image component */}
      <ProgressiveImage 
        src={cleanImageUrl} 
        alt="Paysage Madagascar"
        className="w-full h-full object-cover"
        containerClassName="w-full h-full"
        priority={!isPrevious} // Prioritize loading current image
        sizes="100vw"
        onLoad={() => setImageLoaded(true)}
        fallbackSrc="/placeholder.svg"
      />
    </div>
  );
};

export default HeroImageLayer;
