
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Photo } from '@/lib/store';
import { usePhotos } from '@/hooks/usePhotos';
import { PlusCircle, Filter, ArrowDownUp } from 'lucide-react';
import PhotoCard from '@/components/admin/photos/PhotoCard';
import PhotoEditForm from '@/components/admin/photos/PhotoEditForm';
import PhotosGrid from '@/components/admin/photos/PhotosGrid';

const PhotosAdmin = () => {
  const { photos, loading, refreshPhotos, addPhoto, updatePhoto, deletePhoto } = usePhotos();
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Photo['category'] | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'title'>('newest');

  // Filtrer les photos par catégorie si nécessaire
  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

  // Trier les photos selon le critère sélectionné
  const sortedPhotos = [...filteredPhotos].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const handleEditPhoto = (photo: Photo) => {
    setEditingPhoto(photo);
    setIsAddingPhoto(false);
  };

  const handleAddPhoto = () => {
    setIsAddingPhoto(true);
    setEditingPhoto(null);
  };

  const handleSavePhoto = async (photo: Omit<Photo, 'id' | 'createdAt'>) => {
    await addPhoto(photo);
    setIsAddingPhoto(false);
    refreshPhotos();
  };

  const handleUpdatePhoto = async (id: string, updates: Partial<Omit<Photo, 'id' | 'createdAt'>>) => {
    await updatePhoto(id, updates);
    setEditingPhoto(null);
    refreshPhotos();
  };

  const handleDeletePhoto = async (id: string) => {
    await deletePhoto(id);
    refreshPhotos();
  };

  const handleCategoryChange = (category: Photo['category'] | 'all') => {
    setActiveCategory(category);
  };

  const handleSortChange = (order: 'newest' | 'oldest' | 'title') => {
    setSortOrder(order);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Photos</h1>
          <p className="text-muted-foreground">Gérer les photos et bannières du site</p>
        </div>
        <Button onClick={handleAddPhoto} className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une photo
        </Button>
      </div>

      <Tabs defaultValue="gallery" className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
          <TabsList>
            <TabsTrigger value="gallery">Galerie</TabsTrigger>
            <TabsTrigger value="form">
              {isAddingPhoto ? 'Nouvelle photo' : editingPhoto ? 'Modifier la photo' : 'Détails'}
            </TabsTrigger>
          </TabsList>

          <div className="flex space-x-2">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <select 
                className="bg-background border border-input rounded-md p-2 text-sm"
                value={activeCategory}
                onChange={(e) => handleCategoryChange(e.target.value as any)}
              >
                <option value="all">Toutes les catégories</option>
                <option value="banner">Bannières</option>
                <option value="gallery">Galerie</option>
                <option value="tour">Circuits</option>
                <option value="vehicle">Véhicules</option>
                <option value="hotel">Hôtels</option>
                <option value="catamaran">Catamarans</option>
              </select>
            </div>

            <div className="flex items-center">
              <ArrowDownUp className="mr-2 h-4 w-4" />
              <select 
                className="bg-background border border-input rounded-md p-2 text-sm"
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value as any)}
              >
                <option value="newest">Plus récentes</option>
                <option value="oldest">Plus anciennes</option>
                <option value="title">Titre (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <TabsContent value="gallery" className="space-y-4">
          {loading ? (
            <Card>
              <CardContent className="pt-6">
                <p>Chargement des photos...</p>
              </CardContent>
            </Card>
          ) : (
            <PhotosGrid 
              photos={sortedPhotos} 
              onEdit={handleEditPhoto}
              onDelete={handleDeletePhoto}
            />
          )}
        </TabsContent>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>
                {isAddingPhoto ? 'Ajouter une nouvelle photo' : editingPhoto ? 'Modifier la photo' : 'Sélectionnez une photo'}
              </CardTitle>
              <CardDescription>
                {isAddingPhoto ? 'Remplissez le formulaire pour ajouter une nouvelle photo' : 
                 editingPhoto ? 'Modifiez les détails de la photo' : 'Cliquez sur une photo dans la galerie pour la modifier'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAddingPhoto ? (
                <PhotoEditForm 
                  onSave={handleSavePhoto}
                  onCancel={() => setIsAddingPhoto(false)}
                />
              ) : editingPhoto ? (
                <PhotoEditForm 
                  photo={editingPhoto}
                  onSave={(updates) => handleUpdatePhoto(editingPhoto.id, updates)}
                  onCancel={() => setEditingPhoto(null)}
                />
              ) : (
                <div className="text-center py-6">
                  <p>Sélectionnez une photo dans la galerie pour afficher ou modifier ses détails</p>
                  <Button 
                    variant="secondary" 
                    onClick={handleAddPhoto} 
                    className="mt-4"
                  >
                    Ajouter une nouvelle photo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PhotosAdmin;
