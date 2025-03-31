
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ProgressBar from '@/components/ui/progress-bar';

interface HeroLoadingSkeletonProps {
  progress?: number;
}

const HeroLoadingSkeleton: React.FC<HeroLoadingSkeletonProps> = ({ progress = 0 }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-gray-800">
      <Skeleton className="w-full h-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-white/80 mb-3 text-sm sm:text-base">
          Chargement des images...
        </div>
        <div className="w-48 sm:w-64">
          <ProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default HeroLoadingSkeleton;
