
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface CruiseOption {
  id: number;
  name: string;
  duration: string;
  description: string;
  price: number;
  image: string;
}

interface CruiseCardProps {
  cruise: CruiseOption;
}

const CruiseCard: React.FC<CruiseCardProps> = ({ cruise }) => {
  return (
    <Card key={cruise.id} variant="glass" className="overflow-hidden hover-scale">
      <div className="aspect-[16/9] relative">
        <img
          src={cruise.image}
          alt={cruise.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{cruise.name}</h3>
        <p className="text-sm text-muted-foreground mb-1">Durée: {cruise.duration}</p>
        <p className="text-sm text-muted-foreground mb-3">{cruise.description}</p>
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">{cruise.price} €<span className="text-sm font-normal">/pers</span></p>
          <Button variant="outline" size="sm">
            Voir les détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CruiseCard;
