
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface Destination {
  name: string;
  image: string;
  description: string;
}

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Card variant="glass" className="overflow-hidden hover-scale">
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
  );
};

export default DestinationCard;
