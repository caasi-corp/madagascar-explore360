
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import DestinationSelector from './DestinationSelector';
import DateRangePicker from './DateRangePicker';
import TravelersSelector from './TravelersSelector';
import { useBreakpoint } from '@/hooks/use-mobile';

const destinations = [
  { name: 'Nosy Be', type: 'plages' },
  { name: 'Antananarivo', type: 'ville' },
  { name: 'Parc National d\'Andasibe', type: 'nature' },
  { name: 'Allée des Baobabs', type: 'attraction' },
  { name: 'Île Sainte-Marie', type: 'plages' },
  { name: 'Parc National de l\'Isalo', type: 'nature' },
  { name: 'Morondava', type: 'ville' },
  { name: 'Diego Suarez', type: 'ville' },
];

const HeroSearch = () => {
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [travelers, setTravelers] = useState({
    adults: 2,
    children: 0,
    infants: 0,
  });
  
  const { isMobile } = useBreakpoint();

  // Handle search button click
  const handleSearch = () => {
    console.log('Recherche avec:', {
      destination,
      dateRange,
      travelers
    });
    // Implement search functionality or navigation
  };

  return (
    <div className="glass-card p-3 sm:p-4 md:p-6 rounded-lg shadow-lg max-w-4xl mx-auto md:mx-0 animation-delay-600 animate-fade-in">
      <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'lg:grid-cols-4 gap-4'}`}>
        {/* Destination Field */}
        <DestinationSelector 
          destination={destination} 
          setDestination={setDestination} 
          destinations={destinations} 
        />

        {/* Date Range Picker */}
        <DateRangePicker 
          dateRange={dateRange} 
          setDateRange={setDateRange} 
        />

        {/* Travelers Selector */}
        <TravelersSelector 
          travelers={travelers} 
          setTravelers={setTravelers} 
        />

        {/* Search Button */}
        <Button 
          className={`bg-northgascar-teal hover:bg-northgascar-teal/80 text-white ${isMobile ? 'h-10 mt-1' : 'h-10 lg:h-full'}`}
          onClick={handleSearch}
        >
          <Search className="mr-2" size={18} />
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default HeroSearch;
