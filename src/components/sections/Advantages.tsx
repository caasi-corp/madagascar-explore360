
import React from 'react';
import SectionHeading from './SectionHeading';

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
        <SectionHeading 
          title="Pourquoi Choisir North Gascar Tours"
          subtitle="Nous nous engageons à vous offrir des expériences inoubliables avec sécurité, durabilité et qualité"
          centered={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center p-6 glass-card rounded-lg hover-scale">
              <div className="mx-auto mb-4 bg-madagascar-blue/10 w-16 h-16 rounded-full flex items-center justify-center glass-shimmer">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{advantage.title}</h3>
              <p className="text-muted-foreground font-sans">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
