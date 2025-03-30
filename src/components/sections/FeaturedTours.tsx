
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import TourCard, { TourProps } from '@/components/TourCard';

interface FeaturedToursProps {
  tours: TourProps[];
}

const FeaturedTours: React.FC<FeaturedToursProps> = ({ tours }) => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Popular Tours & Excursions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore Madagascar's most popular destinations with our guided tours
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            <a href="/tours">
              View All Tours <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
