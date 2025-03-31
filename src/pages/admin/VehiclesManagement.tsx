
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { VehicleProps } from '@/components/VehicleCard';
import { useNavigate } from 'react-router-dom';

const DEMO_VEHICLES: VehicleProps[] = [
  {
    id: 'v1',
    name: 'Toyota Land Cruiser',
    type: '4x4',
    pricePerDay: 89,
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
    features: ['Climatisation', 'GPS', 'Porte-bagages', '4x4', 'Bluetooth', 'Ports USB'],
    availability: true,
  },
  {
    id: 'v2',
    name: 'Yamaha TW200',
    type: 'motorcycle',
    pricePerDay: 45,
    seats: 2,
    transmission: 'Manual',
    fuelType: 'Essence',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    features: ['Casque inclus', 'Sacoches', 'Capacité tout-terrain', 'Économe en carburant'],
    availability: true,
  },
  {
    id: 'v3',
    name: 'BRP Can-Am Outlander',
    type: 'quad',
    pricePerDay: 65,
    seats: 1,
    transmission: 'Automatic',
    fuelType: 'Essence',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
    features: ['Casque inclus', 'Coffre de rangement', '4x4', 'Garde au sol élevée'],
    availability: false,
  },
];

const VehiclesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState(DEMO_VEHICLES);
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/admin/vehicles/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/vehicles/edit/${id}`);
  };

  const handleView = (id: string) => {
    window.open(`/services/car-rental?vehicle=${id}`, '_blank');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule?')) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    }
  };

  const handleToggleAvailability = (id: string) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === id ? { ...vehicle, availability: !vehicle.availability } : vehicle
    ));
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatedContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Véhicules</h1>
        <Button onClick={handleAddNew} className="bg-madagascar-green hover:bg-madagascar-green/80">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Véhicule
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Véhicules ({vehicles.length})</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou type..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" /> Filtres
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
                  <TableRow key={vehicle.id}>
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
                        onClick={() => handleToggleAvailability(vehicle.id)}
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
                          onClick={() => handleView(vehicle.id)}
                          title="Voir"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(vehicle.id)}
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(vehicle.id)}
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
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
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default VehiclesManagement;
