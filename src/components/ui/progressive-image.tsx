
import React, { useState, useEffect } from 'react';
import { getImageThumbnail, optimizeImageUrl, generateSrcSet } from '@/lib/imageOptimizer';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from '@/hooks/use-mobile';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  fallbackSrc?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  width = 800,
  height,
  className = "",
  containerClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  onLoad,
  fallbackSrc = '/placeholder.svg',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const isMobile = useIsMobile();
  
  // Nettoyage de l'URL source avant optimisation
  const cleanSrc = src ? src.split('?')[0] : '';
  const thumbnailSrc = getImageThumbnail(cleanSrc);
  const optimizedSrc = optimizeImageUrl(cleanSrc, isMobile ? Math.min(width, 600) : width);
  const srcSet = generateSrcSet(cleanSrc);
  
  const loadingType = priority ? "eager" : "lazy";
  
  // Handle image load complete
  const handleImageLoaded = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Handle image load error
  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setIsError(true);
  };
  
  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setIsError(false);
    
    // Preload high-priority images
    if (priority && cleanSrc) {
      const img = new Image();
      img.src = optimizedSrc;
      img.onload = handleImageLoaded;
      img.onerror = handleError;
    }
    
    // Cleanup function
    return () => {
      // No cleanup needed for Image objects, they get garbage collected
    };
  }, [cleanSrc, optimizedSrc, priority]);
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-muted/30", 
        containerClassName
      )}
      style={{ 
        height: height || 'auto',
        aspectRatio: width && height ? `${width} / ${height}` : undefined 
      }}
    >
      {/* Thumbnail/blur image */}
      {!isLoaded && !isError && (
        <img
          src={thumbnailSrc}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover blur-sm transition-opacity duration-300",
            className
          )}
          aria-hidden="true"
          width={width}
          height={height}
        />
      )}
      
      {/* Loading skeleton */}
      {!isLoaded && !isError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {/* Actual image */}
      {!isError ? (
        <img
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleImageLoaded}
          onError={handleError}
          loading={loadingType}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            !isLoaded ? "opacity-0" : "opacity-100",
            className
          )}
          {...props}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
          <img 
            src={fallbackSrc} 
            alt={alt || "Image non disponible"}
            className="max-w-full max-h-full object-contain"
            width={width}
            height={height}
          />
        </div>
      )}
    </div>
  );
};
