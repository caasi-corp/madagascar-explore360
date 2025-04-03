
import React from 'react';
import { getTransitionClasses } from '../HeroTransitionEffects';
import { useHeroDroneEffect } from '../HeroDroneEffect';

interface HeroBackgroundLayerProps {
  image: string;
  isActive: boolean;
  effect: string;
  isTransitioning: boolean;
  zIndex?: number;
}

const HeroBackgroundLayer: React.FC<HeroBackgroundLayerProps> = ({
  image,
  isActive,
  effect,
  isTransitioning,
  zIndex
}) => {
  const dronePosition = useHeroDroneEffect();
  
  const shouldApplyBlur = 
    (isActive && !isTransitioning && (effect === 'blur-fade' || effect === 'blur-zoom')) ||
    (!isActive && isTransitioning && (effect === 'blur-fade' || effect === 'blur-zoom'));
  
  const transitionClasses = !isActive && isTransitioning ? getTransitionClasses(effect) : '';

  return (
    <div 
      className={`absolute inset-0 w-full h-full transition-all duration-1000 ${transitionClasses}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `scale(${dronePosition.scale}) translate(${dronePosition.x}%, ${dronePosition.y}%)`,
        transition: 'transform 1.5s ease-out, filter 1s ease-out',
        filter: shouldApplyBlur ? 'blur(8px)' : 'blur(0px)',
        zIndex: zIndex,
      }}
    />
  );
};

export default HeroBackgroundLayer;
