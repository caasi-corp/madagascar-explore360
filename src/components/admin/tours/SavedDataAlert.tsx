
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { TourFormValues } from '@/hooks/useTourEditorForm';
import { UseFormReturn } from 'react-hook-form';

interface SavedDataAlertProps {
  formData: TourFormValues;
  clearSavedData: () => void;
  form: UseFormReturn<TourFormValues>;
}

const SavedDataAlert: React.FC<SavedDataAlertProps> = ({ formData, clearSavedData, form }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="mb-6">
          <Save className="h-4 w-4 mr-2" /> You have unsaved changes
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes from your previous session. Would you like to restore them or start fresh?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={clearSavedData}>Start Fresh</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => {
              const savedData = formData;
              form.reset(savedData);
              toast({
                title: 'Changes restored',
                description: 'Your unsaved changes have been restored',
              });
            }}>
            Restore Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SavedDataAlert;
