
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import TourCard, { TourProps } from '@/components/TourCard';
import { optimizeImageUrl } from '@/lib/imageOptimizer';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

interface FeaturedToursProps {
  tours: TourProps[];
}

const FeaturedTours: React.FC<FeaturedToursProps> = ({ tours }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const [displayCount, setDisplayCount] = useState(4);
  
  useEffect(() => {
    // Nombre de tours à afficher en fonction de la taille de l'écran
    if (isMobile) {
      setDisplayCount(2);
    } else {
      setDisplayCount(4);
    }
    
    // Simuler un chargement progressif
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isMobile]);
  
  // Ajouter des détails supplémentaires aux tours pour l'affichage
  const enhancedTours = tours.map(tour => ({
    ...tour,
    image: optimizeImageUrl(tour.image),
    groupSize: tour.groupSize || Math.floor(Math.random() * 10) + 5,
    difficulty: tour.difficulty || ['Facile', 'Modéré', 'Difficile'][Math.floor(Math.random() * 3)] as 'Facile' | 'Modéré' | 'Difficile',
    language: tour.language || ['Français', 'Anglais', 'Malgache'].slice(0, Math.floor(Math.random() * 3) + 1),
    startDate: tour.startDate || new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')
  }));
  
  // Prendre seulement le nombre de tours à afficher
  const toursToDisplay = enhancedTours.slice(0, displayCount);
  
  if (tours.length === 0) {
    return null;
  }
  
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-madagascar-yellow font-medium mb-3">
            <Sparkles className="h-5 w-5" />
            <span>DÉCOUVREZ NOS CIRCUITS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Circuits et Excursions Populaires</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explorez les destinations les plus populaires de Madagascar avec nos circuits guidés
          </p>
        </div>
        
        {isLoading ? (
          // Afficher des skeletons pendant le chargement
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(isMobile ? 2 : 4).fill(0).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          // Afficher les tours une fois chargés
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toursToDisplay.map((tour, index) => (
              <div key={tour.id}>
                <TourCard 
                  tour={tour} 
                  animationIndex={index}
                />
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            <a href="/tours">
              Voir tous les circuits 
              <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
