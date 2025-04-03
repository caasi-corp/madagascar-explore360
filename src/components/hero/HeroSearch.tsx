
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import DestinationSearch from '@/components/search/DestinationSearch';
import DateRangeSearch from '@/components/search/DateRangeSearch';
import TravelersSearch from '@/components/search/TravelersSearch';
import SearchButton from '@/components/search/SearchButton';
import { Travelers, SearchParams } from '@/components/search/types';

const HeroSearch = () => {
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [travelers, setTravelers] = useState<Travelers>({
    adults: 2,
    children: 0,
    infants: 0,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTravelersOpen, setIsTravelersOpen] = useState(false);

  // Handle search button click
  const handleSearch = () => {
    const searchParams: SearchParams = {
      destination,
      dateRange,
      travelers
    };
    
    console.log('Recherche avec:', searchParams);
    // Implement search functionality or navigation
  };

  return (
    <div className="glass-card p-4 md:p-6 rounded-lg shadow-lg max-w-4xl mx-auto md:mx-0 animation-delay-600 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Destination Field */}
        <DestinationSearch 
          destination={destination} 
          onDestinationChange={setDestination} 
        />

        {/* Date Range Picker */}
        <DateRangeSearch 
          dateRange={dateRange} 
          setDateRange={setDateRange} 
          isCalendarOpen={isCalendarOpen} 
          setIsCalendarOpen={setIsCalendarOpen} 
        />

        {/* Travelers Selector */}
        <TravelersSearch 
          travelers={travelers} 
          setTravelers={setTravelers} 
          isTravelersOpen={isTravelersOpen} 
          setIsTravelersOpen={setIsTravelersOpen} 
        />

        {/* Search Button */}
        <SearchButton onClick={handleSearch} />
      </div>
    </div>
  );
};

export default HeroSearch;
