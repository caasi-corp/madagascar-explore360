import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, ImagePlus } from 'lucide-react';
import { usePhotos } from '@/hooks/usePhotos';
import PhotosFilter from '@/components/admin/photos/PhotosFilter';
import PhotosGrid from '@/components/admin/photos/PhotosGrid';
import PhotoEditForm from '@/components/admin/photos/PhotoEditForm';
import type { Photo } from '@/lib/db/schema';

const PhotosAdmin = () => {
  const { photos, isLoading, refresh, addPhoto, updatePhoto, togglePhotoActive, deletePhoto } = usePhotos();
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Dialogs
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | undefined>(undefined);
  
  useEffect(() => {
    // Apply filters
    let result = [...photos];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(photo => 
        photo.title.toLowerCase().includes(query) || 
        (photo.description && photo.description.toLowerCase().includes(query))
      );
    }
    
    if (categoryFilter !== 'all') {
      result = result.filter(photo => photo.category === categoryFilter);
    }
    
    if (statusFilter === 'active') {
      result = result.filter(photo => photo.isActive);
    } else if (statusFilter === 'inactive') {
      result = result.filter(photo => !photo.isActive);
    }
    
    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setFilteredPhotos(result);
  }, [photos, searchQuery, categoryFilter, statusFilter]);
  
  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };
  
  const handleAddPhoto = () => {
    setSelectedPhoto(undefined);
    setIsPhotoDialogOpen(true);
  };
  
  const handleEditPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsPhotoDialogOpen(true);
  };
  
  const handleViewPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsViewDialogOpen(true);
  };
  
  const handleSavePhoto = async (photoData: Partial<Photo> | Omit<Photo, 'id' | 'createdAt'>) => {
    if (selectedPhoto) {
      await updatePhoto(selectedPhoto.id, photoData);
    } else {
      await addPhoto(photoData as Omit<Photo, 'id' | 'createdAt'>);
    }
    
    setIsPhotoDialogOpen(false);
  };
  
  // Fix the type issues by wrapping the callback functions
  const handleToggleActive = async (id: string): Promise<void> => {
    await togglePhotoActive(id);
  };
  
  const handleDelete = async (id: string): Promise<void> => {
    await deletePhoto(id);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Photos</h1>
        <Button className="bg-northgascar-teal hover:bg-northgascar-teal/80" onClick={handleAddPhoto}>
          <ImagePlus className="mr-2 h-4 w-4" />
          Ajouter une photo
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <PhotosFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            onReset={resetFilters}
          />
        </CardContent>
      </Card>
      
      <PhotosGrid
        photos={filteredPhotos}
        isLoading={isLoading}
        onToggleActive={handleToggleActive}
        onEdit={handleEditPhoto}
        onDelete={handleDelete}
        onView={handleViewPhoto}
      />
      
      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogTitle>
            {selectedPhoto ? 'Modifier la photo' : 'Ajouter une nouvelle photo'}
          </DialogTitle>
          <PhotoEditForm
            photo={selectedPhoto}
            onSave={handleSavePhoto}
            onCancel={() => setIsPhotoDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[850px]">
          <DialogTitle>{selectedPhoto?.title}</DialogTitle>
          {selectedPhoto && (
            <div className="space-y-4">
              <div className="bg-muted/20 rounded-md p-2">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title} 
                  className="w-full h-auto max-h-[70vh] object-contain rounded-md"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Catégorie</p>
                  <p>{selectedPhoto.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Statut</p>
                  <p>{selectedPhoto.isActive ? 'Active' : 'Inactive'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-muted-foreground">{selectedPhoto.description || 'Aucune description'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">URL</p>
                  <p className="text-xs text-muted-foreground break-all">{selectedPhoto.url}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Fermer</Button>
                <Button onClick={() => {
                  setIsViewDialogOpen(false);
                  handleEditPhoto(selectedPhoto);
                }}>Modifier</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotosAdmin;
