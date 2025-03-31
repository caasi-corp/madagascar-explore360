import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BookingType {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: 'tour' | 'vehicle' | 'hotel' | 'flight';
  itemName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded';
  bookingDate: string;
}

interface BookingsManagementProps {
  vehiclesOnly?: boolean;
}

const DEMO_BOOKINGS: BookingType[] = [
  {
    id: 'B001',
    customerName: 'Jean Dupont',
    customerEmail: 'jean.dupont@example.com',
    customerPhone: '+33 6 12 34 56 78',
    type: 'tour',
    itemName: 'Circuit Allée des Baobabs',
    startDate: '2023-08-15',
    endDate: '2023-08-17',
    totalPrice: 598,
    status: 'confirmed',
    paymentStatus: 'paid',
    bookingDate: '2023-07-20',
  },
  {
    id: 'B002',
    customerName: 'Marie Laurent',
    customerEmail: 'marie.laurent@example.com',
    customerPhone: '+33 6 98 76 54 32',
    type: 'vehicle',
    itemName: 'Toyota Land Cruiser',
    startDate: '2023-09-10',
    endDate: '2023-09-15',
    totalPrice: 445,
    status: 'pending',
    paymentStatus: 'partial',
    bookingDate: '2023-08-25',
  },
  {
    id: 'B003',
    customerName: 'Paul Martin',
    customerEmail: 'paul.martin@example.com',
    customerPhone: '+33 6 45 67 89 01',
    type: 'hotel',
    itemName: 'Royal Beach Resort & Spa',
    startDate: '2023-10-05',
    endDate: '2023-10-12',
    totalPrice: 1050,
    status: 'confirmed',
    paymentStatus: 'unpaid',
    bookingDate: '2023-09-15',
  },
  {
    id: 'B004',
    customerName: 'Sophie Petit',
    customerEmail: 'sophie.petit@example.com',
    customerPhone: '+33 6 78 90 12 34',
    type: 'flight',
    itemName: 'Paris - Antananarivo',
    startDate: '2023-11-20',
    endDate: '2023-12-05',
    totalPrice: 1200,
    status: 'cancelled',
    paymentStatus: 'refunded',
    bookingDate: '2023-10-01',
  },
];

const statusColor = {
  pending: 'bg-yellow-500',
  confirmed: 'bg-green-500',
  cancelled: 'bg-red-500',
  completed: 'bg-blue-500',
};

const paymentStatusColor = {
  unpaid: 'bg-red-500',
  partial: 'bg-yellow-500',
  paid: 'bg-green-500',
  refunded: 'bg-purple-500',
};

const typeIcons = {
  tour: <Calendar className="h-4 w-4" />,
  vehicle: <Calendar className="h-4 w-4" />,
  hotel: <Calendar className="h-4 w-4" />,
  flight: <Calendar className="h-4 w-4" />,
};

const BookingsManagement: React.FC<BookingsManagementProps> = ({ vehiclesOnly = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState(vehiclesOnly 
    ? DEMO_BOOKINGS.filter(booking => booking.type === 'vehicle')
    : DEMO_BOOKINGS
  );
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/admin/bookings/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/bookings/edit/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/admin/bookings/view/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation?')) {
      setBookings(bookings.filter(booking => booking.id !== id));
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: fr });
    } catch (error) {
      return dateString;
    }
  };
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatedContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {vehiclesOnly ? "Gestion des Réservations de Véhicules" : "Gestion des Réservations"}
        </h1>
        <Button onClick={handleAddNew} className="bg-madagascar-green hover:bg-madagascar-green/80">
          <Plus className="mr-2 h-4 w-4" /> Ajouter une Réservation
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Réservations ({bookings.length})</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par client, email, ID ou produit..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" /> Filtres
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Liste des réservations</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Prix Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Paiement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.customerName}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          {booking.customerEmail}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Phone className="h-3 w-3 mr-1" />
                          {booking.customerPhone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-muted/50 capitalize">
                        {booking.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{booking.itemName}</TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span>Début: {formatDate(booking.startDate)}</span>
                        <span>Fin: {formatDate(booking.endDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatPrice(booking.totalPrice)}</TableCell>
                    <TableCell>
                      <Badge className={statusColor[booking.status]}>
                        {booking.status === 'pending' && 'En attente'}
                        {booking.status === 'confirmed' && 'Confirmé'}
                        {booking.status === 'cancelled' && 'Annulé'}
                        {booking.status === 'completed' && 'Terminé'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={paymentStatusColor[booking.paymentStatus]}>
                        {booking.paymentStatus === 'unpaid' && 'Non payé'}
                        {booking.paymentStatus === 'partial' && 'Partiel'}
                        {booking.paymentStatus === 'paid' && 'Payé'}
                        {booking.paymentStatus === 'refunded' && 'Remboursé'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(booking.id)}
                          title="Voir"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(booking.id)}
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(booking.id)}
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                    Aucune réservation trouvée avec ces critères de recherche.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default BookingsManagement;
