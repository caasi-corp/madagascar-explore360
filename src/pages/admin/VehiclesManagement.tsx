
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { VehicleProps } from '@/components/VehicleCard';
import { useNavigate } from 'react-router-dom';
import VehiclesHeader from '@/components/admin/vehicles/VehiclesHeader';
import VehiclesSearchBar from '@/components/admin/vehicles/VehiclesSearchBar';
import VehiclesTable from '@/components/admin/vehicles/VehiclesTable';

// Sample data - in a real application, this would come from an API
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

  return (
    <AnimatedContainer className="space-y-6">
      <VehiclesHeader onAddNew={handleAddNew} />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Véhicules ({vehicles.length})</CardTitle>
          <VehiclesSearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </CardHeader>
        <CardContent>
          <VehiclesTable 
            vehicles={vehicles}
            searchTerm={searchTerm}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            onToggleAvailability={handleToggleAvailability}
          />
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default VehiclesManagement;
