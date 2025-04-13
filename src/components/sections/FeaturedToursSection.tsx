
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import TourCard, { TourProps } from '@/components/TourCard';

interface FeaturedToursSectionProps {
  tours: TourProps[];
}

const FeaturedToursSection: React.FC<FeaturedToursSectionProps> = ({ tours }) => {
  const isLoading = tours.length === 0;

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Circuits et Excursions Populaires</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explorez les destinations les plus populaires de Madagascar avec nos circuits guidés
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <Loader2 className="h-10 w-10 animate-spin text-madagascar-green mx-auto" />
              <p className="mt-4 text-madagascar-blue dark:text-madagascar-yellow">Chargement des circuits...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
                <Link to="/tours">
                  Voir tous les circuits <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedToursSection;
