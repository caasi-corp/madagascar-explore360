
import React from 'react';
import { 
  Eye, 
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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

interface BookingTableProps {
  bookings: Booking[];
  onViewBooking: (booking: Booking) => void;
  onUpdateStatus: (id: string, status: 'Confirmé' | 'En attente' | 'Annulé') => void;
}

const BookingTable: React.FC<BookingTableProps> = ({ 
  bookings, 
  onViewBooking, 
  onUpdateStatus 
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmé':
        return <Badge className="bg-green-500">Confirmé</Badge>;
      case 'En attente':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">En attente</Badge>;
      case 'Annulé':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Circuit</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-center">Participants</TableHead>
          <TableHead className="text-right">Montant</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
              Aucune réservation trouvée
            </TableCell>
          </TableRow>
        ) : (
          bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>{booking.customer}</TableCell>
              <TableCell>{booking.tour}</TableCell>
              <TableCell>
                {format(new Date(booking.date), 'dd MMM yyyy', { locale: fr })}
              </TableCell>
              <TableCell className="text-center">{booking.participants}</TableCell>
              <TableCell className="text-right">{booking.amount} €</TableCell>
              <TableCell>
                {getStatusBadge(booking.status)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => onViewBooking(booking)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onUpdateStatus(booking.id, 'Confirmé')}>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Confirmer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateStatus(booking.id, 'En attente')}>
                        <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                        Mettre en attente
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateStatus(booking.id, 'Annulé')}>
                        <XCircle className="mr-2 h-4 w-4 text-destructive" />
                        Annuler
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Envoyer un e-mail
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Imprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default BookingTable;
