
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
  Car
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

interface Vehicle {
  id: string;
  name: string;
  type: string;
  transmission: string;
  pricePerDay: number;
  available: boolean;
}

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { 
      id: 'V001', 
      name: 'Toyota Land Cruiser', 
      type: '4x4', 
      transmission: 'Automatique', 
      pricePerDay: 89, 
      available: true 
    },
    { 
      id: 'V002', 
      name: 'Renault Duster', 
      type: 'SUV', 
      transmission: 'Manuelle', 
      pricePerDay: 65, 
      available: true 
    },
    { 
      id: 'V003', 
      name: 'Yamaha TW200', 
      type: 'Moto', 
      transmission: 'Manuelle', 
      pricePerDay: 45, 
      available: false 
    },
    { 
      id: 'V004', 
      name: 'BRP Can-Am Outlander', 
      type: 'Quad', 
      transmission: 'Automatique', 
      pricePerDay: 75, 
      available: true 
    },
    { 
      id: 'V005', 
      name: 'Volkswagen Combi', 
      type: 'Van', 
      transmission: 'Manuelle', 
      pricePerDay: 110, 
      available: true 
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    
    toast({
      title: "Véhicule supprimé",
      description: "Le véhicule a été supprimé avec succès",
      variant: "default",
    });
  };

  const handleToggleAvailable = (id: string) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === id ? { ...vehicle, available: !vehicle.available } : vehicle
    ));
  };

  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Véhicules</h1>
        <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
          <Link to="/admin/vehicles/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un Véhicule
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Rechercher un véhicule..." 
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
                <DropdownMenuItem>Tous les véhicules</DropdownMenuItem>
                <DropdownMenuItem>Véhicules disponibles</DropdownMenuItem>
                <DropdownMenuItem>Véhicules non disponibles</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>4x4</DropdownMenuItem>
                <DropdownMenuItem>SUV</DropdownMenuItem>
                <DropdownMenuItem>Moto</DropdownMenuItem>
                <DropdownMenuItem>Quad</DropdownMenuItem>
                <DropdownMenuItem>Van</DropdownMenuItem>
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
                <DropdownMenuItem>Nom (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Nom (Z-A)</DropdownMenuItem>
                <DropdownMenuItem>Prix (croissant)</DropdownMenuItem>
                <DropdownMenuItem>Prix (décroissant)</DropdownMenuItem>
                <DropdownMenuItem>Type</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du Véhicule</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Transmission</TableHead>
                <TableHead className="text-right">Prix/jour</TableHead>
                <TableHead>Disponibilité</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Aucun véhicule trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.name}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>{vehicle.transmission}</TableCell>
                    <TableCell className="text-right">{vehicle.pricePerDay} €/jour</TableCell>
                    <TableCell>
                      <Badge variant={vehicle.available ? "default" : "secondary"} className={vehicle.available ? "bg-green-500" : ""}>
                        {vehicle.available ? "Disponible" : "Non disponible"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/services/car-rental`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/admin/vehicles/edit/${vehicle.id}`}>
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
                            <DropdownMenuItem onClick={() => handleToggleAvailable(vehicle.id)}>
                              {vehicle.available ? "Marquer indisponible" : "Marquer disponible"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(vehicle.id)}
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

export default AdminVehicles;
