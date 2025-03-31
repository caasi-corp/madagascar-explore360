
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const TourLoadingState: React.FC = () => {
  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
      </div>
    </div>
  );
};

export default TourLoadingState;
