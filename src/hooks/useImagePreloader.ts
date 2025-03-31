
/**
 * Hook pour précharger les images et améliorer l'expérience utilisateur
 */
import { useState, useEffect } from 'react';

export const useImagePreloader = (imageUrls: string[]): { imagesPreloaded: boolean } => {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);
  
  useEffect(() => {
    let isMounted = true;
    
    const preloadImages = async () => {
      const promises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });
      });

      try {
        await Promise.all(promises);
        if (isMounted) {
          setImagesPreloaded(true);
        }
      } catch (error) {
        console.error('Erreur lors du préchargement des images:', error);
        if (isMounted) {
          // Considérer comme préchargé même en cas d'erreur pour ne pas bloquer l'UI
          setImagesPreloaded(true);
        }
      }
    };

    preloadImages();
    
    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return { imagesPreloaded };
};
