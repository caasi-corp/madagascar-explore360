
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export interface Booking {
  id: string;
  customer: string;
  tour: string;
  date: string;
  amount: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

interface RecentBookingsTableProps {
  bookings: Booking[];
}

const RecentBookingsTable: React.FC<RecentBookingsTableProps> = ({ bookings }) => {
  // Function to translate status to French
  const getStatusInFrench = (status: string) => {
    switch(status) {
      case 'Confirmed': return 'Confirmé';
      case 'Pending': return 'En attente';
      case 'Cancelled': return 'Annulé';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Réservations Récentes</CardTitle>
        <CardDescription>Réservations récentes de circuits et locations</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Circuit</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.customer}</TableCell>
                <TableCell>{booking.tour}</TableCell>
                <TableCell>{booking.amount} €</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : booking.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}
                  >
                    {getStatusInFrench(booking.status)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentBookingsTable;
