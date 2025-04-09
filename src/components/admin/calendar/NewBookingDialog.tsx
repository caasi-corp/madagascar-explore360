
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog';

interface NewBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewBookingDialog: React.FC<NewBookingDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Réservation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle réservation</DialogTitle>
          <DialogDescription>
            Saisissez les détails de la nouvelle réservation
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Contenu du formulaire de réservation */}
          <p>Formulaire de réservation à implémenter</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
