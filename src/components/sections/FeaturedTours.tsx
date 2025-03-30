
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import TourCard, { TourProps } from '@/components/TourCard';
import { useSequentialAnimation } from '@/lib/animation';

interface FeaturedToursProps {
  tours: TourProps[];
}

const FeaturedTours: React.FC<FeaturedToursProps> = ({ tours }) => {
  // Utilisation d'animations séquentielles pour les cartes
  const animationItems = useSequentialAnimation(tours.length, 150);
  
  // État pour l'animation du titre
  const [titleVisible, setTitleVisible] = useState(false);
  
  // Observer pour déclencher l'animation au défilement
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const sectionElement = document.getElementById('featured-tours-section');
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  return (
    <section id="featured-tours-section" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className={`text-center mb-10 transition-all duration-1000 ${titleVisible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 text-madagascar-yellow font-medium mb-3">
            <Sparkles className="h-5 w-5" />
            <span>DÉCOUVREZ NOS CIRCUITS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Circuits et Excursions Populaires</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explorez les destinations les plus populaires de Madagascar avec nos circuits guidés
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour, index) => (
            <TourCard 
              key={tour.id} 
              tour={tour} 
              animationIndex={index}
            />
          ))}
        </div>
        
        <div className={`mt-10 text-center transition-all duration-1000 delay-500 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white group">
            <a href="/tours" className="flex items-center">
              Voir tous les circuits 
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
