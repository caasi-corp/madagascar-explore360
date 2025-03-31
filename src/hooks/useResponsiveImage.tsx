
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';
import { optimizeImageUrl } from '@/lib/imageOptimizer';

export interface ResponsiveImageProps {
  src: string;
  alt?: string;
  sizes?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  quality?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
  priority?: boolean;
}

export const useResponsiveImage = ({
  src,
  sizes = { mobile: 400, tablet: 800, desktop: 1200 },
  quality = { mobile: 70, tablet: 80, desktop: 85 }
}: Pick<ResponsiveImageProps, 'src' | 'sizes' | 'quality'>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  // Determine appropriate image size based on viewport
  const imageWidth = isMobile 
    ? sizes.mobile 
    : window.innerWidth < 1024 
      ? sizes.tablet 
      : sizes.desktop;
      
  const imageQuality = isMobile 
    ? quality.mobile 
    : window.innerWidth < 1024 
      ? quality.tablet 
      : quality.desktop;

  // Generate optimized URL
  const optimizedSrc = src ? optimizeImageUrl(src, imageWidth, imageQuality) : '';

  // Reset loading state when source changes
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return {
    optimizedSrc,
    isLoaded,
    setIsLoaded,
    isMobile,
    imageWidth,
    imageQuality
  };
};
