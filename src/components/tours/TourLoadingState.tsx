
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const TourLoadingState: React.FC = () => {
  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        
        {/* Image gallery skeleton */}
        <Carousel className="w-full mb-6">
          <CarouselContent>
            {[1, 2, 3].map((index) => (
              <CarouselItem key={index}>
                <Skeleton className="h-64 w-full rounded" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
      </div>
    </div>
  );
};

export default TourLoadingState;
