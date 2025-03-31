
/**
 * Hook pour précharger les images critiques afin d'améliorer l'expérience utilisateur
 */
import { useState, useEffect } from 'react';
import { optimizeImageUrl } from '@/lib/imageOptimizer';

export interface PreloaderProps {
  imageUrls: string[];
  imageSizes?: number[];
  onProgress?: (progress: number) => void;
}

export const useImagePreloader = ({
  imageUrls,
  imageSizes = [600],
  onProgress
}: PreloaderProps): { 
  imagesPreloaded: boolean;
  progress: number;
} => {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    
    const updateProgress = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / (imageUrls.length * imageSizes.length)) * 100);
      
      if (isMounted) {
        setProgress(currentProgress);
        if (onProgress) onProgress(currentProgress);
        
        if (loadedCount === imageUrls.length * imageSizes.length) {
          setImagesPreloaded(true);
        }
      }
    };
    
    const preloadImages = async () => {
      const preloadPromises = imageUrls.flatMap((url) => {
        return imageSizes.map((size) => {
          return new Promise((resolve, reject) => {
            const optimizedUrl = optimizeImageUrl(url, size);
            const img = new Image();
            img.onload = () => {
              updateProgress();
              resolve(true);
            };
            img.onerror = () => {
              updateProgress();
              reject(new Error(`Failed to load image: ${optimizedUrl}`));
            };
            img.src = optimizedUrl;
          });
        });
      });

      try {
        await Promise.allSettled(preloadPromises);
        if (isMounted && loadedCount === imageUrls.length * imageSizes.length) {
          setImagesPreloaded(true);
        }
      } catch (error) {
        console.error('Error during image preloading:', error);
        if (isMounted) {
          // Considérer comme préchargé même en cas d'erreur pour ne pas bloquer l'UI
          setImagesPreloaded(true);
        }
      }
    };

    if (imageUrls.length > 0) {
      preloadImages();
    } else {
      setImagesPreloaded(true);
      setProgress(100);
    }
    
    return () => {
      isMounted = false;
    };
  }, [imageUrls, imageSizes, onProgress]);

  return { imagesPreloaded, progress };
};
