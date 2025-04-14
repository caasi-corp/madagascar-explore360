
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';

interface Catamaran {
  id: string;
  name: string;
  type: string;
  capacity: number;
  cabins: number;
  length: string;
  status: 'available' | 'maintenance';
  bookings: number;
  nextMaintenance: string;
}

interface CatamaransTableProps {
  catamarans: Catamaran[];
}

const CatamaransTable: React.FC<CatamaransTableProps> = ({ catamarans }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Capacité</TableHead>
          <TableHead>Cabines</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Réservations</TableHead>
          <TableHead>Prochaine maintenance</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {catamarans.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-4">Aucun catamaran trouvé</TableCell>
          </TableRow>
        ) : (
          catamarans.map((catamaran) => (
            <TableRow key={catamaran.id}>
              <TableCell>{catamaran.id}</TableCell>
              <TableCell>{catamaran.name}</TableCell>
              <TableCell>{catamaran.type}</TableCell>
              <TableCell>{catamaran.capacity} pers.</TableCell>
              <TableCell>{catamaran.cabins}</TableCell>
              <TableCell>
                <Badge variant={catamaran.status === 'available' ? 'default' : 'secondary'}>
                  {catamaran.status === 'available' ? 'Disponible' : 'En maintenance'}
                </Badge>
              </TableCell>
              <TableCell>{catamaran.bookings}</TableCell>
              <TableCell>{catamaran.nextMaintenance}</TableCell>
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
          ))}
      </TableBody>
    </Table>
  );
};

export default CatamaransTable;
