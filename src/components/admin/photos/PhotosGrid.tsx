
import React from 'react';
import PhotoCard from './PhotoCard';
import { Photo } from '@/lib/api/photoAPI';
import { Skeleton } from '@/components/ui/skeleton';

interface PhotosGridProps {
  photos: Photo[];
  isLoading: boolean;
  onToggleActive: (id: string) => Promise<void>;
  onEdit: (photo: Photo) => void;
  onDelete: (id: string) => Promise<void>;
  onView: (photo: Photo) => void;
}

const PhotosGrid: React.FC<PhotosGridProps> = ({
  photos,
  isLoading,
  onToggleActive,
  onEdit,
  onDelete,
  onView
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-video" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune photo trouvée</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onToggleActive={onToggleActive}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default PhotosGrid;
