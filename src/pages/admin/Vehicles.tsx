
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  Edit2, 
  Trash2, 
  Filter, 
  ArrowDownAZ, 
  ArrowUpZA,
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
import { vehicleAPI } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';

interface Vehicle {
  id: string;
  name: string;
  type: string;
  seats: number;
  pricePerDay: number;
  transmission: string;
  available: boolean;
  featured: boolean;
}

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 'V001', name: 'Toyota Hilux', type: 'SUV', seats: 5, pricePerDay: 80, transmission: 'Manuel', available: true, featured: true },
    { id: 'V002', name: 'Renault Clio', type: 'Compact', seats: 5, pricePerDay: 50, transmission: 'Automatique', available: true, featured: false },
    { id: 'V003', name: 'Hyundai Santa Fe', type: 'SUV', seats: 7, pricePerDay: 95, transmission: 'Automatique', available: true, featured: true },
    { id: 'V004', name: 'Toyota Coaster', type: 'Minibus', seats: 15, pricePerDay: 150, transmission: 'Manuel', available: false, featured: false },
    { id: 'V005', name: 'Peugeot 208', type: 'Compact', seats: 5, pricePerDay: 45, transmission: 'Manuel', available: true, featured: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    // Simule la suppression d'un véhicule
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    
    toast({
      title: "Véhicule supprimé",
      description: "Le véhicule a été supprimé avec succès",
    });
  };

  const handleToggleAvailable = (id: string) => {
    // Simule la modification de la disponibilité
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === id ? { ...vehicle, available: !vehicle.available } : vehicle
    ));
  };

  const handleToggleFeatured = (id: string) => {
    // Simule la modification du statut mis en avant
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === id ? { ...vehicle, featured: !vehicle.featured } : vehicle
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
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/admin/vehicles/bookings">
              <Car className="mr-2 h-4 w-4" />
              Réservations
            </Link>
          </Button>
          <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            <Link to="/admin/vehicles/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un Véhicule
            </Link>
          </Button>
        </div>
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
                <DropdownMenuItem>Mis en avant</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>SUV</DropdownMenuItem>
                <DropdownMenuItem>Compact</DropdownMenuItem>
                <DropdownMenuItem>Berline</DropdownMenuItem>
                <DropdownMenuItem>Minibus</DropdownMenuItem>
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
                <DropdownMenuItem>Capacité (croissante)</DropdownMenuItem>
                <DropdownMenuItem>Capacité (décroissante)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du Véhicule</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Places</TableHead>
                <TableHead>Transmission</TableHead>
                <TableHead className="text-right">Prix/jour</TableHead>
                <TableHead>Disponibilité</TableHead>
                <TableHead>Mis en avant</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Aucun véhicule trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.name}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell className="text-center">{vehicle.seats}</TableCell>
                    <TableCell>{vehicle.transmission}</TableCell>
                    <TableCell className="text-right">{vehicle.pricePerDay} €/jour</TableCell>
                    <TableCell>
                      <Badge variant={vehicle.available ? "default" : "secondary"} className={vehicle.available ? "bg-green-500" : ""}>
                        {vehicle.available ? "Disponible" : "Non disponible"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={vehicle.featured ? "default" : "outline"}>
                        {vehicle.featured ? "Mis en avant" : "Non"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/services/car-rental#${vehicle.id}`}>
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
                            <DropdownMenuItem onClick={() => handleToggleFeatured(vehicle.id)}>
                              {vehicle.featured ? "Retirer de la une" : "Mettre en une"}
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
