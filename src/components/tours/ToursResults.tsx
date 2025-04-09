
import React from 'react';
import { Button } from '@/components/ui/button';
import TourCard from '@/components/TourCard';
import { TourProps } from '@/components/TourCard';

interface ToursResultsProps {
  filteredTours: TourProps[];
  resetFilters: () => void;
}

const ToursResults: React.FC<ToursResultsProps> = ({ filteredTours, resetFilters }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {filteredTours.length} {filteredTours.length === 1 ? 'Circuit' : 'Circuits'} Disponible{filteredTours.length > 1 ? 's' : ''}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
      
      {filteredTours.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">Aucun circuit trouvé</h3>
          <p className="text-muted-foreground mb-6">Essayez d'ajuster vos filtres ou critères de recherche.</p>
          <Button onClick={resetFilters} variant="outline">Réinitialiser les filtres</Button>
        </div>
      )}
    </div>
  );
};

export default ToursResults;
