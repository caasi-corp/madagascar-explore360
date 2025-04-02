
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import HotelTable from '@/components/admin/hotel/HotelTable';
import HotelFilters from '@/components/admin/hotel/HotelFilters';

interface Hotel {
  id: string;
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  available: boolean;
  featured: boolean;
}

const AdminHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([
    { 
      id: 'H001', 
      name: 'Le Relais des Plateaux', 
      location: 'Antananarivo', 
      stars: 4, 
      pricePerNight: 120, 
      available: true, 
      featured: true 
    },
    { 
      id: 'H002', 
      name: 'Vanila Hotel & Spa', 
      location: 'Nosy Be', 
      stars: 5, 
      pricePerNight: 205, 
      available: true, 
      featured: true 
    },
    { 
      id: 'H003', 
      name: 'Manga Soa Lodge', 
      location: 'Isalo', 
      stars: 3, 
      pricePerNight: 85, 
      available: true, 
      featured: false 
    },
    { 
      id: 'H004', 
      name: 'Le Centrest Hotel', 
      location: 'Antananarivo', 
      stars: 3, 
      pricePerNight: 75, 
      available: false, 
      featured: false 
    },
    { 
      id: 'H005', 
      name: 'Princesse Bora Lodge', 
      location: 'Ile Sainte-Marie', 
      stars: 5, 
      pricePerNight: 245, 
      available: true, 
      featured: true 
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    // Simule la suppression d'un hôtel
    setHotels(hotels.filter(hotel => hotel.id !== id));
    
    toast({
      title: "Hôtel supprimé",
      description: "L'hôtel a été supprimé avec succès",
    });
  };

  const handleToggleAvailable = (id: string) => {
    // Simule la modification de la disponibilité
    setHotels(hotels.map(hotel => 
      hotel.id === id ? { ...hotel, available: !hotel.available } : hotel
    ));
  };

  const handleToggleFeatured = (id: string) => {
    // Simule la modification du statut mis en avant
    setHotels(hotels.map(hotel => 
      hotel.id === id ? { ...hotel, featured: !hotel.featured } : hotel
    ));
  };

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Hôtels</h1>
        <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
          <Link to="#">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un Hôtel
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <HotelFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <HotelTable 
            hotels={filteredHotels}
            onDelete={handleDelete}
            onToggleAvailable={handleToggleAvailable}
            onToggleFeatured={handleToggleFeatured}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHotels;
