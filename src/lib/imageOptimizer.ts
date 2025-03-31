
/**
 * Utilitaire pour l'optimisation des images
 */
export const optimizeImageUrl = (url: string, width = 800): string => {
  // Pour les images Unsplash, on peut ajouter des paramètres pour optimiser le chargement
  if (url.includes('unsplash.com')) {
    // Ajout des paramètres d'optimisation pour Unsplash
    // w=largeur, q=qualité, auto=format pour choisir le meilleur format (webp si supporté)
    return `${url}?w=${width}&q=80&auto=format&fit=crop`;
  }
  
  // Pour les autres sources d'images, retourner l'URL originale
  return url;
};

/**
 * Crée une URL de preview miniature pour un chargement progressif
 */
export const getImageThumbnail = (url: string): string => {
  if (url.includes('unsplash.com')) {
    // Version très petite et floue pour chargement rapide
    return `${url}?w=20&blur=10&q=30`;
  }
  return url;
};

/**
 * Pour les images qui ne sont pas sur Unsplash, utiliser un placeholder
 */
export const getPlaceholder = (): string => {
  return '/placeholder.svg';
};

/**
 * Formate les attributs image pour les composants
 */
export const getImageProps = (url: string, alt: string = '', width = 800) => {
  return {
    src: optimizeImageUrl(url, width),
    alt,
    loading: "lazy" as const,
    decoding: "async" as const,
    // On ajoute une classe pour le chargement progressif
    className: "image-progressive-loading",
  };
};
