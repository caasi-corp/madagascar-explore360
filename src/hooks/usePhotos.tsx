
import { useState, useEffect } from 'react';
import { Photo, photoAPI } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

export const usePhotos = (category?: Photo['category']) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      let result: Photo[];
      
      if (category) {
        result = await photoAPI.getPhotosByCategory(category);
      } else {
        result = await photoAPI.getAllPhotos();
      }
      
      setPhotos(result);
      setError(null);
    } catch (err) {
      console.error('Error fetching photos:', err);
      setError('Impossible de charger les photos');
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les photos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addPhoto = async (photo: Omit<Photo, 'id' | 'createdAt'>) => {
    try {
      const newPhoto = await photoAPI.addPhoto(photo);
      setPhotos(prev => [...prev, newPhoto]);
      toast({
        title: 'Succès',
        description: 'Photo ajoutée avec succès',
      });
      return newPhoto;
    } catch (err) {
      console.error('Error adding photo:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter la photo',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updatePhoto = async (id: string, updates: Partial<Omit<Photo, 'id' | 'createdAt'>>) => {
    try {
      const updatedPhoto = await photoAPI.updatePhoto(id, updates);
      if (updatedPhoto) {
        setPhotos(prev => prev.map(p => p.id === id ? updatedPhoto : p));
        toast({
          title: 'Succès',
          description: 'Photo mise à jour avec succès',
        });
      }
      return updatedPhoto;
    } catch (err) {
      console.error('Error updating photo:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour la photo',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deletePhoto = async (id: string) => {
    try {
      await photoAPI.deletePhoto(id);
      setPhotos(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'Succès',
        description: 'Photo supprimée avec succès',
      });
      return true;
    } catch (err) {
      console.error('Error deleting photo:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer la photo',
        variant: 'destructive',
      });
      throw err;
    }
  };

  // Charger les photos au montage du composant
  useEffect(() => {
    fetchPhotos();
  }, [category]);

  return {
    photos,
    loading,
    error,
    refreshPhotos: fetchPhotos,
    addPhoto,
    updatePhoto,
    deletePhoto
  };
};
