
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload, Plus } from 'lucide-react';
import { DialogTrigger } from '@/components/ui/dialog';

interface CruisesHeaderProps {
  openNewCruiseDialog: () => void;
}

const CruisesHeader: React.FC<CruisesHeaderProps> = ({ openNewCruiseDialog }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Gestion des Croisières en Catamaran</h1>
      <div className="flex gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Exporter
        </Button>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" /> Importer
        </Button>
        <Button 
          className="bg-northgascar-teal hover:bg-northgascar-teal/80"
          onClick={openNewCruiseDialog}
        >
          <Plus className="mr-2 h-4 w-4" /> Nouvelle Croisière
        </Button>
      </div>
    </div>
  );
};

export default CruisesHeader;
