
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface GeneralInfoSectionProps {
  name: string;
  destination: string;
  catamaran: string;
  duration: string;
  price: string;
  shortDescription: string;
  description: string;
  onNameChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onCatamaranChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onShortDescriptionChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const GeneralInfoSection: React.FC<GeneralInfoSectionProps> = ({
  name,
  destination,
  catamaran,
  duration,
  price,
  shortDescription,
  description,
  onNameChange,
  onDestinationChange,
  onCatamaranChange,
  onDurationChange,
  onPriceChange,
  onShortDescriptionChange,
  onDescriptionChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations générales</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom de la croisière</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Nom de la croisière"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Select
              value={destination}
              onValueChange={onDestinationChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nosy Be">Nosy Be</SelectItem>
                <SelectItem value="Archipel de Mitsio">Archipel de Mitsio</SelectItem>
                <SelectItem value="Nosy Komba">Nosy Komba</SelectItem>
                <SelectItem value="Îles Radama">Îles Radama</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="catamaran">Catamaran</Label>
            <Select
              value={catamaran}
              onValueChange={onCatamaranChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un catamaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paradis Bleu">Paradis Bleu</SelectItem>
                <SelectItem value="Océan Nomade">Océan Nomade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Durée (jours)</Label>
            <Select
              value={duration}
              onValueChange={onDurationChange}
            >
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
            <Label htmlFor="price">Prix par personne (€)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              placeholder="Prix"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="shortDescription">Description courte</Label>
          <Input
            id="shortDescription"
            value={shortDescription}
            onChange={(e) => onShortDescriptionChange(e.target.value)}
            placeholder="Description courte pour les listes"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description complète</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Description détaillée de la croisière"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralInfoSection;
