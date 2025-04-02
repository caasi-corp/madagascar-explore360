
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Edit2, 
  Eye, 
  MoreVertical 
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

interface FlightTableProps {
  flights: Flight[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: 'scheduled' | 'delayed' | 'cancelled') => void;
}

const FlightTable: React.FC<FlightTableProps> = ({ 
  flights, 
  onDelete, 
  onUpdateStatus 
}) => {
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
        {flights.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
              Aucun vol trouvé
            </TableCell>
          </TableRow>
        ) : (
          flights.map((flight) => (
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
                      <DropdownMenuItem onClick={() => onUpdateStatus(flight.id, 'scheduled')}>
                        Marquer comme planifié
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateStatus(flight.id, 'delayed')}>
                        Marquer comme retardé
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateStatus(flight.id, 'cancelled')}>
                        Marquer comme annulé
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDelete(flight.id)}
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
  );
};

export default FlightTable;
