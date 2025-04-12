
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Photo } from '@/lib/store';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Schéma de validation
const photoSchema = z.object({
  title: z.string().min(2, 'Le titre doit contenir au moins 2 caractères'),
  url: z.string().url('Veuillez entrer une URL valide'),
  description: z.string().optional(),
  category: z.enum(['banner', 'gallery', 'tour', 'vehicle', 'hotel', 'catamaran']),
  active: z.boolean().default(true),
});

type PhotoFormValues = z.infer<typeof photoSchema>;

interface PhotoEditFormProps {
  photo?: Photo;
  onSave: (values: Omit<Photo, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const PhotoEditForm: React.FC<PhotoEditFormProps> = ({ photo, onSave, onCancel }) => {
  const defaultValues: PhotoFormValues = photo ? {
    title: photo.title,
    url: photo.url,
    description: photo.description || '',
    category: photo.category,
    active: photo.active,
  } : {
    title: '',
    url: '',
    description: '',
    category: 'banner',
    active: true,
  };

  const form = useForm<PhotoFormValues>({
    resolver: zodResolver(photoSchema),
    defaultValues,
  });

  const onSubmit = (values: PhotoFormValues) => {
    onSave({
      title: values.title,
      url: values.url,
      description: values.description || undefined,
      category: values.category,
      active: values.active,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre de la photo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de l'image</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Description de la photo (optionnel)" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="banner">Bannière</SelectItem>
                      <SelectItem value="gallery">Galerie</SelectItem>
                      <SelectItem value="tour">Circuit</SelectItem>
                      <SelectItem value="vehicle">Véhicule</SelectItem>
                      <SelectItem value="hotel">Hôtel</SelectItem>
                      <SelectItem value="catamaran">Catamaran</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Catégorisez cette photo pour une meilleure organisation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Activer la photo</FormLabel>
                    <FormDescription>
                      Les photos inactives ne sont pas affichées sur le site
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.getValues().url && (
              <div>
                <FormLabel>Aperçu</FormLabel>
                <div className="mt-2 border rounded-md overflow-hidden">
                  <img 
                    src={form.getValues().url} 
                    alt="Aperçu" 
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/600x400?text=Image+invalide';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            {photo ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PhotoEditForm;
