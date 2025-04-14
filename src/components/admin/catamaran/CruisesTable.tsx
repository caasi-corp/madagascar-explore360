
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Eye, Edit, Trash } from 'lucide-react';

interface Cruise {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: number;
  catamaran: string;
  status: 'active' | 'inactive';
  bookings: number;
  nextDeparture: string;
}

interface CruisesTableProps {
  cruises: Cruise[];
}

const CruisesTable: React.FC<CruisesTableProps> = ({ cruises }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>
            <div className="flex items-center">
              Nom
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Durée</TableHead>
          <TableHead>
            <div className="flex items-center">
              Prix (€)
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>Catamaran</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Réservations</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cruises.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-4">Aucune croisière trouvée</TableCell>
          </TableRow>
        ) : (
          cruises.map((cruise) => (
            <TableRow key={cruise.id}>
              <TableCell>{cruise.id}</TableCell>
              <TableCell>{cruise.name}</TableCell>
              <TableCell>{cruise.destination}</TableCell>
              <TableCell>{cruise.duration}</TableCell>
              <TableCell>{cruise.price}</TableCell>
              <TableCell>{cruise.catamaran}</TableCell>
              <TableCell>
                <Badge variant={cruise.status === 'active' ? 'default' : 'outline'}>
                  {cruise.status === 'active' ? 'Actif' : 'Inactif'}
                </Badge>
              </TableCell>
              <TableCell>{cruise.bookings}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CruisesTable;
