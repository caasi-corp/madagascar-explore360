
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export interface ServicesProps {
  services: Service[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Nos Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des solutions de voyage complètes pour votre aventure à Madagascar
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} variant="glass" className="hover-scale">
              <CardContent className="p-6 text-center">
                <div className="mb-4 mx-auto bg-madagascar-green/10 w-16 h-16 rounded-full flex items-center justify-center glass-shimmer">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button variant="glass" asChild className="text-madagascar-green">
                  <a href={service.link}>
                    En savoir plus <ArrowRight size={16} className="ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
