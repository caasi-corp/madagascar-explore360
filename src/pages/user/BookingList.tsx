
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Simulated booking data for the user
const mockUserBookings = [
  {
    id: 'B1234',
    tourName: 'Avenue des Baobabs',
    date: '15 Août 2023',
    duration: '3 jours',
    participants: 2,
    price: 599,
    status: 'Confirmé',
    location: 'Morondava',
    image: '/placeholder.svg',
  },
  {
    id: 'B1235',
    tourName: 'Parc National d\'Andasibe',
    date: '22 Septembre 2023',
    duration: '2 jours',
    participants: 4,
    price: 459,
    status: 'Terminé',
    location: 'Andasibe',
    image: '/placeholder.svg',
  },
  {
    id: 'B1236',
    tourName: 'Île de Nosy Be',
    date: '10 Octobre 2023',
    duration: '5 jours',
    participants: 2,
    price: 899,
    status: 'En attente',
    location: 'Nosy Be',
    image: '/placeholder.svg',
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmé':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'En attente':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Terminé':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'Annulé':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const BookingList: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Mes Réservations</h1>
        <p className="text-muted-foreground">
          Consultez et gérez toutes vos réservations de circuits et services
        </p>
      </div>
      
      {mockUserBookings.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-muted p-3 mb-4">
              <CalendarDays className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Aucune réservation trouvée</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              Vous n'avez encore aucune réservation. Explorez nos circuits pour planifier votre prochaine aventure à Madagascar.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {mockUserBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-1/4 h-48 sm:h-auto">
                  <img 
                    src={booking.image}
                    alt={booking.tourName}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-6">
                  <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{booking.tourName}</h3>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin size={16} className="mr-1" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                    <Badge className={`self-start ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{booking.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Durée</p>
                      <p className="font-medium">{booking.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Participants</p>
                      <p className="font-medium">{booking.participants} personnes</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t">
                    <div className="font-bold text-lg mb-2 sm:mb-0">
                      {booking.price} €
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button className="px-4 py-2 text-sm border rounded hover:bg-accent w-full sm:w-auto">
                        Détails
                      </button>
                      {booking.status === 'En attente' && (
                        <button className="px-4 py-2 text-sm bg-northgascar-teal text-white rounded hover:bg-northgascar-teal/80 w-full sm:w-auto">
                          Payer
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
