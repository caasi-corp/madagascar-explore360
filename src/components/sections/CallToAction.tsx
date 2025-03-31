
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { AnimatedContainer } from '@/components/ui/animated-container';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-madagascar-green/5 to-madagascar-blue/5">
      <div className="container mx-auto text-center">
        <AnimatedContainer 
          className="backdrop-blur-md bg-white/10 dark:bg-black/30 p-8 sm:p-10 rounded-2xl max-w-4xl mx-auto overflow-hidden relative border border-white/20 shadow-xl"
          onlyWhenVisible={true}
        >
          {/* Effet de brillance */}
          <div className="absolute inset-0 w-full h-full glass-shimmer transition-opacity duration-700"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative transition-transform duration-500">
            Prêt pour Votre Aventure à Madagascar ?
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 transition-colors duration-300">
            Commencez à planifier votre voyage dès aujourd'hui et découvrez les merveilles de Madagascar avec North Gascar Tours
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <AnimatedContainer delay={200} onlyWhenVisible={true}>
              <Button 
                asChild 
                size="lg" 
                variant="glass" 
                className="bg-madagascar-green text-white transition-transform duration-300 focus:outline-none"
              >
                <a href="/tours">
                  <Calendar className="mr-2 h-5 w-5 animate-float" /> Réserver un Circuit
                </a>
              </Button>
            </AnimatedContainer>
            
            <AnimatedContainer delay={400} onlyWhenVisible={true}>
              <Button 
                asChild 
                size="lg" 
                variant="glass"
                className="bg-madagascar-blue/80 text-white transition-transform duration-300 focus:outline-none"
              >
                <a href="/contact">
                  <MapPin className="mr-2 h-5 w-5 animate-float" /> Nous Contacter
                </a>
              </Button>
            </AnimatedContainer>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default CallToAction;
