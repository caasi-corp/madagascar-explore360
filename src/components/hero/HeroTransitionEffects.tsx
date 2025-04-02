
// Collection of transition effects for the hero carousel
export const transitionEffects = [
  "fade",        // fondu simple
  "zoom",        // zoom avant
  "slide-left",  // glissement de gauche à droite
  "slide-right", // glissement de droite à gauche
  "slide-up",    // glissement de bas en haut
  "zoom-fade",   // combinaison de zoom et fondu
  "blur-fade",   // fondu avec flou
  "blur-zoom"    // zoom avec flou
];

// Get CSS classes for different transition effects
export const getTransitionClasses = (effect: string) => {
  switch (effect) {
    case "zoom":
      return "transform-origin-center transition-transform duration-1000 scale-110"; // Accéléré de 1800ms à 1000ms
    case "slide-left":
      return "translate-x-full transition-transform duration-800"; // Accéléré de 1200ms à 800ms
    case "slide-right":
      return "-translate-x-full transition-transform duration-800"; // Accéléré de 1200ms à 800ms
    case "slide-up":
      return "translate-y-full transition-transform duration-800"; // Accéléré de 1200ms à 800ms
    case "zoom-fade":
      return "scale-110 opacity-0 transition-all duration-1000"; // Accéléré de 1800ms à 1000ms
    case "blur-fade":
      return "opacity-0 blur-md transition-all duration-1000"; // Accéléré de 1500ms à 1000ms
    case "blur-zoom":
      return "scale-110 opacity-0 blur-md transition-all duration-1000"; // Accéléré de 1800ms à 1000ms
    case "fade":
    default:
      return "opacity-0 transition-opacity duration-800"; // Accéléré de 1200ms à 800ms
  }
};
