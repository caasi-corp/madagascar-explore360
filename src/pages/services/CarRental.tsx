
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';
import { z } from 'zod';

import CarRentalForm from '@/components/car-rental/CarRentalForm';
import VehicleList from '@/components/car-rental/VehicleList';
import { VehicleService, VehicleSearchParams } from '@/lib/api/vehicle-service';
import { Vehicle } from '@/lib/db/schema';

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
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchParams, setSearchParams] = useState<VehicleSearchParams>({
    pickupLocation: "",
    pickupDate: date.from,
    dropoffDate: date.to,
  });
  
  // Fetch available vehicles from API
  const { data: availableVehicles = [], isLoading } = useQuery({
    queryKey: ['vehicles', 'available'],
    queryFn: () => VehicleService.getAvailableVehicles(),
  });
  
  // Set initial filtered vehicles when available vehicles change
  React.useEffect(() => {
    if (availableVehicles.length > 0 && filteredVehicles.length === 0) {
      setFilteredVehicles(availableVehicles);
    }
  }, [availableVehicles, filteredVehicles]);
  
  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const params: VehicleSearchParams = {
      pickupLocation: values.pickupLocation,
      pickupDate: values.pickupDate,
      dropoffDate: values.dropoffDate || values.pickupDate,
      vehicleType: values.vehicleType,
      transmission: values.transmission,
      fuelType: values.fuelType,
      minPrice: values.minPrice,
      maxPrice: values.maxPrice,
      minSeats: values.minSeats,
    };
    
    setSearchParams(params);
    
    // Filter vehicles based on search params
    const filtered = await VehicleService.filterVehicles(params);
    setFilteredVehicles(filtered);
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Location de Véhicules à Madagascar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Form */}
        <div className="lg:col-span-3">
          <CarRentalForm 
            onSubmit={handleFormSubmit}
            initialDate={date}
            setDate={setDate}
          />
        </div>
      
        {/* Results */}
        <div className="col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-madagascar-green"></div>
            </div>
          ) : (
            <VehicleList vehicles={filteredVehicles} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CarRental;
