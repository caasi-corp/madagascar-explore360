
import React from 'react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Ship, Calendar, Users, Search, ArrowRight, Navigation, Anchor, Wind, Shell, Compass, Fish, Waves, Sun } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const CatamaranCruise = () => {
  const cruiseOptions = [
    {
      id: 1,
      name: "Découverte de la Baie de Nosy Be",
      duration: "1 jour",
      description: "Explorez les eaux cristallines autour de Nosy Be à bord d'un catamaran de luxe.",
      price: 180,
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6"
    },
    {
      id: 2,
      name: "Les Îles de Mitsio",
      duration: "3 jours",
      description: "Croisière vers l'archipel de Mitsio avec plongée, pêche et détente sur des plages désertes.",
      price: 650,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
    },
    {
      id: 3,
      name: "Tour de Nosy Komba",
      duration: "2 jours",
      description: "Excursion vers l'île aux lémuriens avec nuit à bord et baignade avec les tortues marines.",
      price: 380,
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
    },
    {
      id: 4,
      name: "Expédition Radama",
      duration: "5 jours",
      description: "Aventure vers les îles Radama avec leurs récifs coralliens exceptionnels et villages de pêcheurs.",
      price: 990,
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4"
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

  const catamarans = [
    {
      id: 1,
      name: "Paradis Bleu",
      type: "Lagoon 42",
      capacity: 8,
      cabins: 4,
      length: "12.8m",
      description: "Notre catamaran le plus confortable avec 4 grandes cabines doubles et un spacieux salon extérieur.",
      features: ["Cuisine équipée", "Kayaks", "Équipement de plongée", "Paddle", "Sound system"],
      images: [
        "https://images.unsplash.com/photo-1588401273872-095b5e8b1a8c",
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166",
        "https://images.unsplash.com/photo-1542066559-83d5c27d5d6e"
      ]
    },
    {
      id: 2,
      name: "Océan Nomade",
      type: "Nautitech 40",
      capacity: 6,
      cabins: 3,
      length: "11.4m",
      description: "Catamaran rapide idéal pour les amateurs de navigations sportives et les petits groupes.",
      features: ["Générateur", "Dessalinisateur", "Wifi", "Équipement de pêche", "Toilettes électriques"],
      images: [
        "https://images.unsplash.com/photo-1563296291-14f26f10c20c",
        "https://images.unsplash.com/photo-1556216576-a2eac9d8e7b7",
        "https://images.unsplash.com/photo-1562521623-d77d771453e0"
      ]
    }
  ];

  const experiences = [
    {
      title: "Snorkeling avec les tortues",
      description: "Explorez les récifs coralliens et nagez aux côtés des tortues marines dans des eaux cristallines.",
      icon: <Fish className="h-10 w-10 text-northgascar-teal" />
    },
    {
      title: "Plages désertes",
      description: "Découvrez des plages de sable blanc immaculées accessibles uniquement par bateau.",
      icon: <Sun className="h-10 w-10 text-northgascar-teal" />
    },
    {
      title: "Villages de pêcheurs",
      description: "Rencontrez les communautés locales et découvrez leur mode de vie traditionnel.",
      icon: <Anchor className="h-10 w-10 text-northgascar-teal" />
    },
    {
      title: "Couchers de soleil",
      description: "Admirez des couchers de soleil spectaculaires depuis le pont de votre catamaran.",
      icon: <Waves className="h-10 w-10 text-northgascar-teal" />
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
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Catamarans</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des embarcations de luxe pour une expérience inoubliable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {catamarans.map((catamaran) => (
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
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <Tabs defaultValue="destinations" className="w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explorez Nos Offres</h2>
              <TabsList className="inline-flex">
                <TabsTrigger value="destinations">Destinations</TabsTrigger>
                <TabsTrigger value="experiences">Expériences</TabsTrigger>
                <TabsTrigger value="practical">Informations Pratiques</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="destinations" className="space-y-8">
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
            </TabsContent>
            
            <TabsContent value="experiences" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {experiences.map((experience, index) => (
                  <Card key={index} variant="glass" className="p-6 text-center hover-scale">
                    <CardContent className="p-0">
                      <div className="flex justify-center mb-4">
                        {experience.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
                      <p className="text-sm text-muted-foreground">{experience.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="practical" className="space-y-8">
              <Card variant="glass">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Compass className="mr-2 text-northgascar-teal" /> Quand partir ?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        La meilleure période pour une croisière en catamaran à Madagascar s'étend d'avril à novembre, pendant la saison sèche.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        De mai à octobre, vous profiterez d'un climat idéal avec des températures agréables et une mer calme, parfaite pour la navigation.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Shell className="mr-2 text-northgascar-teal" /> Que prévoir ?
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                        <li>Crème solaire (écologique si possible)</li>
                        <li>Chapeau et lunettes de soleil</li>
                        <li>Maillots de bain</li>
                        <li>Vêtements légers</li>
                        <li>Chaussures aquatiques</li>
                        <li>Appareil photo étanche</li>
                        <li>Médicaments personnels</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à Embarquer ?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Contactez-nous pour planifier votre croisière en catamaran personnalisée à Madagascar
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-northgascar-teal hover:bg-northgascar-teal/80 text-white" size="lg">
              Réserver maintenant
            </Button>
            <Button variant="outline" size="lg">
              Demander un devis
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CatamaranCruise;
