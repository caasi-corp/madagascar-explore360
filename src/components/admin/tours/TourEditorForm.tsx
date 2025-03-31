
import React from 'react';
import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { TourFormValues } from '@/pages/admin/TourEditor';
import TourBasicInfoFields from '@/components/admin/tours/TourBasicInfoFields';
import TourCategorySelect from '@/components/admin/tours/TourCategorySelect';
import TourPricingFields from '@/components/admin/tours/TourPricingFields';
import TourOptionsFields from '@/components/admin/tours/TourOptionsFields';
import TourDescriptionField from '@/components/admin/tours/TourDescriptionField';
import TourFormActions from '@/components/admin/tours/TourFormActions';

interface TourEditorFormProps {
  form: UseFormReturn<TourFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: TourFormValues) => Promise<void>;
  onCancel: () => void;
}

const TourEditorForm: React.FC<TourEditorFormProps> = ({
  form,
  isSubmitting,
  onSubmit,
  onCancel
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TourBasicInfoFields form={form} />
          <TourCategorySelect form={form} />
          <TourPricingFields form={form} />
          <TourOptionsFields form={form} />
        </div>

        <TourDescriptionField form={form} />

        <TourFormActions 
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
};

export default TourEditorForm;
