
import React from 'react';
import Hero from '@/components/Hero';
import ToursFilter from '@/components/tours/ToursFilter';
import ToursResults from '@/components/tours/ToursResults';
import { useTourFiltering } from '@/hooks/useTourFiltering';
import { tours, categories, durations } from '@/data/toursData';

const Tours = () => {
  const {
    searchTerm,
    setSearchTerm,
    isFilterOpen,
    setIsFilterOpen,
    filters,
    setFilters,
    selectedDate,
    setSelectedDate,
    filteredTours,
    resetFilters
  } = useTourFiltering(tours);

  return (
    <>
      <Hero 
        title="Découvrez Nos Circuits"
        subtitle="Explorez l'incroyable biodiversité, les paysages magnifiques et la culture unique de Madagascar"
        showSearch={false}
        height="min-h-[40vh]"
        backgroundImage="https://images.unsplash.com/photo-1504623953583-4ae307ea839f"
      />
      
      <div className="section-padding">
        <div className="container mx-auto">
          <ToursFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            filters={filters}
            setFilters={setFilters}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            categories={categories}
            durations={durations}
          />
          
          <ToursResults 
            filteredTours={filteredTours}
            resetFilters={resetFilters}
          />
        </div>
      </div>
    </>
  );
};

export default Tours;
