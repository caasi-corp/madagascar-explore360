
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface VehicleFeaturesProps {
  features: string[];
  onFeaturesChange: (features: string[]) => void;
}

const VehicleFeatures: React.FC<VehicleFeaturesProps> = ({ features, onFeaturesChange }) => {
  const [newFeature, setNewFeature] = useState('');

  const handleAddFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      onFeaturesChange([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    onFeaturesChange(features.filter(f => f !== feature));
  };

  return (
    <div className="space-y-2">
      <Label>Caractéristiques</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {features.map((feature, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {feature}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => handleRemoveFeature(feature)}
            />
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input 
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Ajouter une caractéristique"
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
        />
        <Button type="button" size="icon" onClick={handleAddFeature}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VehicleFeatures;
