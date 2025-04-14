
import React from 'react';
import TourCard from '@/components/TourCard';
import { Tour } from '@/lib/db/schema';

interface RelatedToursProps {
  tours: Tour[];
}

const RelatedTours: React.FC<RelatedToursProps> = ({ tours }) => {
  if (tours.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Circuits similaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default RelatedTours;
