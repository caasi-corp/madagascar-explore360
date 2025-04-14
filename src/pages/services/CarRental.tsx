import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Car, Filter, MapPin, Settings } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { VehicleProps } from '@/hooks/useVehicles';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const vehicles: VehicleProps[] = [
  {
    id: 'v1',
    name: 'Toyota Land Cruiser',
    type: '4x4',
    pricePerDay: 89,
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
    features: ['Climatisation', 'GPS', 'Porte-bagages', '4x4', 'Bluetooth', 'Ports USB'],
    availability: true,
  },
  {
    id: 'v2',
    name: 'Yamaha TW200',
    type: 'motorcycle',
    pricePerDay: 45,
    seats: 2,
    transmission: 'Manual',
    fuelType: 'Essence',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    features: ['Casque inclus', 'Sacoches', 'Capacité tout-terrain', 'Économe en carburant'],
    availability: true,
  },
  {
    id: 'v3',
    name: 'BRP Can-Am Outlander',
    type: 'quad',
    pricePerDay: 65,
    seats: 1,
    transmission: 'Automatic',
    fuelType: 'Essence',
    image: 'https://images.unsplash.com/photo-1566845735839-6e25c92269a1',
    features: ['Casque inclus', 'Coffre de rangement', '4x4', 'Garde au sol élevée'],
    availability: true,
  },
  {
    id: 'v4',
    name: 'Toyota Corolla',
    type: 'car',
    pricePerDay: 55,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Essence',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588',
    features: ['Climatisation', 'Bluetooth', 'Économe en carburant', 'Ports USB'],
    availability: true,
  },
  {
    id: 'v5',
    name: 'Mitsubishi Pajero',
    type: '4x4',
    pricePerDay: 85,
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    features: ['Climatisation', 'GPS', 'Porte-bagages', '4x4', 'Bluetooth'],
    availability: true,
  },
  {
    id: 'v6',
    name: 'Peugeot 208',
    type: 'car',
    pricePerDay: 40,
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Essence',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d',
    features: ['Climatisation', 'Bluetooth', 'Économe en carburant'],
    availability: true,
  },
];

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

const CarRental = () => {
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3)),
  });
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleProps[]>(vehicles);
  const [searchParams, setSearchParams] = useState({
    pickupLocation: "",
    pickupDate: date.from,
    dropoffDate: date.to,
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: date.from,
      dropoffDate: date.to,
    },
  });
  
  const { data: availableVehicles } = useQuery({
    queryKey: ['vehicles', searchParams],
    queryFn: () => Promise.resolve(vehicles.filter(v => v.availability)),
    initialData: vehicles,
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const params = {
      pickupLocation: values.pickupLocation,
      pickupDate: values.pickupDate,
      dropoffDate: values.dropoffDate || values.pickupDate,
    };
    
    setSearchParams(params);
    
    const filtered = vehicles.filter(vehicle => {
      return (
        (!values.vehicleType || vehicle.type === values.vehicleType) &&
        (!values.transmission || vehicle.transmission === values.transmission) &&
        (!values.fuelType || vehicle.fuelType === values.fuelType) &&
        (!values.minPrice || vehicle.pricePerDay >= values.minPrice) &&
        (!values.maxPrice || vehicle.pricePerDay <= values.maxPrice) &&
        (!values.minSeats || vehicle.seats >= values.minSeats) &&
        vehicle.availability === true
      );
    });
    
    setFilteredVehicles(filtered);
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Location de Véhicules à Madagascar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
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
                              {date.from ? (
                                date.to ? (
                                  <>
                                    {format(date.from, "dd MMM", { locale: fr })} -{" "}
                                    {format(date.to, "dd MMM yyyy", { locale: fr })}
                                  </>
                                ) : (
                                  format(date.from, "dd MMM yyyy", { locale: fr })
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
                            defaultMonth={date.from}
                            selected={date}
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
                  </DialogContent>
                </Dialog>
                
                <Button type="submit" className="glass-button bg-madagascar-green text-white">
                  <Car className="mr-2 h-4 w-4" /> Rechercher
                </Button>
              </div>
            </form>
          </Form>
        </div>
      
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="glass-card overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold">{vehicle.name}</h3>
                    <span className="text-lg font-bold text-madagascar-green">{vehicle.pricePerDay}€<span className="text-sm font-normal">/jour</span></span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>Antananarivo</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs flex items-center">
                      <Settings size={12} className="mr-1" />
                      {vehicle.transmission === 'Automatic' ? 'Automatique' : 'Manuelle'}
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs">
                      {vehicle.fuelType}
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs">
                      {vehicle.seats} places
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs">
                      {vehicle.type === 'car' ? 'Voiture' : 
                       vehicle.type === '4x4' ? '4x4' : 
                       vehicle.type === 'motorcycle' ? 'Moto' : 'Quad'}
                    </div>
                  </div>
                  
                  <Button className="w-full glass-button bg-madagascar-green text-white">
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredVehicles.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Aucun véhicule ne correspond à votre recherche. Veuillez essayer d'autres critères.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarRental;
