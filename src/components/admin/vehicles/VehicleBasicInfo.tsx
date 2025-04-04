
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VehicleBasicInfoProps {
  name: string;
  type: string;
  seats: number;
  transmission: string;
  pricePerDay: number;
  description: string;
  fuelType: string;
  handleChange: (field: string, value: any) => void;
}

const VehicleBasicInfo: React.FC<VehicleBasicInfoProps> = ({
  name,
  type,
  seats,
  transmission,
  pricePerDay,
  description,
  fuelType,
  handleChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du véhicule</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => handleChange('name', e.target.value)} 
          placeholder="Ex: Toyota Hilux"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type de véhicule</Label>
          <Select 
            value={type} 
            onValueChange={(value) => handleChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Compact">Compact</SelectItem>
              <SelectItem value="Berline">Berline</SelectItem>
              <SelectItem value="Minibus">Minibus</SelectItem>
              <SelectItem value="4x4">4x4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="transmission">Transmission</Label>
          <Select 
            value={transmission} 
            onValueChange={(value) => handleChange('transmission', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manuel">Manuel</SelectItem>
              <SelectItem value="Automatique">Automatique</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="seats">Nombre de places</Label>
          <Input 
            id="seats" 
            type="number" 
            min={1}
            value={seats} 
            onChange={(e) => handleChange('seats', parseInt(e.target.value))} 
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Prix par jour (€)</Label>
          <Input 
            id="price" 
            type="number" 
            min={0}
            value={pricePerDay} 
            onChange={(e) => handleChange('pricePerDay', parseInt(e.target.value))} 
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fuelType">Type de carburant</Label>
        <Select 
          value={fuelType} 
          onValueChange={(value) => handleChange('fuelType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Diesel">Diesel</SelectItem>
            <SelectItem value="Essence">Essence</SelectItem>
            <SelectItem value="Hybride">Hybride</SelectItem>
            <SelectItem value="Électrique">Électrique</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => handleChange('description', e.target.value)} 
          placeholder="Description du véhicule..."
          rows={4}
        />
      </div>
    </div>
  );
};

export default VehicleBasicInfo;
