
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { TourFormValues } from '@/hooks/useTourEditorForm';

interface TourDescriptionFieldProps {
  form: UseFormReturn<TourFormValues>;
}

const TourDescriptionField: React.FC<TourDescriptionFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea placeholder="Enter tour description" className="min-h-32" {...field} />
          </FormControl>
          <FormDescription>
            Provide a detailed description of the tour.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TourDescriptionField;
