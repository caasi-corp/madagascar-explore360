
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { TourFormValues } from '@/pages/admin/TourEditor';

interface TourPricingFieldsProps {
  form: UseFormReturn<TourFormValues>;
}

const TourPricingFields: React.FC<TourPricingFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price (€)</FormLabel>
            <FormControl>
              <Input type="number" {...field} min="0" step="0.01" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duration (days)</FormLabel>
            <FormControl>
              <Input type="number" {...field} min="1" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default TourPricingFields;
