
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { bookingAPI, tourAPI, vehicleAPI } from '@/lib/store';
import { Booking, Tour, Vehicle } from '@/lib/db/schema';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, MapPin, Car, Ship, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BookingList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [tourDetails, setTourDetails] = useState<{[key: string]: Tour}>({});
  const [vehicleDetails, setVehicleDetails] = useState<{[key: string]: Vehicle}>({});

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userBookings = await bookingAPI.getByUserId(user.id);
        setBookings(userBookings);
        
        // Récupérer les détails des circuits et véhicules
        const tourIds = userBookings.filter(b => b.tour_id).map(b => b.tour_id as string);
        const vehicleIds = userBookings.filter(b => b.vehicle_id).map(b => b.vehicle_id as string);
        
        const tours: {[key: string]: Tour} = {};
        const vehicles: {[key: string]: Vehicle} = {};
        
        // Récupérer les détails des circuits
        for (const tourId of tourIds) {
          try {
            const tour = await tourAPI.getById(tourId);
            if (tour) tours[tourId] = tour;
          } catch (error) {
            console.error(`Erreur lors de la récupération du circuit ${tourId}:`, error);
          }
        }
        
        // Récupérer les détails des véhicules
        for (const vehicleId of vehicleIds) {
          try {
            const vehicle = await vehicleAPI.getById(vehicleId);
            if (vehicle) vehicles[vehicleId] = vehicle;
          } catch (error) {
            console.error(`Erreur lors de la récupération du véhicule ${vehicleId}:`, error);
          }
        }
        
        setTourDetails(tours);
        setVehicleDetails(vehicles);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos réservations",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [user, toast]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingAPI.cancel(bookingId);
      
      // Mettre à jour la liste des réservations
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'Annulé' }
          : booking
      ));
      
      toast({
        title: "Réservation annulée",
        description: "Votre réservation a été annulée avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de l'annulation de la réservation:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler votre réservation",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmé':
        return <Badge className="bg-green-500">Confirmé</Badge>;
      case 'En attente':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">En attente</Badge>;
      case 'Annulé':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const tourBookings = bookings.filter(booking => booking.tour_id);
  const vehicleBookings = bookings.filter(booking => booking.vehicle_id);
  const otherBookings = bookings.filter(booking => !booking.tour_id && !booking.vehicle_id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-madagascar-green border-r-transparent"></div>
          <p className="mt-4">Chargement de vos réservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mes réservations</h1>
        <p className="text-muted-foreground">Gérez vos réservations de circuits, véhicules et plus</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-muted/20 rounded-lg">
          <div className="mb-4">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">Aucune réservation</h3>
          <p className="mt-1 text-muted-foreground">
            Vous n'avez pas encore effectué de réservation.
          </p>
          <Button className="mt-6 bg-madagascar-green hover:bg-madagascar-green/90" asChild>
            <a href="/tours">Découvrir nos circuits</a>
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Toutes ({bookings.length})</TabsTrigger>
            <TabsTrigger value="tours">Circuits ({tourBookings.length})</TabsTrigger>
            <TabsTrigger value="vehicles">Véhicules ({vehicleBookings.length})</TabsTrigger>
            {otherBookings.length > 0 && (
              <TabsTrigger value="other">Autres ({otherBookings.length})</TabsTrigger>
            )}
          </TabsList>

          <div className="mt-6">
            <TabsContent value="all" className="space-y-4">
              {bookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  tourDetails={tourDetails} 
                  vehicleDetails={vehicleDetails} 
                  onCancel={handleCancelBooking} 
                />
              ))}
            </TabsContent>
            
            <TabsContent value="tours" className="space-y-4">
              {tourBookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  tourDetails={tourDetails} 
                  vehicleDetails={vehicleDetails} 
                  onCancel={handleCancelBooking} 
                />
              ))}
            </TabsContent>
            
            <TabsContent value="vehicles" className="space-y-4">
              {vehicleBookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  tourDetails={tourDetails} 
                  vehicleDetails={vehicleDetails} 
                  onCancel={handleCancelBooking} 
                />
              ))}
            </TabsContent>
            
            {otherBookings.length > 0 && (
              <TabsContent value="other" className="space-y-4">
                {otherBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    tourDetails={tourDetails} 
                    vehicleDetails={vehicleDetails} 
                    onCancel={handleCancelBooking} 
                  />
                ))}
              </TabsContent>
            )}
          </div>
        </Tabs>
      )}
    </div>
  );
};

interface BookingCardProps {
  booking: Booking;
  tourDetails: {[key: string]: Tour};
  vehicleDetails: {[key: string]: Vehicle};
  onCancel: (id: string) => void;
}

const BookingCard = ({ booking, tourDetails, vehicleDetails, onCancel }: BookingCardProps) => {
  const { tour_id, vehicle_id, start_date, end_date, status, total_price } = booking;
  
  let title = "Réservation";
  let image = "https://placehold.co/600x400";
  let location = "";
  let icon = <Clock className="h-5 w-5" />;
  
  // Déterminer le type de réservation et afficher les informations appropriées
  if (tour_id && tourDetails[tour_id]) {
    const tour = tourDetails[tour_id];
    title = tour.title;
    image = tour.image;
    location = tour.location;
    icon = <MapPin className="h-5 w-5" />;
  } else if (vehicle_id && vehicleDetails[vehicle_id]) {
    const vehicle = vehicleDetails[vehicle_id];
    title = `Location de ${vehicle.name}`;
    image = vehicle.image;
    icon = vehicle.type.toLowerCase().includes('bateau') ? <Ship className="h-5 w-5" /> : <Car className="h-5 w-5" />;
  }
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      return dateString;
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'Confirmé':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'En attente':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'Annulé':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div 
            className="w-full sm:w-1/4 h-48 sm:h-auto bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {icon}
                  <span className="text-sm text-muted-foreground">{location || "Réservation"}</span>
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
              </div>
              <div>
                {getStatusBadge(status)}
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Dates</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p>
                    {formatDate(start_date)}
                    {end_date && start_date !== end_date && ` - ${formatDate(end_date)}`}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Montant total</p>
                <p className="text-lg font-bold">{total_price} €</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className="text-sm">
                  {status === 'Confirmé' && 'Votre réservation est confirmée'}
                  {status === 'En attente' && 'En attente de confirmation'}
                  {status === 'Annulé' && 'Cette réservation a été annulée'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={tour_id ? `/tours/${tour_id}` : vehicle_id ? `/vehicles/${vehicle_id}` : '#'}>
                    Détails
                  </a>
                </Button>
                {status !== 'Annulé' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onCancel(booking.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Annuler
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingList;
