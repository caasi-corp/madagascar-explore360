
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowDownAZ, Eye, Car, Calendar, CheckCircle, XCircle } from 'lucide-react';
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
import { useToast } from '@/components/ui/use-toast';

interface VehicleBooking {
  id: string;
  customer: string;
  vehicle: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const AdminVehicleBookings = () => {
  const [bookings, setBookings] = useState<VehicleBooking[]>([
    { 
      id: 'RB001', 
      customer: 'Jean Dupont', 
      vehicle: 'Toyota Hilux', 
      startDate: '2023-08-15', 
      endDate: '2023-08-20', 
      totalPrice: 400, 
      status: 'confirmed' 
    },
    { 
      id: 'RB002', 
      customer: 'Marie Laurent', 
      vehicle: 'Renault Clio', 
      startDate: '2023-08-18', 
      endDate: '2023-08-25', 
      totalPrice: 350, 
      status: 'pending' 
    },
    { 
      id: 'RB003', 
      customer: 'Pierre Martin', 
      vehicle: 'Toyota Coaster', 
      startDate: '2023-08-22', 
      endDate: '2023-08-29', 
      totalPrice: 1050, 
      status: 'confirmed' 
    },
    { 
      id: 'RB004', 
      customer: 'Sophie Garcia', 
      vehicle: 'Peugeot 208', 
      startDate: '2023-08-25', 
      endDate: '2023-08-28', 
      totalPrice: 135, 
      status: 'cancelled' 
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleConfirm = (id: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'confirmed' } : booking
    ));
    
    toast({
      title: "Réservation confirmée",
      description: "La réservation a été confirmée avec succès",
    });
  };

  const handleCancel = (id: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'cancelled' } : booking
    ));
    
    toast({
      title: "Réservation annulée",
      description: "La réservation a été annulée avec succès",
    });
  };

  const filteredBookings = bookings.filter(booking => 
    booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get badge variant based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default" className="bg-green-500">Confirmée</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">En attente</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-destructive border-destructive">Annulée</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Réservations de Véhicules</h1>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/admin/vehicles">
              <Car className="mr-2 h-4 w-4" />
              Gérer les Véhicules
            </Link>
          </Button>
          <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            <Link to="/admin/reports">
              <Calendar className="mr-2 h-4 w-4" />
              Rapports
            </Link>
          </Button>
        </div>
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
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Toutes les réservations</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Confirmées</DropdownMenuItem>
                <DropdownMenuItem>En attente</DropdownMenuItem>
                <DropdownMenuItem>Annulées</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Ce mois-ci</DropdownMenuItem>
                <DropdownMenuItem>Mois prochain</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ArrowDownAZ className="mr-2 h-4 w-4" />
                  Trier
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Date (plus récente)</DropdownMenuItem>
                <DropdownMenuItem>Date (plus ancienne)</DropdownMenuItem>
                <DropdownMenuItem>Client (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Client (Z-A)</DropdownMenuItem>
                <DropdownMenuItem>Véhicule (A-Z)</DropdownMenuItem>
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
                <TableHead className="text-right">Prix total</TableHead>
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
                    <TableCell>{booking.vehicle}</TableCell>
                    <TableCell>
                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">{booking.totalPrice} €</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/admin/customers`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        {booking.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-500" onClick={() => handleConfirm(booking.id)}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleCancel(booking.id)}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
