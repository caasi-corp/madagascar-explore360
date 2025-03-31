
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface FilterDialogContentProps {
  form: UseFormReturn<any>;
}

export const FilterDialogContent: React.FC<FilterDialogContentProps> = ({ form }) => {
  return (
    <div className="grid gap-4 py-4">
      <FormField
        control={form.control}
        name="vehicleType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type de véhicule</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les véhicules" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="">Tous les véhicules</SelectItem>
                <SelectItem value="car">Voiture</SelectItem>
                <SelectItem value="4x4">4x4</SelectItem>
                <SelectItem value="motorcycle">Moto</SelectItem>
                <SelectItem value="quad">Quad</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="transmission"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Transmission</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les transmissions" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="">Toutes les transmissions</SelectItem>
                <SelectItem value="Automatic">Automatique</SelectItem>
                <SelectItem value="Manual">Manuelle</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="fuelType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Carburant</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les carburants" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="">Tous les carburants</SelectItem>
                <SelectItem value="Essence">Essence</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="minPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix min (€)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="maxPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix max (€)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="200"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="minSeats"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre min. de sièges</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="1"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
