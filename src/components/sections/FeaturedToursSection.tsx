
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import TourCard, { TourProps } from '@/components/TourCard';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface FeaturedToursSectionProps {
  tours: TourProps[];
  loading?: boolean;
}

const FeaturedToursSection: React.FC<FeaturedToursSectionProps> = ({ tours, loading = false }) => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Circuits et Excursions Populaires</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explorez les destinations les plus populaires de Madagascar avec nos circuits guidés
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-madagascar-green" />
            <span className="ml-2 text-madagascar-green">Chargement des circuits...</span>
          </div>
        ) : tours.length === 0 ? (
          <Alert className="mb-6">
            <AlertTitle>Aucun circuit disponible</AlertTitle>
            <AlertDescription>
              Aucun circuit mis en avant n'a été trouvé pour le moment.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            <Link to="/tours">
              Voir tous les circuits <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToursSection;
