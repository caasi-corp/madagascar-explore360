
import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import ToursFilter from '@/components/tours/ToursFilter';
import ToursResults from '@/components/tours/ToursResults';
import { useTourFiltering } from '@/hooks/useTourFiltering';
import { categories, durations } from '@/data/toursData';
import { tourSupabaseAPI } from '@/lib/api/supabase/tourAPI';
import { Tour } from '@/lib/db/schema';
import { useToast } from '@/components/ui/use-toast';

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const toursData = await tourSupabaseAPI.getAll();
        console.log('Tours chargés:', toursData);
        setTours(toursData);
      } catch (error) {
        console.error('Error fetching tours:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les circuits",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [toast]);

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
          {loading ? (
            <div className="flex justify-center items-center min-h-[40vh]">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-madagascar-green border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-madagascar-blue dark:text-madagascar-yellow">Chargement des circuits...</p>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Tours;
