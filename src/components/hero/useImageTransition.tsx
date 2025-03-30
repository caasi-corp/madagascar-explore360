
import { useState, useEffect } from 'react';
import { transitionEffects } from './HeroTransitionEffects';
import { UseImageTransitionProps, ImageTransitionState, ImageTransitionResult } from './ImageTransitionTypes';

export const useImageTransition = ({ 
  images, 
  transitionInterval = 10000 
}: UseImageTransitionProps): ImageTransitionResult => {
  const [transitionState, setTransitionState] = useState<ImageTransitionState>({
    currentImageIndex: 0,
    previousImageIndex: -1,
    currentEffect: "fade",
    isTransitioning: false
  });

  // Effet de transition d'image automatique
  useEffect(() => {
    const interval = setInterval(() => {
      // Choisir un nouvel effet de transition aléatoire
      const newEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
      
      // Mettre à jour les indices d'image et déclencher la transition
      setTransitionState(prevState => ({
        ...prevState,
        previousImageIndex: prevState.currentImageIndex,
        currentEffect: newEffect,
        isTransitioning: true
      }));
      
      setTimeout(() => {
        setTransitionState(prevState => ({
          ...prevState,
          currentImageIndex: (prevState.currentImageIndex + 1) % images.length,
          isTransitioning: false
        }));
      }, 1200); // Durée de transition reste la même pour permettre une transition complète
      
    }, transitionInterval);

    return () => clearInterval(interval);
  }, [images.length, transitionInterval]);

  // Fonction pour changer manuellement l'image
  const changeImage = (newIndex: number) => {
    if (newIndex === transitionState.currentImageIndex) return;
    
    // Choisir un nouvel effet de transition aléatoire
    const newEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
    
    setTransitionState(prevState => ({
      ...prevState,
      previousImageIndex: prevState.currentImageIndex,
      currentEffect: newEffect,
      isTransitioning: true
    }));
    
    setTimeout(() => {
      setTransitionState(prevState => ({
        ...prevState,
        currentImageIndex: newIndex,
        isTransitioning: false
      }));
    }, 1200);
  };

  return {
    ...transitionState,
    changeImage
  };
};
