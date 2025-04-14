
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Info, Users, Calendar, Route, Car } from 'lucide-react';

const TourDetailsTab = () => {
  // Sample data for includes and excludes
  const includes = [
    "Transport en véhicule 4x4",
    "Guide francophone",
    "Hébergement en hôtels de catégorie moyenne",
    "Repas (petit-déjeuner, déjeuner, dîner)",
    "Entrées dans les parcs nationaux",
    "Excursions mentionnées dans l'itinéraire"
  ];

  const excludes = [
    "Vols internationaux",
    "Visa d'entrée à Madagascar",
    "Assurance voyage",
    "Boissons",
    "Pourboires",
    "Dépenses personnelles"
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Check className="h-5 w-5 text-madagascar-green mr-2" />
            Ce qui est inclus
          </h3>
          <ul className="space-y-2">
            {includes.map((item, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-madagascar-green mr-2 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Info className="h-5 w-5 text-madagascar-blue mr-2" />
            Ce qui n'est pas inclus
          </h3>
          <ul className="space-y-2">
            {excludes.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="rounded-full h-5 w-5 border border-madagascar-blue flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-madagascar-blue text-xs">✕</span>
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Informations importantes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-muted/40">
            <CardContent className="p-4 flex items-center">
              <Users className="h-6 w-6 text-madagascar-green mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Taille du groupe</p>
                <p className="font-semibold">4-12 personnes</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/40">
            <CardContent className="p-4 flex items-center">
              <Calendar className="h-6 w-6 text-madagascar-green mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Meilleure période</p>
                <p className="font-semibold">Avril-Octobre</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/40">
            <CardContent className="p-4 flex items-center">
              <Route className="h-6 w-6 text-madagascar-green mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="font-semibold">350 km</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/40">
            <CardContent className="p-4 flex items-center">
              <Car className="h-6 w-6 text-madagascar-green mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Transport</p>
                <p className="font-semibold">4x4 et minibus</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsTab;
