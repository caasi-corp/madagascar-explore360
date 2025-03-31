
import { useState, useEffect } from 'react';

export type EntryAnimationType = 
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'slide-in'
  | 'bounce';

const animations: Record<EntryAnimationType, string> = {
  'fade-up': 'opacity-0 translate-y-4 animate-fade-in',
  'fade-down': 'opacity-0 -translate-y-4 animate-fade-in',
  'fade-left': 'opacity-0 translate-x-4 animate-fade-in',
  'fade-right': 'opacity-0 -translate-x-4 animate-fade-in',
  'zoom-in': 'opacity-0 scale-95 animate-scale-in',
  'zoom-out': 'opacity-0 scale-105 animate-scale-in',
  'slide-in': 'opacity-0 -translate-x-8 animate-slide-in',
  'bounce': 'opacity-0 animate-bounce'
};

export const useRandomEntryAnimation = (
  trigger: boolean = true,
  delay: number = 0
): { className: string; style: React.CSSProperties } => {
  const [animation, setAnimation] = useState<EntryAnimationType>('fade-up');
  const [isVisible, setIsVisible] = useState(!trigger);

  // Sélectionne une animation aléatoire au montage
  useEffect(() => {
    const animationTypes = Object.keys(animations) as EntryAnimationType[];
    const randomAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)];
    setAnimation(randomAnimation);
  }, []);

  // Déclenche l'animation après le délai spécifié
  useEffect(() => {
    if (!trigger) return;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [trigger, delay]);

  return {
    className: isVisible ? animations[animation] : 'opacity-0',
    style: { 
      transitionDuration: '500ms',
      transitionProperty: 'opacity, transform',
      animationFillMode: 'forwards',
      animationDuration: '500ms',
      animationDelay: `${delay}ms`
    }
  };
};
