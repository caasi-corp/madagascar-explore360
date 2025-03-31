
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import TourCard, { TourProps } from '@/components/TourCard';
import { AnimatedContainer } from '@/components/ui/animated-container';

interface FeaturedToursProps {
  tours: TourProps[];
}

const FeaturedTours: React.FC<FeaturedToursProps> = ({ tours }) => {
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
          {tours.map((tour, index) => (
            <AnimatedContainer 
              key={tour.id} 
              className="hover-scale" 
              delay={200 * (index + 1)}
              onlyWhenVisible={true}
              style={{ animationFillMode: 'both' }}
            >
              <TourCard 
                tour={tour} 
                animationIndex={index}
              />
            </AnimatedContainer>
          ))}
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
