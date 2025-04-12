
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface ImageSectionProps {
  title: string;
  image: string;
  onImageChange: (value: string) => void;
  onImageRemove: () => void;
  onBrowseFiles: () => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  title,
  image,
  onImageChange,
  onImageRemove,
  onBrowseFiles
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {image && (
          <div className="relative mb-4">
            <img 
              src={image} 
              alt="Preview" 
              className="w-full h-40 object-cover rounded-md"
            />
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-destructive"
              onClick={onImageRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="mainImage">URL de l'image</Label>
          <Input 
            id="mainImage" 
            placeholder="URL de l'image" 
            value={image}
            onChange={(e) => onImageChange(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full" onClick={onBrowseFiles}>
          Parcourir les fichiers
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImageSection;
