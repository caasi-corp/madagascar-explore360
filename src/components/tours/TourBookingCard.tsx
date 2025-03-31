
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TourBookingCardProps {
  price: number;
  startDates?: string[];
  includes?: string[];
}

const TourBookingCard: React.FC<TourBookingCardProps> = ({ 
  price, 
  startDates, 
  includes 
}) => {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="text-3xl font-bold mb-6">€{price} <span className="text-base font-normal text-muted-foreground">/ personne</span></div>
        
        {startDates && startDates.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Dates de départ
            </h3>
            <div className="space-y-2">
              {startDates.map((date, index) => (
                <div 
                  key={index}
                  className="border rounded-md p-3 cursor-pointer hover:border-madagascar-green transition-colors"
                >
                  {date}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {includes && includes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Ce qui est inclus</h3>
            <ul className="space-y-2">
              {includes.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Button className="w-full">Réserver maintenant</Button>
      </CardContent>
    </Card>
  );
};

export default TourBookingCard;
