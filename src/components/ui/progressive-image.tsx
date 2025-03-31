
import React, { useState, useEffect } from 'react';
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
  
  // Nettoyer l'URL et utiliser une URL directe sans optimisation qui peut échouer
  const cleanSrc = src ? src.split('?')[0] : '';
  
  // Gérer le chargement de l'image
  const handleImageLoaded = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Gérer les erreurs de chargement
  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setIsError(true);
  };
  
  useEffect(() => {
    // Réinitialiser les états lors du changement de source
    setIsLoaded(false);
    setIsError(false);
    
    // Précharger les images prioritaires
    if (priority && cleanSrc) {
      const img = new Image();
      img.src = cleanSrc;
      img.onload = handleImageLoaded;
      img.onerror = handleError;
    }
    
    return () => {
      // Pas besoin de nettoyage pour les objets Image
    };
  }, [cleanSrc, priority]);
  
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
      {/* Image de préchargement/flou */}
      {!isLoaded && !isError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {/* Image principale */}
      {!isError ? (
        <img
          src={cleanSrc}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleImageLoaded}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
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
