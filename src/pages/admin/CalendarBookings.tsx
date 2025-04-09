
import React, { useState, useEffect } from 'react';
import { 
  RefreshCw,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { format, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { GoogleApiConfigDialog } from '@/components/admin/GoogleApiConfigDialog';
import { useBookingCalendar } from '@/hooks/useBookingCalendar';
import { CalendarHeader } from '@/components/admin/calendar/CalendarHeader';
import { CalendarDayContent } from '@/components/admin/calendar/CalendarDayContent';
import { BookingsList } from '@/components/admin/calendar/BookingsList';
import { ApiConfigAlert } from '@/components/admin/calendar/ApiConfigAlert';

const CalendarBookings = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showNewBookingDialog, setShowNewBookingDialog] = useState(false);
  const { toast } = useToast();
  const { 
    bookings, 
    isLoading, 
    error, 
    syncWithGoogle, 
    isSyncing,
    isConfigured,
    bookingsByDate
  } = useBookingCalendar();

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const handleSyncWithGoogle = async () => {
    try {
      await syncWithGoogle();
      toast({
        title: "Synchronisation réussie",
        description: "Le calendrier a été synchronisé avec Google Tasks",
      });
    } catch (error) {
      toast({
        title: "Erreur de synchronisation",
        description: "Une erreur s'est produite lors de la synchronisation",
        variant: "destructive",
      });
    }
  };

  // Fonction pour obtenir les événements pour un jour spécifique
  const getDayEvents = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return bookingsByDate[dateStr] || [];
  };

  // Fonction pour personnaliser l'affichage des jours avec des badges
  const modifiers = {
    hasEvents: (date: Date) => getDayEvents(date).length > 0
  };

  // Fonction pour personnaliser le contenu des cellules du calendrier
  const modifiersClassNames = {
    hasEvents: 'relative'
  };

  // Cette fonction sera utilisée pour rendre le contenu des jours après la sélection du mois
  const getDayContent = (day: Date) => {
    const events = getDayEvents(day);
    return <CalendarDayContent day={day} bookings={events} />;
  };

  useEffect(() => {
    if (selectedDate) {
      const events = getDayEvents(selectedDate);
      console.log("Événements pour cette date:", events);
    }
  }, [selectedDate, bookingsByDate]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendrier des Réservations</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleSyncWithGoogle}
            disabled={isSyncing || !isConfigured}
          >
            {isSyncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Synchronisation...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Synchroniser avec Google
              </>
            )}
          </Button>
          <Button 
            variant="outline"
            onClick={() => setIsConfigOpen(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Configuration API
          </Button>
        </div>
      </div>

      <ApiConfigAlert 
        isConfigured={isConfigured} 
        onOpenConfig={() => setIsConfigOpen(true)} 
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-8">
          <CardHeader className="pb-3">
            <CalendarHeader 
              currentMonth={currentMonth}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
              showNewBookingDialog={showNewBookingDialog}
              setShowNewBookingDialog={setShowNewBookingDialog}
            />
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="p-3 pointer-events-auto"
              locale={fr}
              showOutsideDays={true}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              components={{
                Day: ({ date }) => getDayContent(date)
              }}
            />
          </CardContent>
        </Card>

        <BookingsList 
          selectedDate={selectedDate} 
          bookings={selectedDate ? getDayEvents(selectedDate) : []} 
        />
      </div>

      <GoogleApiConfigDialog open={isConfigOpen} onOpenChange={setIsConfigOpen} />
    </div>
  );
};

export default CalendarBookings;
