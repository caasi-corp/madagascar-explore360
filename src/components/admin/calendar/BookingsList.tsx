
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Booking } from '@/hooks/useBookingCalendar';

interface BookingsListProps {
  selectedDate: Date | undefined;
  bookings: Booking[];
}

export const BookingsList: React.FC<BookingsListProps> = ({ selectedDate, bookings }) => {
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
              <div key={index} className="border p-3 rounded-md">
                <div className="font-medium">{booking.client}</div>
                <div className="text-sm text-muted-foreground">{booking.tour}</div>
                <div className="text-sm flex justify-between mt-1">
                  <span>{booking.participants} personnes</span>
                  <Badge>{booking.status}</Badge>
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
