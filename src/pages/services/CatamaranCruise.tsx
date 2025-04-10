
import React from 'react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Ship, Calendar, Users, Search, ArrowRight, Navigation, Anchor, Wind } from 'lucide-react';

const CatamaranCruise = () => {
  const cruiseOptions = [
    {
      id: 1,
      name: "Découverte de la Baie de Nosy Be",
      duration: "1 jour",
      description: "Explorez les eaux cristallines autour de Nosy Be à bord d'un catamaran de luxe."
    },
    {
      id: 2,
      name: "Les Îles de Mitsio",
      duration: "3 jours",
      description: "Croisière vers l'archipel de Mitsio avec plongée, pêche et détente sur des plages désertes."
    },
    {
      id: 3,
      name: "Tour de Nosy Komba",
      duration: "2 jours",
      description: "Excursion vers l'île aux lémuriens avec nuit à bord et baignade avec les tortues marines."
    },
    {
      id: 4,
      name: "Expédition Radama",
      duration: "5 jours",
      description: "Aventure vers les îles Radama avec leurs récifs coralliens exceptionnels et villages de pêcheurs."
    }
  ];
  
  const destinations = [
    {
      name: "Nosy Be",
      image: "https://images.unsplash.com/photo-1590523278191-304df6c77268",
      description: "L'île parfumée, point de départ de toutes nos croisières"
    },
    {
      name: "Archipel de Mitsio",
      image: "https://images.unsplash.com/photo-1465447142348-e9952c393450",
      description: "Un paradis de biodiversité marine aux eaux turquoise"
    },
    {
      name: "Nosy Komba",
      image: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c",
      description: "L'île aux lémuriens avec ses plages sauvages"
    },
    {
      name: "Îles Radama",
      image: "https://images.unsplash.com/photo-1562523331-9ddcaeda6477",
      description: "Archipel préservé aux eaux cristallines et à la biodiversité exceptionnelle"
    }
  ];

  return (
    <>
      <Hero
        title="Croisières en Catamaran à Madagascar"
        subtitle="Explorez les îles paradisiaques de Madagascar à bord de nos catamarans de luxe"
        showSearch={false}
        height="h-[60vh]"
        backgroundImage="https://images.unsplash.com/photo-1540541338287-41700207dee6"
      />

      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="glass-card p-8 rounded-xl mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cruise" variant="glass">Type de Croisière</Label>
                    <div className="relative">
                      <Ship className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <select id="cruise" className="glass-input w-full h-10 pl-10 rounded-md">
                        <option value="">Sélectionnez une croisière</option>
                        <option value="day">Croisière à la journée</option>
                        <option value="weekend">Week-end en mer</option>
                        <option value="week">Expédition d'une semaine</option>
                        <option value="custom">Sur mesure</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination" variant="glass">Destination</Label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <select id="destination" className="glass-input w-full h-10 pl-10 rounded-md">
                        <option value="">Choisir une destination</option>
                        <option value="nosy-be">Nosy Be</option>
                        <option value="mitsio">Archipel de Mitsio</option>
                        <option value="nosy-komba">Nosy Komba</option>
                        <option value="radama">Îles Radama</option>
                      </select>
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
                    <Label htmlFor="duration" variant="glass">Durée</Label>
                    <div className="relative">
                      <Anchor className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <select id="duration" className="glass-input w-full h-10 pl-10 rounded-md">
                        <option value="1">1 jour</option>
                        <option value="2">2 jours</option>
                        <option value="3">3 jours</option>
                        <option value="5">5 jours</option>
                        <option value="7">7 jours</option>
                        <option value="custom">Durée personnalisée</option>
                      </select>
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
                        defaultValue="2"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cabin" variant="glass">Cabines</Label>
                    <div className="relative">
                      <Wind className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <select id="cabin" className="glass-input w-full h-10 pl-10 rounded-md">
                        <option value="shared">Partagée</option>
                        <option value="private">Privée</option>
                        <option value="luxury">Luxe</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-4 flex items-end">
                <Button className="w-full bg-northgascar-teal hover:bg-northgascar-teal/80">
                  <Search size={18} className="mr-2" /> Rechercher des croisières
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Croisières en Catamaran</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez Madagascar autrement avec nos croisières exclusives en catamaran
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cruiseOptions.map((cruise) => (
              <Card key={cruise.id} variant="glass" className="p-6 text-center hover-scale">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">
                    <Ship size={48} className="text-northgascar-teal" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cruise.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Durée: {cruise.duration}</p>
                  <p className="text-sm text-muted-foreground mb-4">{cruise.description}</p>
                  <Button variant="outline" size="sm">
                    Voir les détails
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
              Les plus beaux spots à explorer en catamaran à Madagascar
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

export default CatamaranCruise;
