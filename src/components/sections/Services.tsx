
import React from 'react';
import { AnimatedContainer } from '@/components/ui/animated-container';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

interface ServicesProps {
  services: Service[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <AnimatedContainer
          className="text-center mb-10"
          onlyWhenVisible={true}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Nos Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment nous pouvons faciliter votre aventure à Madagascar
          </p>
        </AnimatedContainer>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <AnimatedContainer
              key={service.title}
              className="bg-card hover:bg-card/80 rounded-lg p-6 text-center hover-scale transition-all duration-300 shadow-sm hover:shadow-md"
              delay={index * 150}
              onlyWhenVisible={true}
            >
              <div className="mx-auto mb-4 bg-madagascar-green/10 w-16 h-16 rounded-full flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <a 
                href={service.link}
                className="text-madagascar-green hover:text-madagascar-green/80 font-medium inline-flex items-center"
              >
                En savoir plus →
              </a>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
