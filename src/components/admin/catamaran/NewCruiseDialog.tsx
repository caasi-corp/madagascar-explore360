
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface NewCruiseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewCruiseDialog: React.FC<NewCruiseDialogProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle croisière</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour créer une nouvelle croisière.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2 col-span-2">
            <label htmlFor="cruise-name">Nom de la croisière</label>
            <Input id="cruise-name" placeholder="Nom de la croisière" />
          </div>
          <div className="space-y-2">
            <label htmlFor="destination">Destination</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nosy-be">Nosy Be</SelectItem>
                <SelectItem value="mitsio">Archipel de Mitsio</SelectItem>
                <SelectItem value="nosy-komba">Nosy Komba</SelectItem>
                <SelectItem value="radama">Îles Radama</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="catamaran">Catamaran</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un catamaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paradis-bleu">Paradis Bleu</SelectItem>
                <SelectItem value="ocean-nomade">Océan Nomade</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="duration">Durée</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une durée" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 jour</SelectItem>
                <SelectItem value="2">2 jours</SelectItem>
                <SelectItem value="3">3 jours</SelectItem>
                <SelectItem value="5">5 jours</SelectItem>
                <SelectItem value="7">7 jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="price">Prix par personne (€)</label>
            <Input id="price" type="number" min="0" placeholder="Prix" />
          </div>
          <div className="space-y-2 col-span-2">
            <label htmlFor="description">Description</label>
            <Input id="description" placeholder="Description de la croisière" />
          </div>
          <div className="col-span-2 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox id="active" />
              <label htmlFor="active">Activer cette croisière</label>
            </div>
            <div className="space-x-2">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>Annuler</Button>
              <Button className="bg-northgascar-teal hover:bg-northgascar-teal/80">Enregistrer</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewCruiseDialog;
