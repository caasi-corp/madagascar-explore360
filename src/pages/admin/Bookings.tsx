
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import BookingTable from '@/components/admin/booking/BookingTable';
import BookingFilters from '@/components/admin/booking/BookingFilters';
import BookingDetailsDialog from '@/components/admin/booking/BookingDetailsDialog';

interface Booking {
  id: string;
  customer: string;
  email: string;
  tour: string;
  date: string;
  endDate: string;
  amount: number;
  participants: number;
  status: 'Confirmé' | 'En attente' | 'Annulé';
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'B001',
      customer: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      tour: 'Avenue des Baobabs',
      date: '2023-09-15',
      endDate: '2023-09-18',
      amount: 599,
      participants: 2,
      status: 'Confirmé',
    },
    {
      id: 'B002',
      customer: 'Emma Martin',
      email: 'emma.martin@example.com',
      tour: 'Trekking aux Lémuriens',
      date: '2023-09-20',
      endDate: '2023-09-22',
      amount: 349,
      participants: 1,
      status: 'En attente',
    },
    {
      id: 'B003',
      customer: 'Michel Blanc',
      email: 'michel.blanc@example.com',
      tour: 'Parc National d\'Isalo',
      date: '2023-09-25',
      endDate: '2023-09-29',
      amount: 499,
      participants: 3,
      status: 'Confirmé',
    },
    {
      id: 'B004',
      customer: 'Sophie Garcia',
      email: 'sophie.garcia@example.com',
      tour: 'Île de Nosy Be',
      date: '2023-10-01',
      endDate: '2023-10-06',
      amount: 699,
      participants: 2,
      status: 'Annulé',
    },
    {
      id: 'B005',
      customer: 'Pierre Dubois',
      email: 'pierre.dubois@example.com',
      tour: 'Tsingy de Bemaraha',
      date: '2023-10-10',
      endDate: '2023-10-14',
      amount: 549,
      participants: 4,
      status: 'En attente',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleUpdateStatus = (id: string, status: 'Confirmé' | 'En attente' | 'Annulé') => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
    
    toast({
      title: "Statut mis à jour",
      description: `La réservation #${id} est maintenant ${status.toLowerCase()}`,
    });
    
    // Update the selected booking if open in dialog
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status });
    }
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const filteredBookings = bookings.filter(booking => 
    booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.tour.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Réservations</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <BookingFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <BookingTable 
            bookings={filteredBookings}
            onViewBooking={handleViewBooking}
            onUpdateStatus={handleUpdateStatus}
          />
        </CardContent>
      </Card>

      <BookingDetailsDialog 
        booking={selectedBooking}
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default AdminBookings;
