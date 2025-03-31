
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Eye } from 'lucide-react';
import { VehicleProps } from '@/components/VehicleCard';

interface VehicleTableRowProps {
  vehicle: VehicleProps;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleAvailability: (id: string) => void;
}

const VehicleTableRow: React.FC<VehicleTableRowProps> = ({
  vehicle,
  onEdit,
  onView,
  onDelete,
  onToggleAvailability
}) => {
  return (
    <TableRow>
      <TableCell>
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="h-12 w-16 object-cover rounded"
        />
      </TableCell>
      <TableCell className="font-medium">{vehicle.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="bg-muted/50 capitalize">
          {vehicle.type}
        </Badge>
      </TableCell>
      <TableCell>{vehicle.pricePerDay}€</TableCell>
      <TableCell>{vehicle.seats}</TableCell>
      <TableCell>{vehicle.transmission}</TableCell>
      <TableCell>
        <Badge 
          className={vehicle.availability ? "bg-green-500" : "bg-red-500"}
          onClick={() => onToggleAvailability(vehicle.id)}
          style={{ cursor: 'pointer' }}
        >
          {vehicle.availability ? 'Disponible' : 'Indisponible'}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(vehicle.id)}
            title="Voir"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(vehicle.id)}
            title="Modifier"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(vehicle.id)}
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            title="Supprimer"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default VehicleTableRow;
