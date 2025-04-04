
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface VehicleSettingsProps {
  available: boolean;
  featured: boolean;
  isEditMode: boolean;
  handleChange: (field: string, value: boolean) => void;
}

const VehicleSettings: React.FC<VehicleSettingsProps> = ({
  available,
  featured,
  isEditMode,
  handleChange
}) => {
  return (
    <>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="available">Disponible</Label>
            <div className="text-sm text-muted-foreground">Le véhicule peut être réservé</div>
          </div>
          <Switch 
            id="available" 
            checked={available} 
            onCheckedChange={(checked) => handleChange('available', checked)} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="featured">Mettre en avant</Label>
            <div className="text-sm text-muted-foreground">Afficher sur la page d'accueil</div>
          </div>
          <Switch 
            id="featured" 
            checked={featured} 
            onCheckedChange={(checked) => handleChange('featured', checked)} 
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">
          <Save className="mr-2 h-4 w-4" />
          {isEditMode ? 'Mettre à jour le véhicule' : 'Ajouter le véhicule'}
        </Button>
      </CardFooter>
    </>
  );
};

export default VehicleSettings;
