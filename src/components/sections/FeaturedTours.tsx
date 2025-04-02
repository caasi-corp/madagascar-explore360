
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import TourCard, { TourProps } from '@/components/TourCard';
import SectionHeading from './SectionHeading';

interface FeaturedToursProps {
  tours: TourProps[];
}

const FeaturedTours: React.FC<FeaturedToursProps> = ({ tours }) => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <SectionHeading 
          title="Circuits et Excursions Populaires"
          subtitle="Explorez les destinations les plus populaires de Madagascar avec nos circuits guidés"
          centered={true}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white font-sans">
            <a href="/tours">
              Voir tous les circuits <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
