
import React from 'react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Plane, PlaneTakeoff, PlaneLanding, Calendar, Users, Search, ArrowRight } from 'lucide-react';

const FlightBooking = () => {
  const airlines = [
    {
      id: 1,
      name: "Air Madagascar",
      logo: "/lovable-uploads/f8c8f079-7776-45ac-a077-6570cfbb7fcf.png", // Replace with actual airline logo
      destinations: ["Antananarivo", "Nosy Be", "Toamasina", "Antsiranana"]
    },
    {
      id: 2,
      name: "Air France",
      logo: "/lovable-uploads/f8c8f079-7776-45ac-a077-6570cfbb7fcf.png", // Replace with actual airline logo
      destinations: ["Paris", "Antananarivo", "Reunion"]
    },
    {
      id: 3,
      name: "Ethiopian Airlines",
      logo: "/lovable-uploads/f8c8f079-7776-45ac-a077-6570cfbb7fcf.png", // Replace with actual airline logo
      destinations: ["Addis Ababa", "Antananarivo", "Nosy Be"]
    },
    {
      id: 4,
      name: "Kenya Airways",
      logo: "/lovable-uploads/f8c8f079-7776-45ac-a077-6570cfbb7fcf.png", // Replace with actual airline logo
      destinations: ["Nairobi", "Antananarivo"]
    }
  ];
  
  const destinations = [
    {
      name: "Antananarivo",
      image: "https://images.unsplash.com/photo-1562523331-9ddcaeda6477",
      description: "La capitale dynamique et historique de Madagascar"
    },
    {
      name: "Nosy Be",
      image: "https://images.unsplash.com/photo-1590523278191-304df6c77268",
      description: "L'île parfumée avec ses plages paradisiaques"
    },
    {
      name: "Toamasina",
      image: "https://images.unsplash.com/photo-1465447142348-e9952c393450",
      description: "Le principal port maritime de Madagascar"
    },
    {
      name: "Antsiranana",
      image: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c",
      description: "L'extrême nord de Madagascar avec sa baie spectaculaire"
    }
  ];

  return (
    <>
      <Hero
        title="Réservation de Vols pour Madagascar"
        subtitle="Trouvez les meilleurs tarifs pour vos vols internationaux et domestiques"
        showSearch={false}
        height="h-[60vh]"
        backgroundImage="https://images.unsplash.com/photo-1494059980473-813e73ee784b"
      />

      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="glass-card p-8 rounded-xl mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="departure" variant="glass">Départ</Label>
                    <div className="relative">
                      <PlaneTakeoff className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="departure"
                        placeholder="Ville de départ"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrival" variant="glass">Arrivée</Label>
                    <div className="relative">
                      <PlaneLanding className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="arrival"
                        placeholder="Ville d'arrivée"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departure-date" variant="glass">Date de départ</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="departure-date"
                        type="date"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="return-date" variant="glass">Date de retour</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="return-date"
                        type="date"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passengers" variant="glass">Passagers</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="passengers"
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class" variant="glass">Classe</Label>
                    <select id="class" className="glass-input w-full h-10 px-3 rounded-md">
                      <option value="economy">Économique</option>
                      <option value="premium">Premium Economy</option>
                      <option value="business">Business</option>
                      <option value="first">Première</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full bg-northgascar-teal hover:bg-northgascar-teal/80">
                  <Search size={18} className="mr-2" /> Rechercher des vols
                </Button>
              </div>
            </div>
          </div>
          
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
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
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
        </div>
      </section>
    </>
  );
};

export default FlightBooking;
