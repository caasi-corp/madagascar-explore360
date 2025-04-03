
import React from 'react';
import { Advantage } from '@/hooks/useAdvantages';

interface AdvantagesSectionProps {
  advantages: Advantage[];
}

const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ advantages }) => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Pourquoi Choisir North Gascar Tours</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous nous engageons à vous offrir des expériences inoubliables avec sécurité, durabilité et qualité
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center p-6 glass-card rounded-lg hover-scale">
              <div className="mx-auto mb-4 bg-madagascar-blue/10 w-16 h-16 rounded-full flex items-center justify-center glass-shimmer">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
              <p className="text-muted-foreground">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
