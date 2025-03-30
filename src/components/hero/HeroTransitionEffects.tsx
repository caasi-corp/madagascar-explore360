
// Collection of transition effects for the hero carousel
export const transitionEffects = [
  "fade",        // fondu simple
  "zoom",        // zoom avant
  "slide-left",  // glissement de gauche à droite
  "slide-right", // glissement de droite à gauche
  "slide-up",    // glissement de bas en haut
  "zoom-fade"    // combinaison de zoom et fondu
];

// Get CSS classes for different transition effects
export const getTransitionClasses = (effect: string) => {
  switch (effect) {
    case "zoom":
      return "transform-origin-center transition-transform duration-1800 scale-110";
    case "slide-left":
      return "translate-x-full transition-transform duration-1200";
    case "slide-right":
      return "-translate-x-full transition-transform duration-1200";
    case "slide-up":
      return "translate-y-full transition-transform duration-1200";
    case "zoom-fade":
      return "scale-110 opacity-0 transition-all duration-1800";
    case "fade":
    default:
      return "opacity-0 transition-opacity duration-1200";
  }
};
