
import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  RefreshCw,
  Settings,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { format, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { GoogleApiConfigDialog } from '@/components/admin/GoogleApiConfigDialog';
import { useBookingCalendar } from '@/hooks/useBookingCalendar';

const CalendarBookings = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
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
    return (
      <div className="relative w-full h-full">
        <div>{day.getDate()}</div>
        {events.length > 0 && (
          <Badge 
            className="absolute bottom-0 right-0 text-[10px] min-w-4 h-4 flex items-center justify-center" 
            variant="default"
          >
            {events.length}
          </Badge>
        )}
      </div>
    );
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

      {!isConfigured && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
              <p>L'API Google n'est pas configurée. Veuillez configurer l'API pour activer la synchronisation.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-auto border-amber-200 text-amber-600"
                onClick={() => setIsConfigOpen(true)}
              >
                Configurer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-8">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-center min-w-40">
                  {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                </CardTitle>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <DialogTrigger asChild>
                <Button className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle Réservation
                </Button>
              </DialogTrigger>
            </div>
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
                Day: ({ date, displayMonth }) => getDayContent(date)
              }}
            />
          </CardContent>
        </Card>

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
              {selectedDate && getDayEvents(selectedDate).length > 0 
                ? `${getDayEvents(selectedDate).length} réservation(s) pour ce jour`
                : "Aucune réservation pour ce jour"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate && getDayEvents(selectedDate).length > 0 ? (
              <div className="space-y-4">
                {getDayEvents(selectedDate).map((booking, index) => (
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
      </div>

      <GoogleApiConfigDialog open={isConfigOpen} onOpenChange={setIsConfigOpen} />
    </div>
  );
};

export default CalendarBookings;
