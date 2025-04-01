
// Collection of transition effects for the hero carousel
export const transitionEffects = [
  "fade",        // fondu simple
];

// Get CSS classes for different transition effects
export const getTransitionClasses = (effect: string) => {
  // Utilisez toujours l'effet de fondu simple pour les transitions
  return "opacity-0 transition-opacity duration-1200";
};
