
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ProgressiveImage } from '@/components/ui/progressive-image';
import { useIsMobile } from '@/hooks/use-mobile';

interface TourImageProps {
  image: string;
  images?: string[];
  title: string;
  featured: boolean;
}

const TourImage: React.FC<TourImageProps> = ({ image, images = [], title, featured }) => {
  const isMobile = useIsMobile();
  
  // Nettoyer les URLs des images
  const cleanMainImage = image ? image.split('?')[0] : '';
  const cleanAdditionalImages = images.map(img => img ? img.split('?')[0] : '');
  
  // Combine main image with additional images
  const allImages = cleanMainImage ? [cleanMainImage, ...cleanAdditionalImages] : cleanAdditionalImages;
  
  // Responsive image settings
  const imageHeight = isMobile ? "h-64" : "h-80";
  const imageWidth = isMobile ? 600 : 1200;

  return (
    <div className="relative mb-6">
      {allImages.length > 1 ? (
        <Carousel className="w-full">
          <CarouselContent>
            {allImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className={`relative rounded-lg overflow-hidden ${imageHeight}`}>
                  <ProgressiveImage 
                    src={img} 
                    alt={`${title} - Image ${index + 1}`} 
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                    width={imageWidth}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 lg:left-4" />
          <CarouselNext className="right-2 lg:right-4" />
        </Carousel>
      ) : (
        <div className={`relative rounded-lg overflow-hidden ${imageHeight}`}>
          <ProgressiveImage 
            src={cleanMainImage} 
            alt={title} 
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
            width={imageWidth}
            priority={true}
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}
      
      {featured && (
        <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-black font-semibold px-3 py-1 rounded-full">
          Populaire
        </div>
      )}
    </div>
  );
};

export default TourImage;
