
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
  Building
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
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Rechercher un hôtel..." 
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
                <DropdownMenuItem>Tous les hôtels</DropdownMenuItem>
                <DropdownMenuItem>Hôtels disponibles</DropdownMenuItem>
                <DropdownMenuItem>Hôtels non disponibles</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Mis en avant</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>5 étoiles</DropdownMenuItem>
                <DropdownMenuItem>4 étoiles</DropdownMenuItem>
                <DropdownMenuItem>3 étoiles</DropdownMenuItem>
                <DropdownMenuItem>2 étoiles</DropdownMenuItem>
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
                <DropdownMenuItem>Étoiles (croissant)</DropdownMenuItem>
                <DropdownMenuItem>Étoiles (décroissant)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
              {filteredHotels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucun hôtel trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredHotels.map((hotel) => (
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
                            <DropdownMenuItem onClick={() => handleToggleAvailable(hotel.id)}>
                              {hotel.available ? "Marquer indisponible" : "Marquer disponible"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleFeatured(hotel.id)}>
                              {hotel.featured ? "Retirer de la une" : "Mettre en une"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(hotel.id)}
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

export default AdminHotels;
