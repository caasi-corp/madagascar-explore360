
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, Utensils, Home } from 'lucide-react';
import { Tour } from '@/lib/db/schema';

interface TourBookingSidebarProps {
  tour: Tour;
}

const TourBookingSidebar: React.FC<TourBookingSidebarProps> = ({ tour }) => {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold text-madagascar-green">
            {tour.price} €
            <span className="text-sm text-muted-foreground font-normal ml-1">/ personne</span>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <CalendarDays className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="text-sm font-medium">Durée</p>
              <p className="text-muted-foreground">{tour.duration}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="text-sm font-medium">Participants</p>
              <p className="text-muted-foreground">Min 2, Max 12</p>
            </div>
          </div>
          <div className="flex items-center">
            <Utensils className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="text-sm font-medium">Repas</p>
              <p className="text-muted-foreground">Pension complète</p>
            </div>
          </div>
          <div className="flex items-center">
            <Home className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="text-sm font-medium">Hébergement</p>
              <p className="text-muted-foreground">Hôtels 3* & Lodges</p>
            </div>
          </div>
        </div>
        
        <Button className="w-full bg-madagascar-green hover:bg-madagascar-green/90 text-white mb-3">
          Réserver maintenant
        </Button>
        
        <Button variant="outline" className="w-full">
          Demander un devis
        </Button>
      </CardContent>
    </Card>
  );
};

export default TourBookingSidebar;
