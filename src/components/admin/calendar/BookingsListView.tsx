
import React from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DateRange } from 'react-day-picker';
import { CalendarDateRangeSelector } from './CalendarDateRangeSelector';
import { Booking } from '@/types/booking';

interface BookingsListViewProps {
  bookings: Booking[];
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onDeleteBooking: (id: string) => void;
}

export const BookingsListView: React.FC<BookingsListViewProps> = ({
  bookings,
  dateRange,
  onDateRangeChange,
  onDeleteBooking
}) => {
  const filteredBookings = bookings
    .filter(booking => {
      if (!dateRange.from || !dateRange.to) return true;
      const bookingDate = parseISO(booking.date);
      return bookingDate >= dateRange.from && bookingDate <= dateRange.to;
    });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Liste des réservations</h3>
          <CalendarDateRangeSelector 
            dateRange={dateRange} 
            onDateRangeChange={onDateRangeChange} 
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-2 text-left font-medium">ID</th>
                <th className="p-2 text-left font-medium">Client</th>
                <th className="p-2 text-left font-medium">Tour</th>
                <th className="p-2 text-left font-medium">Date</th>
                <th className="p-2 text-left font-medium">Participants</th>
                <th className="p-2 text-left font-medium">Statut</th>
                <th className="p-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="p-2 border-t">{booking.id}</td>
                    <td className="p-2 border-t">{booking.client}</td>
                    <td className="p-2 border-t">{booking.tour}</td>
                    <td className="p-2 border-t">
                      {format(parseISO(booking.date), 'dd/MM/yyyy')}
                    </td>
                    <td className="p-2 border-t">{booking.participants}</td>
                    <td className="p-2 border-t">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'Confirmé' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-2 border-t">
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => onDeleteBooking(booking.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-muted-foreground">
                    Aucune réservation trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
