
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Photo } from '@/lib/store';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PhotoCardProps {
  photo: Photo;
  onEdit: (photo: Photo) => void;
  onDelete: (id: string) => void;
  onToggleActive?: (id: string, active: boolean) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ 
  photo, 
  onEdit, 
  onDelete,
  onToggleActive 
}) => {
  const categoryColors = {
    banner: 'bg-blue-500',
    gallery: 'bg-green-500',
    tour: 'bg-yellow-500',
    vehicle: 'bg-purple-500',
    hotel: 'bg-red-500',
    catamaran: 'bg-teal-500'
  };

  const getCategoryLabel = (category: Photo['category']) => {
    const labels = {
      banner: 'Bannière',
      gallery: 'Galerie',
      tour: 'Circuit',
      vehicle: 'Véhicule',
      hotel: 'Hôtel',
      catamaran: 'Catamaran'
    };
    return labels[category] || category;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={photo.url} 
          alt={photo.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${categoryColors[photo.category]} text-white`}>
            {getCategoryLabel(photo.category)}
          </Badge>
        </div>
        {!photo.active && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium px-2 py-1 rounded">Désactivée</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex-grow">
        <h3 className="font-medium text-lg mb-1 truncate" title={photo.title}>
          {photo.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          Ajoutée le {formatDate(photo.createdAt)}
        </p>
        {photo.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {photo.description}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(photo)}
          >
            <Edit className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline">Modifier</span>
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-destructive">
                <Trash2 className="h-4 w-4 mr-1" />
                <span className="sr-only md:not-sr-only md:inline">Supprimer</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer cette photo ? Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(photo.id)} className="bg-destructive text-destructive-foreground">
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        {onToggleActive && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onToggleActive(photo.id, !photo.active)}
          >
            {photo.active ? (
              <>
                <EyeOff className="h-4 w-4 mr-1" />
                <span className="sr-only md:not-sr-only md:inline">Désactiver</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-1" />
                <span className="sr-only md:not-sr-only md:inline">Activer</span>
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PhotoCard;
