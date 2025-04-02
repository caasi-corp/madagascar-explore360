
import React from 'react';
import { getTransitionClasses } from './HeroTransitionEffects';
import { useHeroDroneEffect } from './HeroDroneEffect';
import { useImageTransition } from './useImageTransition';
import { HeroCarouselProps } from './HeroCarouselProps';

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images, backgroundImage }) => {
  const { 
    currentImageIndex, 
    previousImageIndex, 
    currentEffect, 
    isTransitioning,
    changeImage 
  } = useImageTransition({ images });
  
  const dronePosition = useHeroDroneEffect();

  const currentImage = backgroundImage || images[currentImageIndex];
  const previousImage = previousImageIndex >= 0 ? images[previousImageIndex] : currentImage;

  return (
    <>
      {/* Couche d'image précédente avec effet drone */}
      <div 
        className={`absolute inset-0 w-full h-full transition-all duration-1000 ${isTransitioning ? getTransitionClasses(currentEffect) : ''}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${previousImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${dronePosition.scale}) translate(${dronePosition.x}%, ${dronePosition.y}%)`,
          transition: `transform 1.5s ease-out, filter 1s ease-out`, // Accéléré de 2s à 1.5s pour transform
          filter: isTransitioning && (currentEffect === 'blur-fade' || currentEffect === 'blur-zoom') ? 'blur(8px)' : 'blur(0px)',
        }}
      />
      
      {/* Couche d'image actuelle avec effet drone */}
      <div 
        className={`absolute inset-0 w-full h-full ${isTransitioning ? 'opacity-100' : 'opacity-100'} transition-all duration-1000`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${currentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${dronePosition.scale}) translate(${dronePosition.x}%, ${dronePosition.y}%)`,
          transition: 'transform 1.5s ease-out, filter 1s ease-out', // Accéléré aussi
          zIndex: isTransitioning ? 0 : 1,
          filter: !isTransitioning && (currentEffect === 'blur-fade' || currentEffect === 'blur-zoom') ? 'blur(0px)' : '',
        }}
      />
      
      <div className="absolute bottom-4 right-4 z-20">
        <div className="flex gap-2 glass-effect p-2 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full glass-shimmer ${
                index === currentImageIndex ? 'bg-northgascar-teal' : 'bg-white/50'
              } transition-all duration-300`}
              onClick={() => changeImage(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroCarousel;
