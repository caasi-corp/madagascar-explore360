
import React from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, FileText, Mail, Phone } from 'lucide-react';
import { Booking } from '@/hooks/useBookingCalendar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BookingsListProps {
  selectedDate: Date | undefined;
  bookings: Booking[];
  onDeleteBooking: (bookingId: string) => void;
}

export const BookingsList: React.FC<BookingsListProps> = ({ 
  selectedDate, 
  bookings,
  onDeleteBooking
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmé':
        return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400';
      case 'en attente':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400';
      case 'annulé':
        return 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400';
    }
  };

  return (
    <Card className="md:col-span-4">
      <CardHeader>
        <CardTitle>
          {selectedDate ? (
            format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })
          ) : (
            "Sélectionnez une date"
          )}
        </CardTitle>
        <CardDescription>
          {selectedDate && bookings.length > 0 
            ? `${bookings.length} réservation(s) pour ce jour`
            : "Aucune réservation pour ce jour"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selectedDate && bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <div key={index} className="border p-4 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{booking.client}</h4>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{booking.tour}</div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="text-sm flex items-center">
                        <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>+261 34 xx xx xx</span>
                      </div>
                      <div className="text-sm flex items-center">
                        <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{booking.client.toLowerCase().replace(' ', '.')}@example.com</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">{booking.participants} participants</span>
                      <span className="mx-2">•</span>
                      <span>Réf: {booking.id}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Voir détails</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Modifier</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={() => onDeleteBooking(booking.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Supprimer</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t text-sm">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium">Montant: </span>
                      <span>{booking.participants * 50}€</span>
                    </div>
                    <div>
                      <span className="font-medium">Paiement: </span>
                      <span className="text-green-600">Complété</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {selectedDate 
              ? "Aucune réservation pour cette date" 
              : "Veuillez sélectionner une date pour voir les réservations"}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
