
import React from 'react';
import { Tour } from '@/lib/db/schema';
import TourCard from '@/components/TourCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface FeaturedToursSectionProps {
  tours: Tour[];
  loading: boolean;
  error: string | null;
}

const FeaturedToursSection: React.FC<FeaturedToursSectionProps> = ({ tours, loading, error }) => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Circuits populaires</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez Madagascar à travers nos circuits les plus appréciés, soigneusement sélectionnés pour une expérience inoubliable
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-madagascar-green"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/90 text-white">
            <a href="/tours">
              Voir tous les circuits <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToursSection;
