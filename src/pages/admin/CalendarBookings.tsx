import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { format, addMonths, subMonths, addDays } from 'date-fns';
import { GoogleApiConfigDialog } from '@/components/admin/api-config/GoogleApiConfigDialog';
import { useBookingCalendar } from '@/hooks/useBookingCalendar';
import { ApiConfigAlert } from '@/components/admin/calendar/ApiConfigAlert';
import { DateRange } from 'react-day-picker';
import { CalendarToolbar } from '@/components/admin/calendar/CalendarToolbar';
import { CalendarSearchFilters } from '@/components/admin/calendar/CalendarSearchFilters';
import { BookingsListView } from '@/components/admin/calendar/BookingsListView';
import { CalendarView } from '@/components/admin/calendar/CalendarView';
import { DeleteBookingDialog } from '@/components/admin/calendar/DeleteBookingDialog';
import { BookingFilters } from '@/components/admin/calendar/BookingFilters';

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
      toast({
        title: "Réservation supprimée",
        description: `La réservation ${bookingToDelete} a été supprimée avec succès.`,
      });
      setShowDeleteDialog(false);
      setBookingToDelete(null);
    }
  };

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

  const printCalendar = () => {
    window.print();
  };

  const getFilteredBookings = () => {
    return bookings.filter(booking => {
      const matchesSearch = searchQuery === '' || 
        booking.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || booking.status === filters.status;
      
      const matchesTour = filters.tour === 'all' || booking.tour === filters.tour;
      
      const matchesParticipants = 
        booking.participants >= filters.minParticipants && 
        booking.participants <= filters.maxParticipants;
      
      return matchesSearch && matchesStatus && matchesTour && matchesParticipants;
    });
  };

  const allTours: string[] = Array.from(new Set(bookings.map(b => b.tour)));
  const allStatuses: string[] = Array.from(new Set(bookings.map(b => b.status)));
  const filteredBookings = getFilteredBookings();

  return (
    <div className="space-y-6 print:m-4">
      <div className="flex justify-between items-center print:hidden">
        <h1 className="text-2xl font-bold">Calendrier des Réservations</h1>
        <CalendarToolbar 
          isSyncing={isSyncing}
          isConfigured={isConfigured}
          onSync={handleSyncWithGoogle}
          onOpenConfig={() => setIsConfigOpen(true)}
          onExportCSV={exportCSV}
          onPrintCalendar={printCalendar}
        />
      </div>

      <ApiConfigAlert 
        isConfigured={isConfigured} 
        onOpenConfig={() => setIsConfigOpen(true)} 
      />

      <CalendarSearchFilters 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

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

      {activeTab === 'calendar' ? (
        <CalendarView 
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          bookingsByDate={bookingsByDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
          onSelectDate={setSelectedDate}
          showNewBookingDialog={showNewBookingDialog}
          setShowNewBookingDialog={setShowNewBookingDialog}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onDeleteBooking={handleDeleteBooking}
        />
      ) : (
        <BookingsListView 
          bookings={filteredBookings}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onDeleteBooking={handleDeleteBooking}
        />
      )}

      <GoogleApiConfigDialog open={isConfigOpen} onOpenChange={setIsConfigOpen} />

      <DeleteBookingDialog 
        open={showDeleteDialog} 
        onOpenChange={setShowDeleteDialog} 
        onConfirm={confirmDeleteBooking}
      />
    </div>
  );
};

export default CalendarBookings;
