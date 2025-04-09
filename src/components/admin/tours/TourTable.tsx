
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Edit2, 
  Trash2, 
  Eye,
  MoreVertical 
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Tour {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
  featured: boolean;
  active: boolean;
}

interface TourTableProps {
  tours: Tour[];
  handleDelete: (id: string) => void;
  handleToggleStatus: (id: string) => void;
  handleToggleFeatured: (id: string) => void;
}

const TourTable: React.FC<TourTableProps> = ({ 
  tours, 
  handleDelete, 
  handleToggleStatus, 
  handleToggleFeatured 
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom du Circuit</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Durée</TableHead>
          <TableHead className="text-right">Prix</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Mis en avant</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tours.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
              Aucun circuit trouvé
            </TableCell>
          </TableRow>
        ) : (
          tours.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell className="font-medium">{tour.name}</TableCell>
              <TableCell>{tour.category}</TableCell>
              <TableCell>{tour.duration} jours</TableCell>
              <TableCell className="text-right">{tour.price} €</TableCell>
              <TableCell>
                <Badge variant={tour.active ? "default" : "secondary"} className={tour.active ? "bg-green-500 hover:bg-green-600" : ""}>
                  {tour.active ? "Actif" : "Inactif"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={tour.featured ? "default" : "outline"}>
                  {tour.featured ? "Mis en avant" : "Non"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/tours/${tour.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/admin/tours/edit/${tour.id}`}>
                      <Edit2 className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleToggleStatus(tour.id)}>
                        {tour.active ? "Désactiver" : "Activer"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleFeatured(tour.id)}>
                        {tour.featured ? "Retirer de la une" : "Mettre en une"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(tour.id)}
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

export default TourTable;
