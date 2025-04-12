
import React from 'react';
import { Photo } from '@/lib/store';
import PhotoCard from './PhotoCard';

interface PhotosGridProps {
  photos: Photo[];
  onEdit: (photo: Photo) => void;
  onDelete: (id: string) => void;
  onToggleActive?: (id: string, active: boolean) => void;
}

const PhotosGrid: React.FC<PhotosGridProps> = ({ 
  photos, 
  onEdit, 
  onDelete,
  onToggleActive 
}) => {
  if (photos.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Aucune photo trouvée</h3>
        <p className="text-muted-foreground">Ajoutez des photos pour commencer à construire votre galerie</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <PhotoCard 
          key={photo.id} 
          photo={photo} 
          onEdit={onEdit} 
          onDelete={onDelete}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
};

export default PhotosGrid;
