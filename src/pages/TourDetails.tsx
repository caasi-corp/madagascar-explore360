
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTourQuery } from '@/hooks/useTourQuery';
import { useTourData } from '@/hooks/useTourData';
import TourHeader from '@/components/tours/TourHeader';
import TourImage from '@/components/tours/TourImage';
import TourMetadata from '@/components/tours/TourMetadata';
import TourDescription from '@/components/tours/TourDescription';
import TourHighlights from '@/components/tours/TourHighlights';
import TourBookingCard from '@/components/tours/TourBookingCard';
import TourLoadingState from '@/components/tours/TourLoadingState';
import TourErrorState from '@/components/tours/TourErrorState';

const TourDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { tour, isLoading, error } = useTourQuery(id);
  const tourData = useTourData(id, tour);
  
  if (isLoading) {
    return <TourLoadingState />;
  }
  
  if (error) {
    return <TourErrorState />;
  }
  
  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Ajout de marge supérieure pour éviter le chevauchement avec le nav */}
      <div className="mt-16 md:mt-6">
        <TourHeader title={tourData.title} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image et informations principales */}
          <div className="lg:col-span-2">
            <TourImage 
              image={tourData.image} 
              title={tourData.title} 
              featured={tourData.featured}
            />
            
            <TourMetadata 
              location={tourData.location}
              duration={tourData.duration}
              rating={tourData.rating}
              groupSize={tourData.groupSize}
              category={tourData.category}
            />
            
            <TourDescription description={tourData.description} />
            
            {tourData.highlights && (
              <TourHighlights highlights={tourData.highlights} />
            )}
          </div>
          
          {/* Réservation et informations complémentaires */}
          <div className="lg:col-span-1">
            <TourBookingCard 
              price={tourData.price}
              startDates={tourData.startDates}
              includes={tourData.includes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
