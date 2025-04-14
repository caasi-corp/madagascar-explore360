import { supabase } from '@/integrations/supabase/client';
import { mapSupabaseBooking } from '@/types/supabase';

export const bookingAPI = {
  // Récupérer toutes les réservations
  async getAll() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, tours(*), vehicles(*)')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      throw error;
    }
    
    return data.map(booking => mapSupabaseBooking(booking)) || [];
  },
  
  // Récupérer une réservation par ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, tours(*), vehicles(*)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Erreur lors de la récupération de la réservation ${id}:`, error);
      return null;
    }
    
    return mapSupabaseBooking(data);
  },
  
  // Récupérer les réservations d'un utilisateur
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, tours(*), vehicles(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Erreur lors de la récupération des réservations de l'utilisateur ${userId}:`, error);
      throw error;
    }
    
    return data.map(booking => mapSupabaseBooking(booking)) || [];
  },
  
  // Créer une nouvelle réservation
  async create(booking: any) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          user_id: booking.userId,
          tour_id: booking.tourId,
          vehicle_id: booking.vehicleId,
          hotel_id: booking.hotelId,
          flight_id: booking.flightId,
          start_date: booking.startDate,
          end_date: booking.endDate,
          total_price: booking.totalPrice,
          status: booking.status || 'Pending'
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      throw error;
    }
    
    return data;
  },
  
  // Mettre à jour une réservation
  async update(id: string, bookingData: any) {
    const { data, error } = await supabase
      .from('bookings')
      .update({
        tour_id: bookingData.tourId,
        vehicle_id: bookingData.vehicleId,
        hotel_id: bookingData.hotelId,
        flight_id: bookingData.flightId,
        start_date: bookingData.startDate,
        end_date: bookingData.endDate,
        total_price: bookingData.totalPrice,
        status: bookingData.status
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour de la réservation ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Mettre à jour le statut d'une réservation
  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour du statut de la réservation ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Supprimer une réservation
  async delete(id: string) {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Erreur lors de la suppression de la réservation ${id}:`, error);
      throw error;
    }
    
    return true;
  },
  
  // Récupérer les statistiques des réservations pour le tableau de bord admin
  async getStats() {
    // Total des réservations
    const { data: totalBookings, error: totalError } = await supabase
      .from('bookings')
      .select('id', { count: 'exact' });
    
    // Réservations confirmées
    const { data: confirmedBookings, error: confirmedError } = await supabase
      .from('bookings')
      .select('id', { count: 'exact' })
      .eq('status', 'Confirmed');
    
    // Réservations en attente
    const { data: pendingBookings, error: pendingError } = await supabase
      .from('bookings')
      .select('id', { count: 'exact' })
      .eq('status', 'Pending');
    
    // Revenu total
    const { data: revenueData, error: revenueError } = await supabase
      .from('bookings')
      .select('total_price')
      .eq('status', 'Confirmed');
    
    if (totalError || confirmedError || pendingError || revenueError) {
      console.error('Erreur lors de la récupération des statistiques des réservations');
      throw new Error('Erreur lors de la récupération des statistiques');
    }
    
    const totalRevenue = revenueData
      ? revenueData.reduce((sum, booking) => sum + booking.total_price, 0)
      : 0;
    
    return {
      total: totalBookings?.length || 0,
      confirmed: confirmedBookings?.length || 0,
      pending: pendingBookings?.length || 0,
      revenue: totalRevenue
    };
  }
};
