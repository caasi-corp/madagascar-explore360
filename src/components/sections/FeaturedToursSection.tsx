
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw } from 'lucide-react';
import TourCard from '@/components/TourCard';
import { Tour } from '@/lib/db/schema';

interface FeaturedToursSectionProps {
  tours: Tour[];
  loading?: boolean;
  onRefresh?: () => void;
}

const FeaturedToursSection: React.FC<FeaturedToursSectionProps> = ({ 
  tours, 
  loading = false,
  onRefresh 
}) => {
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
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-madagascar-green border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-lg font-medium text-madagascar-yellow">Chargement des circuits...</p>
            </div>
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">Aucun circuit disponible pour le moment</p>
            <div className="flex justify-center gap-4">
              {onRefresh && (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={onRefresh}
                >
                  <RefreshCw size={16} />
                  Actualiser les données
                </Button>
              )}
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/tours">
                  Voir tous les circuits
                </Link>
              </Button>
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
