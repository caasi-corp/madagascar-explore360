
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CheckCircle, XCircle } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface BookingDetailsDialogProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'Confirmé' | 'En attente' | 'Annulé') => void;
}

const BookingDetailsDialog: React.FC<BookingDetailsDialogProps> = ({ 
  booking, 
  isOpen, 
  onClose, 
  onUpdateStatus 
}) => {
  if (!booking) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Détails de la Réservation #{booking.id}</DialogTitle>
          <DialogDescription>
            {getStatusBadge(booking.status)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Circuit</h4>
              <p className="text-base">{booking.tour}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Montant</h4>
              <p className="text-base font-medium">{booking.amount} €</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
            <p className="text-base">{booking.customer}</p>
            <p className="text-sm text-muted-foreground">{booking.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Date de début</h4>
              <p className="text-base">{format(new Date(booking.date), 'dd MMMM yyyy', { locale: fr })}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Date de fin</h4>
              <p className="text-base">{format(new Date(booking.endDate), 'dd MMMM yyyy', { locale: fr })}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Participants</h4>
            <p className="text-base">{booking.participants} {booking.participants > 1 ? 'personnes' : 'personne'}</p>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {booking.status !== 'Confirmé' && (
              <Button onClick={() => onUpdateStatus(booking.id, 'Confirmé')} size="sm">
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirmer
              </Button>
            )}
            {booking.status !== 'Annulé' && (
              <Button variant="outline" onClick={() => onUpdateStatus(booking.id, 'Annulé')} size="sm">
                <XCircle className="mr-2 h-4 w-4" />
                Annuler
              </Button>
            )}
          </div>
          <DialogClose asChild>
            <Button variant="outline" size="sm">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;
