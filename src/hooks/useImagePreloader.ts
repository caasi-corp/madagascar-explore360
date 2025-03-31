
/**
 * Hook pour précharger les images critiques afin d'améliorer l'expérience utilisateur
 */
import { useState, useEffect } from 'react';
import { optimizeImageUrl } from '@/lib/imageOptimizer';

export interface PreloaderProps {
  imageUrls: string[];
  imageSizes?: number[];
  onProgress?: (progress: number) => void;
  priority?: boolean;
}

export const useImagePreloader = ({
  imageUrls,
  imageSizes = [600],
  onProgress,
  priority = false
}: PreloaderProps): { 
  imagesPreloaded: boolean;
  progress: number;
} => {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const totalImages = imageUrls.length * imageSizes.length;
    
    const updateProgress = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalImages) * 100);
      
      if (isMounted) {
        setProgress(currentProgress);
        if (onProgress) onProgress(currentProgress);
        
        if (loadedCount === totalImages) {
          setImagesPreloaded(true);
        }
      }
    };
    
    const preloadImages = async () => {
      // For priority loading, load the smallest size of each image first
      if (priority && imageSizes.length > 1 && imageUrls.length > 0) {
        const smallestSize = Math.min(...imageSizes);
        const priorityPromises = imageUrls.map(url => {
          return new Promise((resolve, reject) => {
            if (!url) {
              updateProgress();
              resolve(true);
              return;
            }
            const optimizedUrl = optimizeImageUrl(url, smallestSize);
            const img = new Image();
            img.onload = () => {
              updateProgress();
              resolve(true);
            };
            img.onerror = () => {
              updateProgress();
              console.warn(`Failed to load image: ${optimizedUrl}`);
              resolve(false); // Resolving instead of rejecting to not block other images
            };
            img.src = optimizedUrl;
          });
        });
        
        try {
          await Promise.all(priorityPromises);
        } catch (error) {
          console.warn('Error during priority image preloading:', error);
        }
      }
      
      // Load all sizes of all images
      const preloadPromises = imageUrls.flatMap((url) => {
        return imageSizes.map((size) => {
          // Skip if we already loaded this size as priority
          if (priority && size === Math.min(...imageSizes)) return Promise.resolve(true);
          
          return new Promise((resolve, reject) => {
            if (!url) {
              updateProgress();
              resolve(true);
              return;
            }
            const optimizedUrl = optimizeImageUrl(url, size);
            const img = new Image();
            img.onload = () => {
              updateProgress();
              resolve(true);
            };
            img.onerror = () => {
              updateProgress();
              console.warn(`Failed to load image: ${optimizedUrl}`);
              resolve(false); // Resolving instead of rejecting to not block other images
            };
            img.src = optimizedUrl;
          });
        });
      });

      try {
        await Promise.allSettled(preloadPromises);
        if (isMounted && loadedCount === totalImages) {
          setImagesPreloaded(true);
        }
      } catch (error) {
        console.error('Error during image preloading:', error);
        if (isMounted) {
          // Consider as preloaded even in case of error to not block the UI
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
  }, [imageUrls, imageSizes, onProgress, priority]);

  return { imagesPreloaded, progress };
};
