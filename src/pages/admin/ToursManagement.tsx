
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
import { TourProps } from '@/components/TourCard';
import { useNavigate } from 'react-router-dom';

const DEMO_TOURS: TourProps[] = [
  {
    id: '1',
    title: 'Circuit Allée des Baobabs',
    description: 'Découvrez l\'emblématique Allée des Baobabs, l\'un des sites les plus célèbres de Madagascar.',
    location: 'Morondava',
    duration: '2 Jours',
    price: 299,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    featured: true,
    category: 'Nature',
  },
  {
    id: '2',
    title: 'Randonnée Lémuriens à Andasibe',
    description: 'Randonnez à travers le Parc National d\'Andasibe et rencontrez différentes espèces de lémuriens dans leur habitat naturel.',
    location: 'Andasibe',
    duration: '3 Jours',
    price: 349,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    featured: true,
    category: 'Faune',
  },
  {
    id: '3',
    title: 'Aventure au Parc National de l\'Isalo',
    description: 'Découvrez les paysages époustouflants du Parc National de l\'Isalo avec ses canyons, cascades et piscines naturelles.',
    location: 'Isalo',
    duration: '4 Jours',
    price: 499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
    featured: true,
    category: 'Aventure',
  },
  {
    id: '4',
    title: 'Paradis de l\'île de Nosy Be',
    description: 'Détendez-vous sur les magnifiques plages de Nosy Be, la principale destination balnéaire de Madagascar.',
    location: 'Nosy Be',
    duration: '5 Jours',
    price: 599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
    featured: false,
    category: 'Plage',
  },
];

const ToursManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tours, setTours] = useState(DEMO_TOURS);
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/admin/tours/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/tours/edit/${id}`);
  };

  const handleView = (id: string) => {
    // Open in a new tab
    window.open(`/tours/${id}`, '_blank');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce circuit?')) {
      setTours(tours.filter(tour => tour.id !== id));
    }
  };

  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatedContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Circuits</h1>
        <Button onClick={handleAddNew} className="bg-madagascar-green hover:bg-madagascar-green/80">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Circuit
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Circuits ({tours.length})</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par titre, lieu ou catégorie..."
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
            <TableCaption>Liste des circuits disponibles</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Lieu</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Mis en avant</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell>
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="h-12 w-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{tour.title}</TableCell>
                    <TableCell>{tour.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-muted/50">
                        {tour.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{tour.duration}</TableCell>
                    <TableCell>{tour.price}€</TableCell>
                    <TableCell>
                      {tour.featured ? (
                        <Badge className="bg-madagascar-green">Oui</Badge>
                      ) : (
                        <Badge variant="outline">Non</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(tour.id)}
                          title="Voir"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(tour.id)}
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(tour.id)}
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
                    Aucun circuit trouvé avec ces critères de recherche.
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

export default ToursManagement;
