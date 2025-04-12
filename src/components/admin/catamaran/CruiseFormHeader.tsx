
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Trash } from 'lucide-react';

interface CruiseFormHeaderProps {
  isEditMode: boolean;
  isActive: boolean;
  onActiveChange: (checked: boolean) => void;
  onDelete: () => void;
  onSave: () => void;
}

const CruiseFormHeader: React.FC<CruiseFormHeaderProps> = ({
  isEditMode,
  isActive,
  onActiveChange,
  onDelete,
  onSave
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/catamaran-cruises')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{isEditMode ? 'Modifier la croisière' : 'Nouvelle croisière'}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="active" 
            checked={isActive}
            onCheckedChange={onActiveChange}
          />
          <Label htmlFor="active">Activer cette croisière</Label>
        </div>
        <Button variant="destructive" className="gap-1" onClick={onDelete}>
          <Trash className="h-4 w-4" /> Supprimer
        </Button>
        <Button className="bg-northgascar-teal hover:bg-northgascar-teal/80 gap-1" onClick={onSave}>
          <Save className="h-4 w-4" /> Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default CruiseFormHeader;
