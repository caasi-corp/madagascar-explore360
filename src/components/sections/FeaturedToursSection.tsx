
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import TourCard, { TourProps } from '@/components/TourCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface FeaturedToursSectionProps {
  tours: TourProps[];
  isLoading?: boolean;
  error?: string | null;
}

const FeaturedToursSection: React.FC<FeaturedToursSectionProps> = ({ 
  tours, 
  isLoading = false,
  error = null 
}) => {
  
  if (isLoading) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-4">Chargement des circuits en vedette...</p>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto py-8">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              {error}. Veuillez réessayer plus tard.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }
  
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Circuits et Excursions Populaires</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explorez les destinations les plus populaires de Madagascar avec nos circuits guidés
          </p>
        </div>
        
        {tours.length === 0 ? (
          <div className="text-center py-8">
            <p>Aucun circuit en vedette pour le moment.</p>
          </div>
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
