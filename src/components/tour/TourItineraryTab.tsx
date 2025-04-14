
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Define the itinerary day type
interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

const TourItineraryTab = () => {
  // Sample itinerary data
  const itinerary: ItineraryDay[] = [
    { day: 1, title: "Arrivée à Antananarivo", description: "Accueil à l'aéroport et transfert à l'hôtel. Briefing sur le circuit et temps libre pour se reposer." },
    { day: 2, title: "Départ pour Andasibe", description: "Route vers le parc national d'Andasibe. Visite nocturne pour observer les lémuriens nocturnes." },
    { day: 3, title: "Exploration du parc d'Andasibe", description: "Randonnée dans la forêt tropicale à la recherche de l'Indri Indri, le plus grand lémurien de Madagascar." },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Itinéraire jour par jour</h2>
      <div className="space-y-6">
        {itinerary.map((day) => (
          <Card key={day.day} className="overflow-hidden">
            <div className="flex">
              <div className="bg-madagascar-green text-white p-6 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-sm uppercase">Jour</span>
                  <p className="text-2xl font-bold">{day.day}</p>
                </div>
              </div>
              <CardContent className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-2">{day.title}</h3>
                <p className="text-muted-foreground">{day.description}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TourItineraryTab;
