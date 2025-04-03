
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  Edit2, 
  Trash2, 
  Filter, 
  ArrowDownAZ,
  Eye,
  MoreVertical,
  Plane
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
import { useToast } from '@/components/ui/use-toast';

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  price: number;
  seatsAvailable: number;
  status: 'scheduled' | 'delayed' | 'cancelled';
}

const AdminFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([
    { 
      id: 'F001',
      flightNumber: 'MD405', 
      airline: 'Air Madagascar', 
      origin: 'Antananarivo', 
      destination: 'Paris', 
      departureDate: '2023-08-15',
      departureTime: '22:30',
      arrivalDate: '2023-08-16',
      arrivalTime: '08:45',
      price: 850,
      seatsAvailable: 45,
      status: 'scheduled'
    },
    { 
      id: 'F002',
      flightNumber: 'AF934', 
      airline: 'Air France', 
      origin: 'Paris', 
      destination: 'Antananarivo', 
      departureDate: '2023-08-16',
      departureTime: '11:15',
      arrivalDate: '2023-08-16',
      arrivalTime: '22:30',
      price: 920,
      seatsAvailable: 28,
      status: 'scheduled'
    },
    { 
      id: 'F003',
      flightNumber: 'MD123', 
      airline: 'Air Madagascar', 
      origin: 'Antananarivo', 
      destination: 'Nosy Be', 
      departureDate: '2023-08-17',
      departureTime: '09:00',
      arrivalDate: '2023-08-17',
      arrivalTime: '10:15',
      price: 220,
      seatsAvailable: 12,
      status: 'delayed'
    },
    { 
      id: 'F004',
      flightNumber: 'MD456', 
      airline: 'Air Madagascar', 
      origin: 'Nosy Be', 
      destination: 'Antananarivo', 
      departureDate: '2023-08-17',
      departureTime: '15:45',
      arrivalDate: '2023-08-17',
      arrivalTime: '17:00',
      price: 190,
      seatsAvailable: 0,
      status: 'cancelled'
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    // Simule la suppression d'un vol
    setFlights(flights.filter(flight => flight.id !== id));
    
    toast({
      title: "Vol supprimé",
      description: "Le vol a été supprimé avec succès",
    });
  };

  const handleUpdateStatus = (id: string, status: 'scheduled' | 'delayed' | 'cancelled') => {
    // Simule la modification du statut d'un vol
    setFlights(flights.map(flight => 
      flight.id === id ? { ...flight, status: status } : flight
    ));
    
    toast({
      title: "Statut mis à jour",
      description: `Le vol est maintenant ${status === 'scheduled' ? 'planifié' : status === 'delayed' ? 'retardé' : 'annulé'}`,
    });
  };

  const filteredFlights = flights.filter(flight => 
    flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get badge variant based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="default" className="bg-green-500">Planifié</Badge>;
      case 'delayed':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Retardé</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-destructive border-destructive">Annulé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Vols</h1>
        <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
          <Link to="#">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un Vol
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Rechercher un vol..." 
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
                <DropdownMenuItem>Tous les vols</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Planifiés</DropdownMenuItem>
                <DropdownMenuItem>Retardés</DropdownMenuItem>
                <DropdownMenuItem>Annulés</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Air Madagascar</DropdownMenuItem>
                <DropdownMenuItem>Air France</DropdownMenuItem>
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
                <DropdownMenuItem>Prix (croissant)</DropdownMenuItem>
                <DropdownMenuItem>Prix (décroissant)</DropdownMenuItem>
                <DropdownMenuItem>Compagnie (A-Z)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vol</TableHead>
                <TableHead>Trajet</TableHead>
                <TableHead>Départ</TableHead>
                <TableHead>Arrivée</TableHead>
                <TableHead className="text-right">Prix</TableHead>
                <TableHead>Places</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFlights.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Aucun vol trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredFlights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{flight.flightNumber}</div>
                        <div className="text-sm text-muted-foreground">{flight.airline}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {flight.origin} → {flight.destination}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{new Date(flight.departureDate).toLocaleDateString()}</div>
                        <div className="text-sm text-muted-foreground">{flight.departureTime}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{new Date(flight.arrivalDate).toLocaleDateString()}</div>
                        <div className="text-sm text-muted-foreground">{flight.arrivalTime}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{flight.price} €</TableCell>
                    <TableCell>
                      {flight.seatsAvailable > 0 ? (
                        <span>{flight.seatsAvailable} dispo.</span>
                      ) : (
                        <span className="text-destructive">Complet</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(flight.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/services/flights`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleUpdateStatus(flight.id, 'scheduled')}>
                              Marquer comme planifié
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(flight.id, 'delayed')}>
                              Marquer comme retardé
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(flight.id, 'cancelled')}>
                              Marquer comme annulé
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(flight.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              Supprimer
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

export default AdminFlights;
