
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
  AlertCircle,
  Car
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
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';

interface VehicleBooking {
  id: string;
  customer: string;
  vehicleName: string;
  vehicleType: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: 'Confirmé' | 'En attente' | 'Annulé';
}

const AdminVehicleBookings = () => {
  const [bookings, setBookings] = useState<VehicleBooking[]>([
    {
      id: 'VB001',
      customer: 'Jean Dupont',
      vehicleName: 'Toyota Land Cruiser',
      vehicleType: '4x4',
      startDate: '2023-09-15',
      endDate: '2023-09-18',
      amount: 267,
      status: 'Confirmé',
    },
    {
      id: 'VB002',
      customer: 'Emma Martin',
      vehicleName: 'Renault Duster',
      vehicleType: 'SUV',
      startDate: '2023-09-20',
      endDate: '2023-09-25',
      amount: 325,
      status: 'En attente',
    },
    {
      id: 'VB003',
      customer: 'Michel Blanc',
      vehicleName: 'Yamaha TW200',
      vehicleType: 'Moto',
      startDate: '2023-09-25',
      endDate: '2023-09-27',
      amount: 90,
      status: 'Confirmé',
    },
    {
      id: 'VB004',
      customer: 'Sophie Garcia',
      vehicleName: 'BRP Can-Am Outlander',
      vehicleType: 'Quad',
      startDate: '2023-10-01',
      endDate: '2023-10-03',
      amount: 150,
      status: 'Annulé',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
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
    booking.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <h1 className="text-2xl font-bold">Réservations de Véhicules</h1>
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
                <TableHead>Véhicule</TableHead>
                <TableHead>Période</TableHead>
                <TableHead className="text-right">Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucune réservation trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.customer}</TableCell>
                    <TableCell>
                      <div>
                        <div>{booking.vehicleName}</div>
                        <div className="text-xs text-muted-foreground">{booking.vehicleType}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{format(new Date(booking.startDate), 'dd MMM', { locale: fr })}</div>
                        <div className="text-xs text-muted-foreground">
                          au {format(new Date(booking.endDate), 'dd MMM yyyy', { locale: fr })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{booking.amount} €</TableCell>
                    <TableCell>
                      {getStatusBadge(booking.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
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
    </div>
  );
};

export default AdminVehicleBookings;
