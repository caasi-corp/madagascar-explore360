
import React, { useState } from 'react';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BannerForm } from './BannerForm';

export const AddBannerDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <DialogContent className="sm:max-w-[650px]">
      <DialogHeader>
        <DialogTitle>Ajouter une nouvelle bannière</DialogTitle>
        <DialogDescription>
          Complétez les informations pour créer une nouvelle bannière
        </DialogDescription>
      </DialogHeader>
      <BannerForm 
        mode="add" 
        onClose={() => setOpen(false)}
      />
    </DialogContent>
  );
};

export default AddBannerDialog;
