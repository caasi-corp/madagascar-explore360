
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Eye, Calendar, Edit } from 'lucide-react';

interface Departure {
  id: string;
  cruise: string;
  catamaran: string;
  departure: string;
  passengersBooked: number;
  capacity: number;
  status: 'confirmed' | 'full' | 'pending';
}

interface DeparturesTableProps {
  departures: Departure[];
}

const DeparturesTable = ({ departures }: DeparturesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Croisière</TableHead>
          <TableHead>Catamaran</TableHead>
          <TableHead>
            <div className="flex items-center">
              Date de départ
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>Passagers</TableHead>
          <TableHead>Capacité</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {departures.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-4">Aucun départ trouvé</TableCell>
          </TableRow>
        ) : (
          departures.map((departure) => (
            <TableRow key={departure.id}>
              <TableCell>{departure.id}</TableCell>
              <TableCell>{departure.cruise}</TableCell>
              <TableCell>{departure.catamaran}</TableCell>
              <TableCell>{departure.departure}</TableCell>
              <TableCell>{departure.passengersBooked}</TableCell>
              <TableCell>{departure.capacity}</TableCell>
              <TableCell>
                <Badge variant={
                  departure.status === 'confirmed' 
                    ? 'default' 
                    : departure.status === 'full'
                      ? 'destructive'
                      : 'outline'
                }>
                  {departure.status === 'confirmed' 
                    ? 'Confirmé' 
                    : departure.status === 'full'
                      ? 'Complet'
                      : 'En attente'
                  }
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
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

export default DeparturesTable;
