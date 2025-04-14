
import React, { useState, useEffect } from 'react';
import { useHotels } from '@/hooks/useHotels';
import HotelsList from '@/components/hotels/HotelsList';
import HotelFilter, { HotelFilterOptions } from '@/components/hotels/HotelFilter';
import { Hotel } from '@/lib/db/schema';

const Hotels: React.FC = () => {
  const { hotels, isLoading, searchHotels } = useHotels();
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    if (hotels.length > 0) {
      setFilteredHotels(hotels);
      
      // Extraire les emplacements uniques
      const uniqueLocations = Array.from(new Set(hotels.map(hotel => hotel.location)));
      setLocations(uniqueLocations);
    }
  }, [hotels]);

  const handleFilterChange = (filters: HotelFilterOptions) => {
    const results = searchHotels(filters);
    setFilteredHotels(results);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hôtels à Madagascar</h1>
        <p className="text-muted-foreground">
          Découvrez notre sélection d'hôtels pour votre séjour à Madagascar
        </p>
      </div>

      <div className="mb-8">
        <HotelFilter 
          locations={locations} 
          onFilterChange={handleFilterChange} 
        />
      </div>

      <HotelsList 
        hotels={filteredHotels} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default Hotels;
