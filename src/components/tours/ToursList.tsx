
import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import TourCard, { TourProps } from '@/components/TourCard';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface ToursListProps {
  tours: TourProps[];
  resetFilters: () => void;
}

// Using React.memo to prevent unnecessary re-renders
const ToursList: React.FC<ToursListProps> = memo(({ tours, resetFilters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 8;
  
  // Calculate pagination
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(tours.length / toursPerPage);

  // Handle page changes
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Enhance tours with missing properties if needed
  const enhancedTours = currentTours.map(tour => ({
    ...tour,
    difficulty: tour.difficulty || undefined,
    groupSize: tour.groupSize || undefined,
    language: tour.language || undefined,
    startDate: tour.startDate || undefined
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {tours.length} {tours.length === 1 ? 'Circuit' : 'Circuits'} Disponible{tours.length > 1 ? 's' : ''}
        </h2>
      </div>
      
      {tours.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {enhancedTours.map((tour) => (
              <Link to={`/tours/${tour.id}`} key={tour.id} className="block transition-transform hover:scale-[1.02]">
                <TourCard tour={tour} />
              </Link>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
                  </PaginationItem>
                )}
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => paginate(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
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
