
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
  Plane,
  Calendar,
  Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface FlightType {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  departureTime: string;
  arrival: string;
  arrivalTime: string;
  departureDate: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  status: 'scheduled' | 'delayed' | 'cancelled' | 'boarding' | 'in-flight' | 'landed';
}

const DEMO_FLIGHTS: FlightType[] = [
  {
    id: "f1",
    airline: "Air Madagascar",
    flightNumber: "MD201",
    departure: "Paris (CDG)",
    departureTime: "10:15",
    arrival: "Antananarivo (TNR)",
    arrivalTime: "22:45",
    departureDate: "2023-09-15",
    duration: "12h 30m",
    price: 850,
    seatsAvailable: 42,
    status: "scheduled",
  },
  {
    id: "f2",
    airline: "Air France",
    flightNumber: "AF934",
    departure: "Paris (CDG)",
    departureTime: "21:30",
    arrival: "Antananarivo (TNR)",
    arrivalTime: "09:50",
    departureDate: "2023-09-16",
    duration: "11h 20m",
    price: 950,
    seatsAvailable: 28,
    status: "delayed",
  },
  {
    id: "f3",
    airline: "Air Madagascar",
    flightNumber: "MD103",
    departure: "Antananarivo (TNR)",
    departureTime: "10:00",
    arrival: "Nosy Be (NOS)",
    arrivalTime: "11:45",
    departureDate: "2023-09-17",
    duration: "1h 45m",
    price: 250,
    seatsAvailable: 15,
    status: "cancelled",
  },
  {
    id: "f4",
    airline: "Ethiopian Airlines",
    flightNumber: "ET853",
    departure: "Addis-Abeba (ADD)",
    departureTime: "08:30",
    arrival: "Antananarivo (TNR)",
    arrivalTime: "13:15",
    departureDate: "2023-09-18",
    duration: "4h 45m",
    price: 450,
    seatsAvailable: 32,
    status: "scheduled",
  },
];

const statusColor = {
  'scheduled': 'bg-blue-500',
  'delayed': 'bg-yellow-500',
  'cancelled': 'bg-red-500',
  'boarding': 'bg-green-500',
  'in-flight': 'bg-purple-500',
  'landed': 'bg-gray-500',
};

const FlightsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [flights, setFlights] = useState(DEMO_FLIGHTS);
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/admin/flights/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/flights/edit/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/admin/flights/view/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce vol?')) {
      setFlights(flights.filter(flight => flight.id !== id));
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

  const filteredFlights = flights.filter(
    (flight) =>
      flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.arrival.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatedContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Vols</h1>
        <Button onClick={handleAddNew} className="bg-madagascar-green hover:bg-madagascar-green/80">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Vol
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Vols ({flights.length})</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par compagnie, numéro de vol, origine ou destination..."
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
            <TableCaption>Liste des vols disponibles</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Vol</TableHead>
                <TableHead>Départ</TableHead>
                <TableHead>Arrivée</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Places</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{flight.airline}</div>
                        <div className="text-xs text-muted-foreground">{flight.flightNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{flight.departure}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {flight.departureTime}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{flight.arrival}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {flight.arrivalTime}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(flight.departureDate)}
                      </div>
                    </TableCell>
                    <TableCell>{flight.duration}</TableCell>
                    <TableCell>{formatPrice(flight.price)}</TableCell>
                    <TableCell className="text-center">{flight.seatsAvailable}</TableCell>
                    <TableCell>
                      <Badge className={statusColor[flight.status]}>
                        {flight.status === 'scheduled' && 'Programmé'}
                        {flight.status === 'delayed' && 'Retardé'}
                        {flight.status === 'cancelled' && 'Annulé'}
                        {flight.status === 'boarding' && 'Embarquement'}
                        {flight.status === 'in-flight' && 'En vol'}
                        {flight.status === 'landed' && 'Atterri'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(flight.id)}
                          title="Voir"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(flight.id)}
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(flight.id)}
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
                    Aucun vol trouvé avec ces critères de recherche.
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

export default FlightsManagement;
