
import React, { useState, useRef } from 'react';
import { useBanners } from '@/hooks/useBanners';
import { Banner } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Upload, Image } from 'lucide-react';
import { toast } from 'sonner';
import { pageTypes } from './BannersList';

interface BannerFormProps {
  initialData?: Banner;
  mode: 'add' | 'edit';
  onClose?: () => void;
}

export const BannerForm: React.FC<BannerFormProps> = ({ initialData, mode, onClose }) => {
  const { addBanner, updateBanner } = useBanners();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialData?.imagePath || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    page: initialData?.page || 'home',
    description: initialData?.description || '',
    isActive: initialData?.isActive || true,
    imagePath: initialData?.imagePath || ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérification du type de fichier
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.error("Format de fichier non supporté", {
          description: "Formats acceptés: JPG, PNG, WebP"
        });
        return;
      }
      
      // Vérifier la taille du fichier (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Fichier trop volumineux", {
          description: "La taille maximum est de 5MB"
        });
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let imagePath = formData.imagePath;
      
      // Si un nouveau fichier a été sélectionné, nous simulons un upload
      // Dans un environnement réel, on enverrait le fichier à un serveur ou service de stockage
      if (imageFile) {
        // Simuler le délai d'upload
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Ici, dans un cas réel, on récupérerait l'URL depuis le serveur
        // Pour la démo, on utilise un Data URL
        const reader = new FileReader();
        const dataUrlPromise = new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
        });
        
        reader.readAsDataURL(imageFile);
        imagePath = await dataUrlPromise;
      }
      
      const bannerData = {
        ...formData,
        imagePath,
      };
      
      let success = false;
      
      if (mode === 'add') {
        success = await addBanner(bannerData);
        if (success) {
          toast.success("Bannière ajoutée", {
            description: "La bannière a été ajoutée avec succès."
          });
        }
      } else {
        if (initialData) {
          success = await updateBanner(initialData.id, bannerData);
          if (success) {
            toast.success("Bannière mise à jour", {
              description: "La bannière a été mise à jour avec succès."
            });
          }
        }
      }
      
      if (success && onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Une erreur est survenue", {
        description: "Impossible de traiter votre demande."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom de la bannière</Label>
          <Input 
            id="name" 
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ex: Bannière Accueil Principal"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="page">Page</Label>
          <Select 
            value={formData.page}
            onValueChange={(value) => handleChange('page', value)}
          >
            <SelectTrigger id="page">
              <SelectValue placeholder="Choisir une page" />
            </SelectTrigger>
            <SelectContent>
              {pageTypes.map(page => (
                <SelectItem key={page.value} value={page.value}>
                  {page.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description (optionnelle)</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Description de la bannière..."
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="image">Image de bannière</Label>
            <span className="text-xs text-muted-foreground">Formats: JPG, PNG, WebP (Max: 5MB)</span>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            {preview ? (
              <div className="relative">
                <img 
                  src={preview} 
                  alt="Aperçu" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={handleImageButtonClick}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Changer l'image
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="w-full h-40 bg-muted flex flex-col items-center justify-center cursor-pointer"
                onClick={handleImageButtonClick}
              >
                <Image className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Cliquez pour ajouter une image</p>
              </div>
            )}
          </div>
          
          <Input 
            ref={fileInputRef}
            id="image" 
            type="file" 
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {/* Alternative de saisie d'URL */}
          <div className="mt-2">
            <Label htmlFor="imagePath">Ou entrez une URL d'image</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="imagePath"
                value={imageFile ? '' : formData.imagePath}
                onChange={(e) => {
                  handleChange('imagePath', e.target.value);
                  if (e.target.value) {
                    setPreview(e.target.value);
                    setImageFile(null);
                  } else {
                    setPreview(null);
                  }
                }}
                placeholder="https://example.com/image.jpg"
                disabled={!!imageFile}
              />
              {formData.imagePath && !imageFile && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setPreview(formData.imagePath);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Switch 
            id="isActive" 
            checked={formData.isActive}
            onCheckedChange={(checked) => handleChange('isActive', checked)}
          />
          <Label htmlFor="isActive">Activer cette bannière</Label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
        )}
        <Button 
          type="submit" 
          className="bg-madagascar-green hover:bg-madagascar-green/80 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {mode === 'add' ? 'Ajouter' : 'Mettre à jour'}
        </Button>
      </div>
    </form>
  );
};

export default BannerForm;
