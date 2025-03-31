
import React, { useState, useEffect } from 'react';
import { getImageThumbnail, optimizeImageUrl } from '@/lib/imageOptimizer';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  onLoad?: () => void;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  width = 800,
  height,
  className = "",
  containerClassName = "",
  priority = false,
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const thumbnailSrc = getImageThumbnail(src);
  const optimizedSrc = optimizeImageUrl(src, width);
  
  const loadingPriority = priority ? "high" : "auto";
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
  }, [src]);
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-muted/30", 
        containerClassName
      )}
      style={{ height: height || 'auto' }}
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
          alt={alt}
          width={width}
          height={height}
          onLoad={handleImageLoaded}
          onError={handleError}
          loading={loadingType}
          decoding="async"
          fetchPriority={loadingPriority as "high" | "low" | "auto"}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            !isLoaded ? "opacity-0" : "opacity-100",
            className
          )}
          {...props}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Image non disponible</span>
        </div>
      )}
    </div>
  );
};
