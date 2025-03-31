
import React from 'react';
import { getTransitionClasses } from './HeroTransitionEffects';

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
  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-all duration-1500 ${
        isTransitioning ? getTransitionClasses(currentEffect) : ''} ${
        isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `scale(${dronePosition.scale}) translate(${dronePosition.x}%, ${dronePosition.y}%)`,
        transition: `transform 2s ease-out, filter 1.5s ease-out, opacity 0.5s ease-in`,
        filter: isPrevious 
          ? (isTransitioning && (currentEffect === 'blur-fade' || currentEffect === 'blur-zoom') ? 'blur(8px)' : 'blur(0px)') 
          : (!isTransitioning && (currentEffect === 'blur-fade' || currentEffect === 'blur-zoom') ? 'blur(0px)' : ''),
        zIndex: isPrevious ? 0 : (isTransitioning ? 0 : 1),
      }}
    />
  );
};

export default HeroImageLayer;
