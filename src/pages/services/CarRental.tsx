
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';
import { z } from 'zod';

import CarRentalForm from '@/components/car-rental/CarRentalForm';
import VehicleList from '@/components/car-rental/VehicleList';
import { mockVehicles } from '@/components/car-rental/vehicleData';
import { VehicleProps } from '@/components/VehicleCard';
import { vehicleAPI } from '@/lib/api/vehicleAPI';

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
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleProps[]>(mockVehicles);
  const [searchParams, setSearchParams] = useState({
    pickupLocation: "",
    pickupDate: date.from,
    dropoffDate: date.to,
  });
  
  // Fetch available vehicles from API
  const { data: availableVehicles } = useQuery({
    queryKey: ['vehicles', searchParams],
    queryFn: () => vehicleAPI.getAvailable(),
    initialData: mockVehicles,
  });
  
  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    const params = {
      pickupLocation: values.pickupLocation,
      pickupDate: values.pickupDate,
      dropoffDate: values.dropoffDate || values.pickupDate,
    };
    
    setSearchParams(params);
    
    // Filter vehicles based on form values
    const filtered = availableVehicles.filter(vehicle => {
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
          <VehicleList vehicles={filteredVehicles} />
        </div>
      </div>
    </div>
  );
};

export default CarRental;
