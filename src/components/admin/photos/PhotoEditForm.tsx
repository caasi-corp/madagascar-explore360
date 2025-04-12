
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Photo } from '@/lib/api/photoAPI';

interface PhotoEditFormProps {
  photo?: Photo;
  onSave: (photoData: Partial<Photo> | Omit<Photo, 'id' | 'createdAt'>) => Promise<void>;
  onCancel: () => void;
}

const categoryOptions = [
  { value: 'hero', label: 'Héro (Bannières)' },
  { value: 'catamaran', label: 'Catamarans' },
  { value: 'destination', label: 'Destinations' },
  { value: 'cruise', label: 'Croisières' },
  { value: 'experience', label: 'Expériences' }
];

const PhotoEditForm: React.FC<PhotoEditFormProps> = ({ photo, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Photo>>({
    url: photo?.url || '',
    title: photo?.title || '',
    description: photo?.description || '',
    category: photo?.category || 'hero',
    isActive: photo?.isActive !== undefined ? photo.isActive : true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.url || !formData.title || !formData.category) {
      return; // Form validation error
    }
    
    setIsSubmitting(true);
    
    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isNewPhoto = !photo;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="url">URL de l'image</Label>
          <Input 
            id="url"
            value={formData.url}
            onChange={(e) => handleChange('url', e.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        
        {formData.url && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
            <img 
              src={formData.url} 
              alt="Preview" 
              className="max-h-40 w-full object-contain rounded"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input 
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Titre de l'image"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Description de l'image"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => handleChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="active"
            checked={formData.isActive} 
            onCheckedChange={(checked) => handleChange('isActive', checked)}
          />
          <Label htmlFor="active">Activer l'image</Label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enregistrement...' : isNewPhoto ? 'Ajouter' : 'Mettre à jour'}
        </Button>
      </div>
    </form>
  );
};

export default PhotoEditForm;
