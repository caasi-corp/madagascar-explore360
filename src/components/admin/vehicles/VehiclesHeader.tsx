
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface VehiclesHeaderProps {
  onAddNew: () => void;
}

const VehiclesHeader: React.FC<VehiclesHeaderProps> = ({ onAddNew }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Gestion des Véhicules</h1>
      <Button onClick={onAddNew} className="bg-madagascar-green hover:bg-madagascar-green/80">
        <Plus className="mr-2 h-4 w-4" /> Ajouter un Véhicule
      </Button>
    </div>
  );
};

export default VehiclesHeader;
