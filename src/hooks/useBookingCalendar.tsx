
import { useState, useEffect } from 'react';
import { Booking, BookingsByDate, BookingCalendarState } from '@/types/booking';
import { generateMockBookings, organizeBookingsByDate } from '@/hooks/booking/mockBookingData';
import { syncWithGoogleCalendar, checkApiConfiguration } from '@/hooks/booking/bookingUtils';
import { addBooking, updateBooking, deleteBooking } from '@/hooks/booking/bookingOperations';

export const useBookingCalendar = () => {
  const [state, setState] = useState<BookingCalendarState>({
    bookings: [],
    bookingsByDate: {},
    isLoading: true,
    error: null,
    isSyncing: false,
    isConfigured: false
  });

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real application, this would fetch data from an API
        const mockBookings = generateMockBookings();
        const bookingsByDate = organizeBookingsByDate(mockBookings);
        const isConfigured = checkApiConfiguration();

        setState({
          bookings: mockBookings,
          bookingsByDate,
          isLoading: false,
          error: null,
          isSyncing: false,
          isConfigured
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Unknown error')
        }));
      }
    };

    loadData();
  }, []);

  // Sync with Google Calendar
  const syncWithGoogle = async () => {
    if (!state.isConfigured) {
      throw new Error("L'API Google n'est pas configurée");
    }

    setState(prev => ({ ...prev, isSyncing: true }));

    try {
      await syncWithGoogleCalendar();
      setState(prev => ({ ...prev, isSyncing: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error : new Error('Unknown error')
      }));
      throw error;
    }
  };

  // Add a new booking
  const addNewBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { updatedBookings, updatedBookingsByDate } = addBooking(
      state.bookings,
      state.bookingsByDate,
      bookingData
    );

    setState(prev => ({
      ...prev,
      bookings: updatedBookings,
      bookingsByDate: updatedBookingsByDate
    }));

    return updatedBookings;
  };

  // Update an existing booking
  const updateExistingBooking = (id: string, bookingData: Partial<Booking>) => {
    const { updatedBookings, updatedBookingsByDate } = updateBooking(
      state.bookings,
      state.bookingsByDate,
      id,
      bookingData
    );

    setState(prev => ({
      ...prev,
      bookings: updatedBookings,
      bookingsByDate: updatedBookingsByDate
    }));

    return updatedBookings;
  };

  // Delete a booking
  const deleteExistingBooking = (id: string) => {
    const { updatedBookings, updatedBookingsByDate } = deleteBooking(
      state.bookings,
      state.bookingsByDate,
      id
    );

    setState(prev => ({
      ...prev,
      bookings: updatedBookings,
      bookingsByDate: updatedBookingsByDate
    }));

    return updatedBookings;
  };

  return {
    bookings: state.bookings,
    bookingsByDate: state.bookingsByDate,
    isLoading: state.isLoading,
    error: state.error,
    isSyncing: state.isSyncing,
    isConfigured: state.isConfigured,
    syncWithGoogle,
    addBooking: addNewBooking,
    updateBooking: updateExistingBooking,
    deleteBooking: deleteExistingBooking
  };
};
