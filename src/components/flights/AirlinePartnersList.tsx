
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';

interface Airline {
  id: number;
  name: string;
  logo: string;
  destinations: string[];
}

interface AirlinePartnersListProps {
  airlines: Airline[];
}

const AirlinePartnersList: React.FC<AirlinePartnersListProps> = ({ airlines }) => {
  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Compagnies Aériennes Partenaires</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Nous collaborons avec les principales compagnies aériennes pour vous offrir les meilleurs tarifs
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {airlines.map((airline) => (
          <Card key={airline.id} variant="glass" className="p-6 text-center hover-scale">
            <CardContent className="p-0">
              <div className="flex justify-center mb-4">
                <Plane size={48} className="text-northgascar-teal" />
              </div>
              <h3 className="text-xl font-bold mb-2">{airline.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">Destinations: {airline.destinations.join(", ")}</p>
              <Button variant="outline" size="sm">
                Voir les offres
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AirlinePartnersList;
