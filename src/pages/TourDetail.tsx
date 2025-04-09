
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Clock, MapPin, Star, Users, ArrowLeft, Calendar, Car, Utensils, Home, Check, Route, Info } from 'lucide-react';
import { Tour } from '@/lib/db/schema';
import { tourAPI } from '@/lib/store';
import TourCard from '@/components/TourCard';

const TourDetail = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [relatedTours, setRelatedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true);
        if (!tourId) return;
        
        console.log('Chargement du circuit avec ID:', tourId);
        const tourData = await tourAPI.getById(tourId);
        console.log('Données du circuit récupérées:', tourData);
        setTour(tourData);
        
        if (tourData?.category) {
          const related = await tourAPI.getRelated(tourId, tourData.category);
          setRelatedTours(related);
        }
      } catch (error) {
        console.error('Error fetching tour:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du circuit",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
    // Scroll to top when component mounts or tourId changes
    window.scrollTo(0, 0);
  }, [tourId, toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-madagascar-green border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-madagascar-blue dark:text-madagascar-yellow">Chargement des détails du circuit...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Circuit non trouvé</h2>
          <p className="mb-8 text-muted-foreground">Le circuit que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button asChild>
            <Link to="/tours">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux circuits
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Demonstration data
  const itinerary = [
    { day: 1, title: "Arrivée à Antananarivo", description: "Accueil à l'aéroport et transfert à l'hôtel. Briefing sur le circuit et temps libre pour se reposer." },
    { day: 2, title: "Départ pour Andasibe", description: "Route vers le parc national d'Andasibe. Visite nocturne pour observer les lémuriens nocturnes." },
    { day: 3, title: "Exploration du parc d'Andasibe", description: "Randonnée dans la forêt tropicale à la recherche de l'Indri Indri, le plus grand lémurien de Madagascar." },
  ];

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
    <div className="pt-16 pb-16">
      {/* Hero section with large image */}
      <div 
        className="relative h-[50vh] md:h-[60vh] bg-cover bg-center" 
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 py-8">
            <Button variant="outline" className="bg-white/10 backdrop-blur-sm mb-4" asChild>
              <Link to="/tours">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux circuits
              </Link>
            </Button>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-white">
              <div className="flex items-center">
                <MapPin size={18} className="mr-1" />
                <span>{tour.location}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-1" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center text-madagascar-yellow">
                <Star size={18} className="mr-1 fill-madagascar-yellow" />
                <span>{tour.rating.toFixed(1)}</span>
              </div>
              {tour.category && (
                <Badge className="bg-madagascar-yellow/80 text-madagascar-blue">{tour.category}</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left content - main information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="itinerary">Itinéraire</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className="text-muted-foreground">{tour.description}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Points forts du circuit</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-madagascar-green mr-2 mt-0.5" />
                      <span>Observation de la faune endémique de Madagascar</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-madagascar-green mr-2 mt-0.5" />
                      <span>Découverte des paysages spectaculaires et variés</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-madagascar-green mr-2 mt-0.5" />
                      <span>Rencontre avec les communautés locales</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-madagascar-green mr-2 mt-0.5" />
                      <span>Expérience culinaire malgache authentique</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="itinerary" className="space-y-6">
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
              </TabsContent>
              
              <TabsContent value="details" className="space-y-8">
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
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right sidebar - booking and details */}
          <div>
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
          </div>
        </div>
        
        {/* Related tours section */}
        {relatedTours.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Circuits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTours.map((relatedTour) => (
                <TourCard key={relatedTour.id} tour={relatedTour} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourDetail;
