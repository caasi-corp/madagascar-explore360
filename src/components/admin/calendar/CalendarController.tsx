
import React from 'react';
import { subMonths, addMonths } from 'date-fns';
import { useCalendarState } from '@/hooks/admin/useCalendarState';
import { filterBookings, exportBookingsToCSV } from './utils/filterBookings';
import { GoogleApiConfigDialog } from '@/components/admin/api-config/GoogleApiConfigDialog';
import { ApiConfigAlert } from '@/components/admin/calendar/ApiConfigAlert';
import { CalendarToolbar } from '@/components/admin/calendar/CalendarToolbar';
import { CalendarSearchFilters } from '@/components/admin/calendar/CalendarSearchFilters';
import { BookingsListView } from '@/components/admin/calendar/BookingsListView';
import { CalendarView } from '@/components/admin/calendar/CalendarView';
import { DeleteBookingDialog } from '@/components/admin/calendar/DeleteBookingDialog';
import { BookingFilters } from '@/components/admin/calendar/BookingFilters';
import { Card, CardContent } from '@/components/ui/card';

export const CalendarController: React.FC = () => {
  const {
    currentMonth,
    setCurrentMonth,
    isConfigOpen, 
    setIsConfigOpen,
    selectedDate,
    setSelectedDate,
    showNewBookingDialog,
    setShowNewBookingDialog,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    activeTab,
    setActiveTab,
    dateRange,
    setDateRange,
    showDeleteDialog,
    setShowDeleteDialog,
    bookingToDelete,
    setBookingToDelete,
    filters,
    setFilters,
    bookings,
    syncWithGoogle,
    isSyncing,
    isConfigured,
    bookingsByDate,
    deleteBooking,
    toast,
    allTours,
    allStatuses
  } = useCalendarState();

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
        description: "Le calendrier a été synchronisé avec Google Calendar",
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
      deleteBooking(bookingToDelete);
      toast({
        title: "Réservation supprimée",
        description: `La réservation ${bookingToDelete} a été supprimée avec succès.`,
      });
      setShowDeleteDialog(false);
      setBookingToDelete(null);
    }
  };

  const handleExportCSV = () => {
    const filteredBookings = filterBookings(bookings, searchQuery, filters);
    exportBookingsToCSV(filteredBookings);
  };

  const handlePrintCalendar = () => {
    window.print();
  };

  const filteredBookings = filterBookings(bookings, searchQuery, filters);

  return (
    <>
      <div className="flex justify-between items-center print:hidden">
        <h1 className="text-2xl font-bold">Calendrier des Réservations</h1>
        <CalendarToolbar 
          isSyncing={isSyncing}
          isConfigured={isConfigured}
          onSync={handleSyncWithGoogle}
          onOpenConfig={() => setIsConfigOpen(true)}
          onExportCSV={handleExportCSV}
          onPrintCalendar={handlePrintCalendar}
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
    </>
  );
};
