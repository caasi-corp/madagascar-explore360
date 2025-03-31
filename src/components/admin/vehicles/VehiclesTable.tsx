
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { VehicleProps } from '@/components/VehicleCard';
import VehicleTableRow from './VehicleTableRow';

interface VehiclesTableProps {
  vehicles: VehicleProps[];
  searchTerm: string;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleAvailability: (id: string) => void;
}

const VehiclesTable: React.FC<VehiclesTableProps> = ({
  vehicles,
  searchTerm,
  onEdit,
  onView,
  onDelete,
  onToggleAvailability
}) => {
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Table>
      <TableCaption>Liste des véhicules disponibles</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Prix/Jour</TableHead>
          <TableHead>Places</TableHead>
          <TableHead>Transmission</TableHead>
          <TableHead>Disponibilité</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <VehicleTableRow
              key={vehicle.id}
              vehicle={vehicle}
              onEdit={onEdit}
              onView={onView}
              onDelete={onDelete}
              onToggleAvailability={onToggleAvailability}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
              Aucun véhicule trouvé avec ces critères de recherche.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default VehiclesTable;
