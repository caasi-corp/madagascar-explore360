
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash, PowerOff, Power } from 'lucide-react';
import { Photo } from '@/lib/api/photoAPI';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';

interface PhotoCardProps {
  photo: Photo;
  onToggleActive: (id: string) => Promise<void>;
  onEdit: (photo: Photo) => void;
  onDelete: (id: string) => Promise<void>;
  onView: (photo: Photo) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onToggleActive, onEdit, onDelete, onView }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const categoryColors: Record<string, string> = {
    hero: 'bg-blue-100 text-blue-800',
    catamaran: 'bg-green-100 text-green-800',
    destination: 'bg-purple-100 text-purple-800',
    cruise: 'bg-amber-100 text-amber-800',
    experience: 'bg-pink-100 text-pink-800'
  };
  
  const handleDelete = async () => {
    await onDelete(photo.id);
    setConfirmDelete(false);
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <img 
          src={photo.url} 
          alt={photo.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant={photo.isActive ? 'default' : 'outline'}>
            {photo.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-medium text-sm truncate">{photo.title}</h3>
          <p className="text-xs text-muted-foreground truncate">{photo.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={categoryColors[photo.category] || 'bg-gray-100 text-gray-800'}>
            {photo.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {format(new Date(photo.createdAt), 'dd/MM/yyyy')}
          </Badge>
        </div>
        
        <div className="flex justify-between">
          <div className="flex gap-1">
            <Button size="icon" variant="outline" onClick={() => onView(photo)}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => onEdit(photo)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
              <DialogTrigger asChild>
                <Button size="icon" variant="outline" className="text-destructive">
                  <Trash className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmer la suppression</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir supprimer cette photo ? Cette action est irréversible.
                  </DialogDescription>
                </DialogHeader>
                <div className="my-4">
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    className="w-full h-40 object-contain"
                  />
                  <p className="mt-2 font-medium">{photo.title}</p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setConfirmDelete(false)}>Annuler</Button>
                  <Button variant="destructive" onClick={handleDelete}>Supprimer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Button 
            size="icon" 
            variant={photo.isActive ? "default" : "secondary"}
            onClick={() => onToggleActive(photo.id)}
          >
            {photo.isActive ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
