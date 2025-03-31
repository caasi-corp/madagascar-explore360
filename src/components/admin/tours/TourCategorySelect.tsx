
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { TourFormValues } from '@/pages/admin/TourEditor';

interface TourCategorySelectProps {
  form: UseFormReturn<TourFormValues>;
}

const TourCategorySelect: React.FC<TourCategorySelectProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="nature">Nature</SelectItem>
              <SelectItem value="wildlife">Wildlife</SelectItem>
              <SelectItem value="beach">Beach</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TourCategorySelect;
