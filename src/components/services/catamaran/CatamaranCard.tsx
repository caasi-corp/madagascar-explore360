
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface Catamaran {
  id: number;
  name: string;
  type: string;
  capacity: number;
  cabins: number;
  length: string;
  description: string;
  features: string[];
  images: string[];
}

interface CatamaranCardProps {
  catamaran: Catamaran;
}

const CatamaranCard: React.FC<CatamaranCardProps> = ({ catamaran }) => {
  return (
    <Card key={catamaran.id} variant="glass" className="overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {catamaran.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-[16/9] relative">
                <img
                  src={image}
                  alt={`${catamaran.name} - vue ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2" />
        <CarouselNext className="absolute right-2" />
      </Carousel>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2">{catamaran.name}</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Type</p>
            <p className="font-medium">{catamaran.type}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Capacité</p>
            <p className="font-medium">{catamaran.capacity} pers.</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Cabines</p>
            <p className="font-medium">{catamaran.cabins}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{catamaran.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {catamaran.features.map((feature, index) => (
            <span key={index} className="text-xs bg-northgascar-teal/10 text-northgascar-teal px-2 py-1 rounded-full">
              {feature}
            </span>
          ))}
        </div>
        <Button className="w-full bg-northgascar-teal hover:bg-northgascar-teal/80">
          Réserver ce catamaran
        </Button>
      </CardContent>
    </Card>
  );
};

export default CatamaranCard;
