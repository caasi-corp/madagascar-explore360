
import React from 'react';
import FlightCard from './FlightCard';
import { Flight } from '@/lib/db/schema';
import { Skeleton } from '@/components/ui/skeleton';

interface FlightsListProps {
  flights: Flight[];
  isLoading?: boolean;
}

const FlightsList: React.FC<FlightsListProps> = ({ flights, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-lg font-medium mb-2">Aucun vol trouvé</p>
        <p className="text-muted-foreground">Veuillez ajuster vos critères de recherche ou changer de date.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
};

export default FlightsList;
