
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import TourCard, { TourProps } from '@/components/TourCard';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { optimizeImageUrl } from '@/lib/imageOptimizer';
import { Skeleton } from '@/components/ui/skeleton';

interface FeaturedToursProps {
  tours: TourProps[];
}

const FeaturedTours: React.FC<FeaturedToursProps> = ({ tours }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simuler un chargement progressif
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Optimiser les URL d'images
  const optimizedTours = tours.map(tour => ({
    ...tour,
    image: optimizeImageUrl(tour.image)
  }));
  
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <AnimatedContainer className="text-center mb-10" onlyWhenVisible={true}>
          <div className="inline-flex items-center gap-2 text-madagascar-yellow font-medium mb-3">
            <Sparkles className="h-5 w-5" />
            <span>DÉCOUVREZ NOS CIRCUITS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Circuits et Excursions Populaires</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explorez les destinations les plus populaires de Madagascar avec nos circuits guidés
          </p>
        </AnimatedContainer>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Afficher des skeletons pendant le chargement
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          ) : (
            // Afficher les tours une fois chargés
            optimizedTours.map((tour, index) => (
              <AnimatedContainer 
                key={tour.id} 
                className="hover-scale" 
                delay={100 * (index + 1)}
                onlyWhenVisible={true}
                style={{ animationFillMode: 'both' }}
              >
                <TourCard 
                  tour={tour} 
                  animationIndex={index}
                />
              </AnimatedContainer>
            ))
          )}
        </div>
        
        <AnimatedContainer className="mt-10 text-center" delay={600} onlyWhenVisible={true}>
          <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white group">
            <a href="/tours" className="flex items-center">
              Voir tous les circuits 
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default FeaturedTours;
