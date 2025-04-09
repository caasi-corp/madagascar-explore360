
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDayContent } from './CalendarDayContent';
import { CalendarLegend } from './CalendarLegend';
import { BookingsList } from './BookingsList';
import { Booking } from '@/hooks/useBookingCalendar';

interface CalendarViewProps {
  currentMonth: Date;
  selectedDate: Date | undefined;
  bookingsByDate: Record<string, Booking[]>;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: Date | undefined) => void;
  showNewBookingDialog: boolean;
  setShowNewBookingDialog: (show: boolean) => void;
  viewMode: 'month' | 'week' | 'day' | 'list';
  setViewMode: (mode: 'month' | 'week' | 'day' | 'list') => void;
  onDeleteBooking: (id: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  currentMonth,
  selectedDate,
  bookingsByDate,
  onPreviousMonth,
  onNextMonth,
  onSelectDate,
  showNewBookingDialog,
  setShowNewBookingDialog,
  viewMode,
  setViewMode,
  onDeleteBooking
}) => {
  // Generate tooltips for days with bookings
  const generateTooltips = () => {
    const tooltips: { [key: string]: string } = {};
    
    Object.entries(bookingsByDate).forEach(([dateStr, dayBookings]) => {
      try {
        const formattedBookings = dayBookings.map(b => 
          `${b.client}: ${b.tour} (${b.participants} pers.)`
        ).join('\n');
        
        tooltips[dateStr] = `${dayBookings.length} réservation(s):\n${formattedBookings}`;
      } catch (error) {
        console.error("Erreur lors de la génération des tooltips:", error);
      }
    });
    
    return tooltips;
  };

  // Get booked dates
  const getBookedDates = () => {
    return Object.keys(bookingsByDate).map(dateStr => {
      try {
        return new Date(dateStr);
      } catch (error) {
        console.error("Erreur de parsing de date:", dateStr, error);
        return new Date(); // Fallback
      }
    });
  };

  // Function to get events for a specific day
  const getDayEvents = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return bookingsByDate[dateStr] || [];
  };

  // Modifiers for days with events
  const modifiers = {
    hasEvents: (date: Date) => getDayEvents(date).length > 0
  };

  // Class names for days with events
  const modifiersClassNames = {
    hasEvents: 'relative'
  };

  const tooltips = generateTooltips();
  const bookedDates = getBookedDates();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <Card className="md:col-span-8">
        <CardHeader className="pb-3 print:pb-1">
          <CalendarHeader 
            currentMonth={currentMonth}
            onPreviousMonth={onPreviousMonth}
            onNextMonth={onNextMonth}
            showNewBookingDialog={showNewBookingDialog}
            setShowNewBookingDialog={setShowNewBookingDialog}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </CardHeader>
        <CardContent>
          <div className="mb-4 print:hidden">
            <CalendarLegend />
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth => onSelectDate(setCurrentMonth)}
            className="p-3 pointer-events-auto"
            locale={fr}
            showOutsideDays={true}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            components={{
              Day: ({ date }) => <CalendarDayContent day={date} bookings={getDayEvents(date)} />
            }}
            showYearNavigation={true}
            showToday={true}
            highlightToday={true}
            weekStartsOn={1}
            showWeekNumber={true}
            tooltips={tooltips}
            bookedDates={bookedDates}
          />
        </CardContent>
      </Card>

      <BookingsList 
        selectedDate={selectedDate} 
        bookings={selectedDate ? getDayEvents(selectedDate) : []}
        onDeleteBooking={onDeleteBooking}
      />
    </div>
  );
};
