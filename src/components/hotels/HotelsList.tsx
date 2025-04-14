
import React from 'react';
import HotelCard from './HotelCard';
import { Hotel } from '@/lib/db/schema';
import { Skeleton } from '@/components/ui/skeleton';

interface HotelsListProps {
  hotels: Hotel[];
  isLoading?: boolean;
}

const HotelsList: React.FC<HotelsListProps> = ({ hotels, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-lg font-medium mb-2">Aucun hôtel trouvé</p>
        <p className="text-muted-foreground">Veuillez ajuster vos critères de recherche.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelsList;
