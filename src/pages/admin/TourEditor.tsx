
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTourEditorForm } from '@/hooks/useTourEditorForm';
import TourEditorHeader from '@/components/admin/tours/TourEditorHeader';
import TourEditorForm from '@/components/admin/tours/TourEditorForm';

interface TourEditorProps {
  useCategories?: boolean;
}

const TourEditor: React.FC<TourEditorProps> = ({ useCategories = false }) => {
  const { id } = useParams<{ id: string }>();
  const {
    form,
    formData,
    isLoading,
    isSubmitting,
    lastSavedAt,
    hasSavedData,
    onSubmit,
    handleCancel,
    clearSavedData
  } = useTourEditorForm(id);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading tour data...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <TourEditorHeader
        id={id}
        useCategories={useCategories}
        lastSavedAt={lastSavedAt}
        hasSavedData={hasSavedData}
        formData={formData}
        clearSavedData={clearSavedData}
        form={form}
      />

      <Card>
        <CardHeader>
          <CardTitle>Tour Information</CardTitle>
        </CardHeader>
        <CardContent>
          <TourEditorForm
            form={form}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TourEditor;
