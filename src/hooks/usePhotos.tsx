
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { photoAPI, Photo } from '@/lib/api/photoAPI';

type PhotoCategory = 'hero' | 'catamaran' | 'destination' | 'cruise' | 'experience';

export const usePhotos = (category?: PhotoCategory) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let result: Photo[];
      if (category) {
        result = await photoAPI.getByCategory(category);
      } else {
        result = await photoAPI.getAll();
      }
      
      setPhotos(result);
    } catch (err) {
      console.error('Error fetching photos:', err);
      setError('Failed to load photos');
      toast({
        title: 'Error',
        description: 'Failed to load photos',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addPhoto = async (photo: Omit<Photo, 'id' | 'createdAt'>) => {
    try {
      const newPhoto = await photoAPI.add(photo);
      setPhotos(prev => [...prev, newPhoto]);
      toast({
        title: 'Success',
        description: 'Photo added successfully',
      });
      return newPhoto;
    } catch (err) {
      console.error('Error adding photo:', err);
      toast({
        title: 'Error',
        description: 'Failed to add photo',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updatePhoto = async (id: string, photoData: Partial<Photo>) => {
    try {
      const updatedPhoto = await photoAPI.update(id, photoData);
      if (updatedPhoto) {
        setPhotos(prev => 
          prev.map(p => p.id === id ? updatedPhoto : p)
        );
        toast({
          title: 'Success',
          description: 'Photo updated successfully',
        });
      }
      return updatedPhoto;
    } catch (err) {
      console.error('Error updating photo:', err);
      toast({
        title: 'Error',
        description: 'Failed to update photo',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const togglePhotoActive = async (id: string) => {
    try {
      const updatedPhoto = await photoAPI.toggleActive(id);
      if (updatedPhoto) {
        setPhotos(prev => 
          prev.map(p => p.id === id ? updatedPhoto : p)
        );
        toast({
          title: 'Success',
          description: `Photo ${updatedPhoto.isActive ? 'activated' : 'deactivated'} successfully`,
        });
      }
      return updatedPhoto;
    } catch (err) {
      console.error('Error toggling photo active state:', err);
      toast({
        title: 'Error',
        description: 'Failed to update photo status',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deletePhoto = async (id: string) => {
    try {
      await photoAPI.delete(id);
      setPhotos(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'Success',
        description: 'Photo deleted successfully',
      });
      return true;
    } catch (err) {
      console.error('Error deleting photo:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete photo',
        variant: 'destructive',
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [category]);

  return {
    photos,
    isLoading,
    error,
    refresh: fetchPhotos,
    addPhoto,
    updatePhoto,
    togglePhotoActive,
    deletePhoto
  };
};
