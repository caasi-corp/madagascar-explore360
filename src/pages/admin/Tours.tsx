
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
  MoreVertical 
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
import { tourAPI } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';

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
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Rechercher un circuit..." 
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
                <DropdownMenuItem>Tous les circuits</DropdownMenuItem>
                <DropdownMenuItem>Circuits actifs</DropdownMenuItem>
                <DropdownMenuItem>Circuits inactifs</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Mis en avant</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Nature</DropdownMenuItem>
                <DropdownMenuItem>Aventure</DropdownMenuItem>
                <DropdownMenuItem>Plage</DropdownMenuItem>
                <DropdownMenuItem>Culture</DropdownMenuItem>
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
                <DropdownMenuItem>Durée (courte à longue)</DropdownMenuItem>
                <DropdownMenuItem>Durée (longue à courte)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
              {filteredTours.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucun circuit trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredTours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell className="font-medium">{tour.name}</TableCell>
                    <TableCell>{tour.category}</TableCell>
                    <TableCell>{tour.duration} jours</TableCell>
                    <TableCell className="text-right">{tour.price} €</TableCell>
                    <TableCell>
                      <Badge variant={tour.active ? "success" : "secondary"}>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTours;
