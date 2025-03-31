
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ProgressiveImage } from '@/components/ui/progressive-image';

interface TourImageProps {
  image: string;
  images?: string[];
  title: string;
  featured: boolean;
}

const TourImage: React.FC<TourImageProps> = ({ image, images = [], title, featured }) => {
  // Combine main image with additional images
  const allImages = image ? [image, ...images] : images;

  return (
    <div className="relative mb-6">
      {allImages.length > 1 ? (
        <Carousel className="w-full">
          <CarouselContent>
            {allImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative rounded-lg overflow-hidden h-80">
                  <ProgressiveImage 
                    src={img} 
                    alt={`${title} - Image ${index + 1}`} 
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                    width={1200}
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 lg:left-4" />
          <CarouselNext className="right-2 lg:right-4" />
        </Carousel>
      ) : (
        <div className="relative rounded-lg overflow-hidden h-80">
          <ProgressiveImage 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
            width={1200}
            priority={true}
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
