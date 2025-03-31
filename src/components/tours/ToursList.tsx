
import React, { memo } from 'react';
import TourCard, { TourProps } from '@/components/TourCard';
import { Button } from '@/components/ui/button';

interface ToursListProps {
  tours: TourProps[];
  resetFilters: () => void;
}

// Using React.memo to prevent unnecessary re-renders
const ToursList: React.FC<ToursListProps> = memo(({ tours, resetFilters }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {tours.length} {tours.length === 1 ? 'Circuit' : 'Circuits'} Disponible{tours.length > 1 ? 's' : ''}
        </h2>
      </div>
      
      {tours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">Aucun circuit trouvé</h3>
          <p className="text-muted-foreground mb-6">Essayez d'ajuster vos filtres ou critères de recherche.</p>
          <Button onClick={resetFilters} variant="outline">Réinitialiser les filtres</Button>
        </div>
      )}
    </div>
  );
});

ToursList.displayName = 'ToursList';

export default ToursList;
