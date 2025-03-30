
import { useEffect, useState } from 'react';

// Types d'animations disponibles
export type AnimationType = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'zoom-in' 
  | 'zoom-out'
  | 'slide-up'
  | 'slide-down';

// Classes CSS correspondant à chaque type d'animation
export const animationClasses: Record<AnimationType, string> = {
  'fade-up': 'animate-fade-in translate-y-4',
  'fade-down': 'animate-fade-in -translate-y-4',
  'fade-left': 'animate-fade-in translate-x-4',
  'fade-right': 'animate-fade-in -translate-x-4',
  'zoom-in': 'animate-fade-in scale-95',
  'zoom-out': 'animate-fade-in scale-105',
  'slide-up': 'animate-slide-in translate-y-8',
  'slide-down': 'animate-slide-in -translate-y-8',
};

// Fonction pour sélectionner une animation aléatoire
export const getRandomAnimation = (): AnimationType => {
  const animations = Object.keys(animationClasses) as AnimationType[];
  const randomIndex = Math.floor(Math.random() * animations.length);
  return animations[randomIndex];
};

// Hook pour appliquer une animation aléatoire
export const useRandomAnimation = (elementsCount: number = 1): string[] => {
  const [animations, setAnimations] = useState<string[]>([]);

  useEffect(() => {
    const newAnimations = Array.from({ length: elementsCount }, () => {
      const animationType = getRandomAnimation();
      return animationClasses[animationType];
    });
    setAnimations(newAnimations);
  }, [elementsCount]);

  return animations;
};

// Hook pour appliquer des animations séquentielles avec délai croissant
export const useSequentialAnimation = (
  elementsCount: number = 1, 
  baseDelay: number = 100
): { className: string; style: React.CSSProperties }[] => {
  const [animationItems, setAnimationItems] = useState<{ className: string; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const newAnimationItems = Array.from({ length: elementsCount }, (_, index) => {
      const animationType = getRandomAnimation();
      return {
        className: animationClasses[animationType],
        style: { animationDelay: `${baseDelay * index}ms` }
      };
    });
    setAnimationItems(newAnimationItems);
  }, [elementsCount, baseDelay]);

  return animationItems;
};
