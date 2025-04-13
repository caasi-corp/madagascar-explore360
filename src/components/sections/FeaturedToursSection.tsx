
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw, DatabaseBackup } from 'lucide-react';
import TourCard from '@/components/TourCard';
import { Tour } from '@/lib/db/schema';

interface FeaturedToursSectionProps {
  tours: Tour[];
  loading?: boolean;
  onRefresh?: () => void;
  onReset?: () => void;
  error?: Error | null;
}

const FeaturedToursSection: React.FC<FeaturedToursSectionProps> = ({ 
  tours, 
  loading = false,
  onRefresh,
  onReset,
  error = null
}) => {
  // Count how long we've been loading
  const [loadingTime, setLoadingTime] = React.useState(0);
  
  React.useEffect(() => {
    let interval: number | undefined;
    
    // If we're loading, start a timer to track how long
    if (loading) {
      interval = window.setInterval(() => {
        setLoadingTime(prev => prev + 1);
      }, 1000);
    } else {
      setLoadingTime(0);
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [loading]);

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
          <div className="flex flex-col justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-madagascar-green border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-lg font-medium text-madagascar-yellow">Chargement des circuits...</p>
              
              {/* Show options to refresh or reset after waiting for a while */}
              {loadingTime > 5 && (
                <div className="mt-8 space-y-4">
                  <p className="text-muted-foreground">
                    Le chargement prend plus de temps que prévu...
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
                    {onRefresh && (
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={onRefresh}
                      >
                        <RefreshCw size={16} />
                        Actualiser
                      </Button>
                    )}
                    
                    {onReset && (
                      <Button 
                        variant="secondary" 
                        className="flex items-center gap-2"
                        onClick={onReset}
                      >
                        <DatabaseBackup size={16} />
                        Réinitialiser la base de données
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-lg text-muted-foreground mb-4">Problème lors du chargement des circuits</p>
            <p className="text-sm text-red-500 mb-6">{error.message}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {onRefresh && (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={onRefresh}
                >
                  <RefreshCw size={16} />
                  Réessayer
                </Button>
              )}
              {onReset && (
                <Button 
                  variant="secondary" 
                  className="flex items-center gap-2"
                  onClick={onReset}
                >
                  <DatabaseBackup size={16} />
                  Réinitialiser la base de données
                </Button>
              )}
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
              {onReset && (
                <Button 
                  variant="secondary" 
                  className="flex items-center gap-2"
                  onClick={onReset}
                >
                  <DatabaseBackup size={16} />
                  Réinitialiser la base de données
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
