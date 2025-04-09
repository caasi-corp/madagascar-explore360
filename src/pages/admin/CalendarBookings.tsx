
import React, { useState, useEffect } from 'react';
import { 
  RefreshCw,
  Settings,
  Plus,
  Filter,
  Search,
  Download,
  Printer,
  Trash2,
  Calendar as CalendarIcon,
  LayoutGrid,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { format, addMonths, subMonths, addDays, isSameDay, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { GoogleApiConfigDialog } from '@/components/admin/api-config/GoogleApiConfigDialog';
import { useBookingCalendar } from '@/hooks/useBookingCalendar';
import { CalendarHeader } from '@/components/admin/calendar/CalendarHeader';
import { CalendarDayContent } from '@/components/admin/calendar/CalendarDayContent';
import { BookingsList } from '@/components/admin/calendar/BookingsList';
import { ApiConfigAlert } from '@/components/admin/calendar/ApiConfigAlert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { DateRange } from 'react-day-picker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookingFilters } from '@/components/admin/calendar/BookingFilters';
import { CalendarLegend } from '@/components/admin/calendar/CalendarLegend';

const CalendarBookings = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showNewBookingDialog, setShowNewBookingDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  
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

  // Filtres pour les réservations
  const [filters, setFilters] = useState({
    status: 'all',
    tour: 'all',
    minParticipants: 0,
    maxParticipants: 20,
  });

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

  const handleDeleteBooking = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setShowDeleteDialog(true);
  };

  const confirmDeleteBooking = () => {
    if (bookingToDelete) {
      // Ici, vous implémenteriez la logique de suppression réelle
      toast({
        title: "Réservation supprimée",
        description: `La réservation ${bookingToDelete} a été supprimée avec succès.`,
      });
      setShowDeleteDialog(false);
      setBookingToDelete(null);
    }
  };

  // Créer des tooltips pour les jours avec des réservations
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

  // Générer des dates pour les différents états
  const getBookedDates = () => {
    return Object.keys(bookingsByDate).map(dateStr => {
      try {
        return parseISO(dateStr);
      } catch (error) {
        console.error("Erreur de parsing de date:", dateStr, error);
        return new Date(); // Fallback
      }
    });
  };

  // Filtrer les réservations selon les critères de recherche et filtres
  const getFilteredBookings = () => {
    return bookings.filter(booking => {
      // Filtre par recherche
      const matchesSearch = searchQuery === '' || 
        booking.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtre par statut
      const matchesStatus = filters.status === 'all' || booking.status === filters.status;
      
      // Filtre par tour
      const matchesTour = filters.tour === 'all' || booking.tour === filters.tour;
      
      // Filtre par nombre de participants
      const matchesParticipants = 
        booking.participants >= filters.minParticipants && 
        booking.participants <= filters.maxParticipants;
      
      return matchesSearch && matchesStatus && matchesTour && matchesParticipants;
    });
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

  // Exporter les réservations au format CSV
  const exportCSV = () => {
    const filteredBookings = getFilteredBookings();
    const headers = "ID,Client,Tour,Date,Participants,Statut\n";
    const csvContent = filteredBookings.reduce((acc, booking) => {
      return acc + `${booking.id},${booking.client},"${booking.tour}",${booking.date},${booking.participants},${booking.status}\n`;
    }, headers);
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `reservations_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Imprimer le calendrier
  const printCalendar = () => {
    window.print();
  };

  const allTours = [...new Set(bookings.map(b => b.tour))];
  const allStatuses = [...new Set(bookings.map(b => b.status))];
  const tooltips = generateTooltips();
  const bookedDates = getBookedDates();
  const filteredBookings = getFilteredBookings();

  useEffect(() => {
    if (selectedDate) {
      const events = getDayEvents(selectedDate);
      console.log("Événements pour cette date:", events);
    }
  }, [selectedDate, bookingsByDate]);

  return (
    <div className="space-y-6 print:m-4">
      <div className="flex justify-between items-center print:hidden">
        <h1 className="text-2xl font-bold">Calendrier des Réservations</h1>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportCSV}>
                Exporter en CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={printCalendar}>
                Imprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="outline"
            size="sm" 
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
                Synchroniser
              </>
            )}
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setIsConfigOpen(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            API
          </Button>
        </div>
      </div>

      <ApiConfigAlert 
        isConfigured={isConfigured} 
        onOpenConfig={() => setIsConfigOpen(true)} 
      />

      <div className="flex items-center space-x-2 print:hidden">
        <Input
          placeholder="Rechercher client, tour, ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-accent" : ""}
        >
          <Filter className="h-4 w-4" />
        </Button>
        <Tabs defaultValue="calendar" value={activeTab} onValueChange={setActiveTab} className="ml-auto">
          <TabsList>
            <TabsTrigger value="calendar">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Calendrier
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="mr-2 h-4 w-4" />
              Liste
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {showFilters && (
        <Card className="print:hidden">
          <CardContent className="p-4">
            <BookingFilters 
              filters={filters}
              setFilters={setFilters}
              tours={allTours}
              statuses={allStatuses}
            />
          </CardContent>
        </Card>
      )}

      <TabsContent value="calendar" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-8">
            <CardHeader className="pb-3 print:pb-1">
              <CalendarHeader 
                currentMonth={currentMonth}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
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
            onDeleteBooking={handleDeleteBooking}
          />
        </div>
      </TabsContent>

      <TabsContent value="list" className="mt-0">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Liste des réservations</h3>
              <div className="flex gap-2">
                <Select 
                  value={format(dateRange.from || new Date(), 'yyyy-MM-dd')} 
                  onValueChange={(value) => setDateRange(prev => ({ ...prev, from: new Date(value) }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Date de début" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(30)].map((_, i) => {
                      const date = addDays(new Date(), i - 15);
                      return (
                        <SelectItem key={i} value={format(date, 'yyyy-MM-dd')}>
                          {format(date, 'dd MMM yyyy', { locale: fr })}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Select 
                  value={format(dateRange.to || addDays(new Date(), 7), 'yyyy-MM-dd')}
                  onValueChange={(value) => setDateRange(prev => ({ ...prev, to: new Date(value) }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Date de fin" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(30)].map((_, i) => {
                      const date = addDays(new Date(), i - 8);
                      return (
                        <SelectItem key={i} value={format(date, 'yyyy-MM-dd')}>
                          {format(date, 'dd MMM yyyy', { locale: fr })}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
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
                    filteredBookings
                      .filter(booking => {
                        // Filtrer par plage de dates
                        if (!dateRange.from || !dateRange.to) return true;
                        const bookingDate = parseISO(booking.date);
                        return bookingDate >= dateRange.from && bookingDate <= dateRange.to;
                      })
                      .map((booking, index) => (
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
                                onClick={() => handleDeleteBooking(booking.id)}
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
      </TabsContent>

      <GoogleApiConfigDialog open={isConfigOpen} onOpenChange={setIsConfigOpen} />

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDeleteBooking}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarBookings;
