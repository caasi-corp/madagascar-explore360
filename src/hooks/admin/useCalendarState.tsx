
import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { useBookingCalendar } from '@/hooks/useBookingCalendar';
import { DateRange } from 'react-day-picker';

export const useCalendarState = () => {
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
    bookingsByDate,
    deleteBooking
  } = useBookingCalendar();

  const [filters, setFilters] = useState({
    status: 'all',
    tour: 'all',
    minParticipants: 0,
    maxParticipants: 20,
  });

  // Extract all tours and statuses from bookings
  const allTours: string[] = Array.from(new Set(bookings.map(b => b.tour)));
  const allStatuses: string[] = Array.from(new Set(bookings.map(b => b.status)));

  return {
    // State
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
    
    // Booking data
    bookings,
    isLoading,
    error,
    syncWithGoogle,
    isSyncing,
    isConfigured,
    bookingsByDate,
    deleteBooking,
    
    // Utilities
    toast,
    allTours,
    allStatuses
  };
};
