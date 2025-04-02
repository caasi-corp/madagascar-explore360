
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import TourTable from '@/components/admin/tour/TourTable';
import TourFilters from '@/components/admin/tour/TourFilters';

interface Tour {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
  featured: boolean;
  active: boolean;
}

const AdminTours = () => {
  const [tours, setTours] = useState<Tour[]>([
    { id: '1', name: 'Avenue des Baobabs', duration: 3, price: 599, category: 'Nature', featured: true, active: true },
    { id: '2', name: 'Trekking aux Lémuriens', duration: 2, price: 349, category: 'Aventure', featured: false, active: true },
    { id: '3', name: 'Parc National d\'Isalo', duration: 4, price: 499, category: 'Nature', featured: true, active: true },
    { id: '4', name: 'Île de Nosy Be', duration: 5, price: 699, category: 'Plage', featured: false, active: true },
    { id: '5', name: 'Tsingy de Bemaraha', duration: 4, price: 549, category: 'Aventure', featured: false, active: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    // Simule la suppression d'un circuit
    setTours(tours.filter(tour => tour.id !== id));
    
    toast({
      title: "Circuit supprimé",
      description: "Le circuit a été supprimé avec succès",
      variant: "default",
    });
  };

  const handleToggleStatus = (id: string) => {
    // Simule la modification du statut d'un circuit
    setTours(tours.map(tour => 
      tour.id === id ? { ...tour, active: !tour.active } : tour
    ));
  };

  const handleToggleFeatured = (id: string) => {
    // Simule la modification du statut mis en avant
    setTours(tours.map(tour => 
      tour.id === id ? { ...tour, featured: !tour.featured } : tour
    ));
  };

  const filteredTours = tours.filter(tour => 
    tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Circuits</h1>
        <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
          <Link to="/admin/tours/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un Circuit
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <TourFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <TourTable 
            tours={filteredTours} 
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onToggleFeatured={handleToggleFeatured}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTours;
