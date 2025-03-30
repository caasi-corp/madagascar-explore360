
import React, { useState, useEffect } from 'react';
import { transitionEffects, getTransitionClasses } from './HeroTransitionEffects';
import { useHeroDroneEffect } from './HeroDroneEffect';

interface HeroCarouselProps {
  images: string[];
  backgroundImage?: string;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images, backgroundImage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(-1);
  const [currentEffect, setCurrentEffect] = useState("fade");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const dronePosition = useHeroDroneEffect();

  // Effet de transition d'image
  useEffect(() => {
    const interval = setInterval(() => {
      // Choisir un nouvel effet de transition aléatoire
      const newEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
      setCurrentEffect(newEffect);
      
      // Mettre à jour les indices d'image et déclencher la transition
      setPreviousImageIndex(currentImageIndex);
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1200); // Durée de transition reste la même pour permettre une transition complète
      
    }, 10000); // Changement d'image toutes les 10 secondes

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  const currentImage = backgroundImage || images[currentImageIndex];
  const previousImage = previousImageIndex >= 0 ? images[previousImageIndex] : currentImage;

  return (
    <>
      {/* Couche d'image précédente avec effet drone */}
      <div 
        className={`absolute inset-0 w-full h-full transition-all duration-1500 ${isTransitioning ? getTransitionClasses(currentEffect) : ''}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${previousImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${dronePosition.scale}) translate(${dronePosition.x}%, ${dronePosition.y}%)`,
          transition: 'transform 2s ease-out',
        }}
      />
      
      {/* Couche d'image actuelle avec effet drone */}
      <div 
        className={`absolute inset-0 w-full h-full ${isTransitioning ? 'opacity-100' : 'opacity-100'} transition-all duration-1500`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${currentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${dronePosition.scale}) translate(${dronePosition.x}%, ${dronePosition.y}%)`,
          transition: 'transform 2s ease-out',
          zIndex: isTransitioning ? 0 : 1,
        }}
      />
      
      <div className="absolute bottom-4 right-4 z-20">
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-northgascar-teal' : 'bg-white/50'
              } transition-all duration-300`}
              onClick={() => {
                setPreviousImageIndex(currentImageIndex);
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentImageIndex(index);
                  setIsTransitioning(false);
                }, 1200);
                setCurrentEffect(transitionEffects[Math.floor(Math.random() * transitionEffects.length)]);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroCarousel;
