
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

interface Hotel {
  id: string;
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  available: boolean;
  featured: boolean;
}

interface HotelTableProps {
  hotels: Hotel[];
  onDelete: (id: string) => void;
  onToggleAvailable: (id: string) => void;
  onToggleFeatured: (id: string) => void;
}

const HotelTable: React.FC<HotelTableProps> = ({ 
  hotels, 
  onDelete, 
  onToggleAvailable, 
  onToggleFeatured 
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom de l'hôtel</TableHead>
          <TableHead>Emplacement</TableHead>
          <TableHead className="text-center">Étoiles</TableHead>
          <TableHead className="text-right">Prix/nuit</TableHead>
          <TableHead>Disponibilité</TableHead>
          <TableHead>Mis en avant</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {hotels.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
              Aucun hôtel trouvé
            </TableCell>
          </TableRow>
        ) : (
          hotels.map((hotel) => (
            <TableRow key={hotel.id}>
              <TableCell className="font-medium">{hotel.name}</TableCell>
              <TableCell>{hotel.location}</TableCell>
              <TableCell className="text-center">{Array(hotel.stars).fill('★').join('')}</TableCell>
              <TableCell className="text-right">{hotel.pricePerNight} €/nuit</TableCell>
              <TableCell>
                <Badge variant={hotel.available ? "default" : "secondary"} className={hotel.available ? "bg-green-500" : ""}>
                  {hotel.available ? "Disponible" : "Non disponible"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={hotel.featured ? "default" : "outline"}>
                  {hotel.featured ? "Mis en avant" : "Non"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/services/hotels`}>
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
                      <DropdownMenuItem onClick={() => onToggleAvailable(hotel.id)}>
                        {hotel.available ? "Marquer indisponible" : "Marquer disponible"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onToggleFeatured(hotel.id)}>
                        {hotel.featured ? "Retirer de la une" : "Mettre en une"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDelete(hotel.id)}
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

export default HotelTable;
