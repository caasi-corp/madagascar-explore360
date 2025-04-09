
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import TourTable from '@/components/admin/tours/TourTable';
import TourFilterBar from '@/components/admin/tours/TourFilterBar';
import { useAdminTours } from '@/hooks/useAdminTours';

const AdminTours = () => {
  const { 
    filteredTours, 
    searchTerm, 
    setSearchTerm, 
    handleDelete, 
    handleToggleStatus, 
    handleToggleFeatured 
  } = useAdminTours();
  const { toast } = useToast();

  const onDelete = (id: string) => {
    const result = handleDelete(id);
    if (result) {
      toast({
        title: "Circuit supprimé",
        description: "Le circuit a été supprimé avec succès",
        variant: "default",
      });
    }
  };

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
          <TourFilterBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />

          <TourTable 
            tours={filteredTours} 
            handleDelete={onDelete}
            handleToggleStatus={handleToggleStatus}
            handleToggleFeatured={handleToggleFeatured}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTours;
