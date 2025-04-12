
import React, { KeyboardEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface GallerySectionProps {
  gallery: string[];
  onAddImage: (url: string) => void;
  onRemoveImage: (index: number) => void;
  onBrowseFiles: () => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  gallery,
  onAddImage,
  onRemoveImage,
  onBrowseFiles
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.currentTarget as HTMLInputElement;
      onAddImage(input.value);
      input.value = "";
    }
  };

  const handleAddButtonClick = () => {
    const input = document.getElementById("galleryImage") as HTMLInputElement;
    if (input) {
      onAddImage(input.value);
      input.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Galerie d'images</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {gallery.map((image, index) => (
            <div key={index} className="relative">
              <img 
                src={image} 
                alt={`Galerie ${index + 1}`} 
                className="w-full h-24 object-cover rounded-md"
              />
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-1 right-1 bg-white/80 hover:bg-white text-destructive h-6 w-6"
                onClick={() => onRemoveImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="galleryImage">Ajouter une image</Label>
          <div className="flex gap-2">
            <Input 
              id="galleryImage" 
              placeholder="URL de l'image"
              onKeyDown={handleKeyDown}
            />
            <Button 
              variant="outline"
              onClick={handleAddButtonClick}
            >
              Ajouter
            </Button>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={onBrowseFiles}>
          Parcourir les fichiers
        </Button>
      </CardContent>
    </Card>
  );
};

export default GallerySection;
