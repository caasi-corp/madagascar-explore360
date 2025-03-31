
import React from 'react';
import { AnimatedContainer } from '@/components/ui/animated-container';

interface Advantage {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface AdvantagesProps {
  advantages: Advantage[];
}

const Advantages: React.FC<AdvantagesProps> = ({ advantages }) => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <AnimatedContainer className="text-center mb-10" onlyWhenVisible={true}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Pourquoi Choisir North Gascar Tours</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous nous engageons à vous offrir des expériences inoubliables avec sécurité, durabilité et qualité
          </p>
        </AnimatedContainer>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <AnimatedContainer 
              key={index} 
              className="text-center p-6 glass-card rounded-lg"
              delay={index * 200}
              onlyWhenVisible={true}
            >
              <div className="mx-auto mb-4 bg-madagascar-blue/10 w-16 h-16 rounded-full flex items-center justify-center glass-shimmer">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
              <p className="text-muted-foreground">{advantage.description}</p>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
