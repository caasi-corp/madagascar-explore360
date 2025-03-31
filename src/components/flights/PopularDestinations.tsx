
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Destination {
  name: string;
  image: string;
  description: string;
}

interface PopularDestinationsProps {
  destinations: Destination[];
}

const PopularDestinations: React.FC<PopularDestinationsProps> = ({ destinations }) => {
  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Destinations Populaires</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez les destinations les plus prisées à Madagascar
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination, index) => (
          <Card key={index} variant="glass" className="overflow-hidden hover-scale">
            <div className="aspect-[16/9] relative">
              <img
                src={destination.image}
                alt={destination.name}
                className="object-cover w-full h-full"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{destination.description}</p>
              <Button variant="glass" size="sm" asChild>
                <a href="#">
                  Explorer <ArrowRight size={16} className="ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default PopularDestinations;
