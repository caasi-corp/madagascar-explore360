
import React, { useState, useEffect } from 'react';
import { useFlights } from '@/hooks/useFlights';
import FlightsList from '@/components/flights/FlightsList';
import FlightFilter, { FlightFilterOptions } from '@/components/flights/FlightFilter';
import { Flight } from '@/lib/db/schema';

const Flights: React.FC = () => {
  const { flights, isLoading, searchFlights } = useFlights();
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [airlines, setAirlines] = useState<string[]>([]);

  useEffect(() => {
    if (flights.length > 0) {
      setFilteredFlights(flights);
      
      // Extraire les destinations uniques
      const allDestinations = new Set([
        ...flights.map(flight => flight.departure),
        ...flights.map(flight => flight.arrival)
      ]);
      setDestinations(Array.from(allDestinations));
      
      // Extraire les compagnies aériennes uniques
      const uniqueAirlines = Array.from(new Set(flights.map(flight => flight.airline)));
      setAirlines(uniqueAirlines);
    }
  }, [flights]);

  const handleFilterChange = (filters: FlightFilterOptions) => {
    const results = searchFlights(filters);
    setFilteredFlights(results);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Vols pour Madagascar</h1>
        <p className="text-muted-foreground">
          Trouvez les meilleurs vols pour votre voyage à Madagascar
        </p>
      </div>

      <div className="mb-8">
        <FlightFilter 
          destinations={destinations} 
          airlines={airlines}
          onFilterChange={handleFilterChange} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold mb-2">Conseil de voyage</h3>
            <p className="text-sm text-muted-foreground">
              Les vols intérieurs à Madagascar peuvent être sujets à des changements d'horaires. 
              Nous vous recommandons de prévoir une marge de sécurité d'au moins un jour entre 
              vos connexions importantes.
            </p>
          </div>
        </div>
        <div className="lg:col-span-3">
          <FlightsList 
            flights={filteredFlights} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
};

export default Flights;
