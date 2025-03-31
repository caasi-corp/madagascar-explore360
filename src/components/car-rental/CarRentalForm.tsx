
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Car, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { DateRange } from 'react-day-picker';
import { FilterDialogContent } from './FilterDialogContent';

const formSchema = z.object({
  pickupLocation: z.string().min(2, { message: "La localisation est requise" }),
  dropoffLocation: z.string().optional(),
  pickupDate: z.date({ required_error: "La date de prise en charge est requise" }),
  dropoffDate: z.date({ required_error: "La date de retour est requise" }),
  vehicleType: z.string().optional(),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
  minPrice: z.number().nonnegative().optional(),
  maxPrice: z.number().nonnegative().optional(),
  minSeats: z.number().int().nonnegative().optional(),
});

interface CarRentalFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  initialDate: DateRange;
  setDate: React.Dispatch<React.SetStateAction<DateRange>>;
}

const CarRentalForm: React.FC<CarRentalFormProps> = ({ 
  onSubmit, 
  initialDate, 
  setDate 
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: initialDate.from,
      dropoffDate: initialDate.to,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="glass-card rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lieu de prise en charge</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: Antananarivo" 
                    {...field} 
                    variant="glass"
                    className="glass-input"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dropoffLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lieu de retour (optionnel)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Même que la prise en charge" 
                    {...field} 
                    variant="glass"
                    className="glass-input"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="pickupDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Dates</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"glass"}
                        className="glass-input w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {initialDate.from ? (
                          initialDate.to ? (
                            <>
                              {format(initialDate.from, "dd MMM", { locale: fr })} -{" "}
                              {format(initialDate.to, "dd MMM yyyy", { locale: fr })}
                            </>
                          ) : (
                            format(initialDate.from, "dd MMM yyyy", { locale: fr })
                          )
                        ) : (
                          <span>Sélectionnez les dates</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={initialDate.from}
                      selected={initialDate}
                      onSelect={(newDate) => {
                        if (newDate) {
                          setDate(newDate);
                          if (newDate.from) {
                            form.setValue("pickupDate", newDate.from);
                          }
                          if (newDate.to) {
                            form.setValue("dropoffDate", newDate.to);
                          }
                        }
                      }}
                      numberOfMonths={2}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-between mt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="glass-button flex gap-2">
                <Filter size={16} /> Filtres
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Options et filtres</DialogTitle>
              </DialogHeader>
              <FilterDialogContent form={form} />
            </DialogContent>
          </Dialog>
          
          <Button type="submit" className="glass-button bg-madagascar-green text-white">
            <Car className="mr-2 h-4 w-4" /> Rechercher
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CarRentalForm;
