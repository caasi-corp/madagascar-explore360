
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useHotels } from '@/hooks/useHotels';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Check, 
  ChevronLeft, 
  Calendar, 
  Users, 
  CreditCard 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getHotelById } = useHotels();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const hotel = getHotelById(id || '');

  if (!hotel) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Hôtel non trouvé</h2>
        <p className="mb-8">L'hôtel que vous recherchez n'existe pas ou a été supprimé.</p>
        <Button asChild>
          <Link to="/hotels">Retour aux hôtels</Link>
        </Button>
      </div>
    );
  }

  // Fonction pour afficher les étoiles
  const renderStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      ));
  };

  const handleBookNow = () => {
    toast({
      title: "Redirection vers la réservation",
      description: "Vous allez être redirigé vers la page de réservation de cet hôtel.",
    });
    
    setTimeout(() => {
      navigate(`/hotels/${id}/book`);
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild className="mb-4">
          <Link to="/hotels">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Retour aux hôtels
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex mr-3">
                {renderStars(hotel.stars)}
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hotel.location}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge className="text-lg px-3 py-1">
              {hotel.pricePerNight}€ / nuit
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden h-80 mb-6">
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>À propos de cet hôtel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Profitez d'un séjour exceptionnel au {hotel.name}, idéalement situé à {hotel.location}. 
                Notre établissement {hotel.stars} étoiles vous offre un confort optimal et un service 
                de qualité pour rendre votre séjour à Madagascar inoubliable.
              </p>
              
              <Separator className="my-6" />
              
              <h3 className="text-lg font-semibold mb-4">Équipements et services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hotel.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emplacement</CardTitle>
              <CardDescription>
                {hotel.name} est situé à {hotel.location}, Madagascar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted aspect-video rounded-md flex items-center justify-center">
                <MapPin className="h-12 w-12 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Carte non disponible</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Réserver votre séjour</CardTitle>
              <CardDescription>
                Effectuez votre réservation en quelques clics
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Sélectionnez vos dates</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-sm text-muted-foreground">Arrivée</span>
                  <input
                    type="date"
                    className="w-full mt-1 p-2 border rounded-md"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Départ</span>
                  <input
                    type="date"
                    className="w-full mt-1 p-2 border rounded-md"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Voyageurs</span>
              </div>
              
              <div className="flex items-center justify-between border p-2 rounded-md">
                <span>Adultes</span>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" className="h-8 w-8">-</Button>
                  <span className="w-8 text-center">2</span>
                  <Button variant="outline" size="icon" className="h-8 w-8">+</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between border p-2 rounded-md">
                <span>Enfants</span>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" className="h-8 w-8">-</Button>
                  <span className="w-8 text-center">0</span>
                  <Button variant="outline" size="icon" className="h-8 w-8">+</Button>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex justify-between mb-2">
                  <span>{hotel.pricePerNight}€ x 3 nuits</span>
                  <span>{hotel.pricePerNight * 3}€</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes et frais</span>
                  <span>{Math.round(hotel.pricePerNight * 3 * 0.1)}€</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{hotel.pricePerNight * 3 + Math.round(hotel.pricePerNight * 3 * 0.1)}€</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full bg-madagascar-green hover:bg-madagascar-green/80"
                onClick={handleBookNow}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Réserver maintenant
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
