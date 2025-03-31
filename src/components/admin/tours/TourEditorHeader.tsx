
import React from 'react';
import AutoSaveIndicator from './AutoSaveIndicator';
import SavedDataAlert from './SavedDataAlert';
import { TourFormValues } from '@/hooks/useTourEditorForm';
import { UseFormReturn } from 'react-hook-form';

interface TourEditorHeaderProps {
  id?: string;
  useCategories: boolean;
  lastSavedAt: Date | null;
  hasSavedData: boolean;
  formData: TourFormValues;
  clearSavedData: () => void;
  form: UseFormReturn<TourFormValues>;
}

const TourEditorHeader: React.FC<TourEditorHeaderProps> = ({
  id,
  useCategories,
  lastSavedAt,
  hasSavedData,
  formData,
  clearSavedData,
  form
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {useCategories ? 'Tour Categories Editor' : id && id !== 'new' ? 'Edit Tour' : 'Create New Tour'}
        </h1>
        
        <AutoSaveIndicator lastSavedAt={lastSavedAt} />
      </div>

      {/* Alert dialog for restoring saved data */}
      {hasSavedData && (
        <SavedDataAlert 
          formData={formData}
          clearSavedData={clearSavedData}
          form={form}
        />
      )}
    </>
  );
};

export default TourEditorHeader;
