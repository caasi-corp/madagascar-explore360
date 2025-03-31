
import React from 'react';
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
  // Nettoyage de l'URL de l'image
  const cleanImageUrl = image ? image.split('?')[0] : '';
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-all duration-1500 ${
        isTransitioning ? getTransitionClasses(currentEffect) : ''} ${
        isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        overflow: 'hidden',
        transform: `scale(${dronePosition.scale}) translate(${dronePosition.x}%, ${dronePosition.y}%)`,
        transition: `transform 2s ease-out, filter 1.5s ease-out, opacity 0.5s ease-in`,
        filter: isPrevious 
          ? (isTransitioning && (currentEffect === 'blur-fade' || currentEffect === 'blur-zoom') ? 'blur(8px)' : 'blur(0px)') 
          : (!isTransitioning && (currentEffect === 'blur-fade' || currentEffect === 'blur-zoom') ? 'blur(0px)' : ''),
        zIndex: isPrevious ? 0 : (isTransitioning ? 0 : 1),
      }}
    >
      {/* Une couche d'overlay pour l'effet glacé */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10"></div>
      
      {/* Image progressive optimisée */}
      <ProgressiveImage 
        src={cleanImageUrl} 
        alt="Paysage Madagascar"
        className="w-full h-full object-cover"
        containerClassName="w-full h-full"
        priority={true}
        sizes="100vw"
      />
    </div>
  );
};

export default HeroImageLayer;
