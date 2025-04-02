
import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Filter, 
  Download, 
  Eye, 
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';

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
  };

  const filteredBookings = bookings.filter(booking => 
    booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.tour.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Rechercher une réservation..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Aujourd'hui</DropdownMenuItem>
                <DropdownMenuItem>Cette semaine</DropdownMenuItem>
                <DropdownMenuItem>Ce mois</DropdownMenuItem>
                <DropdownMenuItem>Mois dernier</DropdownMenuItem>
                <DropdownMenuItem>Personnalisé...</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Statut
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Tous</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Confirmé</DropdownMenuItem>
                <DropdownMenuItem>En attente</DropdownMenuItem>
                <DropdownMenuItem>Annulé</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Aucune réservation trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
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
                          onClick={() => {
                            setSelectedBooking(booking);
                            setIsViewDialogOpen(true);
                          }}
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
                            <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, 'Confirmé')}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              Confirmer
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, 'En attente')}>
                              <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                              Mettre en attente
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, 'Annulé')}>
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
        </CardContent>
      </Card>

      {/* Booking details dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle>Détails de la Réservation #{selectedBooking.id}</DialogTitle>
                <DialogDescription>
                  {getStatusBadge(selectedBooking.status)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Circuit</h4>
                    <p className="text-base">{selectedBooking.tour}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Montant</h4>
                    <p className="text-base font-medium">{selectedBooking.amount} €</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                  <p className="text-base">{selectedBooking.customer}</p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Date de début</h4>
                    <p className="text-base">{format(new Date(selectedBooking.date), 'dd MMMM yyyy', { locale: fr })}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Date de fin</h4>
                    <p className="text-base">{format(new Date(selectedBooking.endDate), 'dd MMMM yyyy', { locale: fr })}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Participants</h4>
                  <p className="text-base">{selectedBooking.participants} {selectedBooking.participants > 1 ? 'personnes' : 'personne'}</p>
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  {selectedBooking.status !== 'Confirmé' && (
                    <Button onClick={() => handleUpdateStatus(selectedBooking.id, 'Confirmé')} size="sm">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirmer
                    </Button>
                  )}
                  {selectedBooking.status !== 'Annulé' && (
                    <Button variant="outline" onClick={() => handleUpdateStatus(selectedBooking.id, 'Annulé')} size="sm">
                      <XCircle className="mr-2 h-4 w-4" />
                      Annuler
                    </Button>
                  )}
                </div>
                <DialogClose asChild>
                  <Button variant="outline" size="sm">Fermer</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
