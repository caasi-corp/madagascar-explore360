
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
  Filter,
  Star,
  MapPin,
  Wifi,
  Coffee,
  Utensils,
  Waves,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { useNavigate } from 'react-router-dom';

interface HotelType {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
}

const DEMO_HOTELS: HotelType[] = [
  {
    id: "h1",
    name: "Royal Beach Resort & Spa",
    location: "Nosy Be",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Resort de luxe avec vue imprenable sur l'océan",
    price: 150,
    rating: 4.8,
    amenities: ["wifi", "pool", "restaurant", "spa"]
  },
  {
    id: "h2",
    name: "Lemur Lodge",
    location: "Andasibe",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    description: "Eco-lodge au cœur de la forêt tropicale",
    price: 85,
    rating: 4.5,
    amenities: ["wifi", "restaurant", "tours"]
  },
  {
    id: "h3",
    name: "Baobab Palace Hotel",
    location: "Antananarivo",
    image: "https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5",
    description: "Hôtel de ville élégant avec restaurant panoramique",
    price: 110,
    rating: 4.2,
    amenities: ["wifi", "restaurant", "bar", "gym"]
  },
  {
    id: "h4",
    name: "Sands Beach Bungalows",
    location: "Toamasina",
    image: "https://images.unsplash.com/photo-1614957004131-9e8f2a13753c",
    description: "Bungalows simples et confortables en bord de plage",
    price: 65,
    rating: 4.0,
    amenities: ["wifi", "beach", "restaurant"]
  }
];

const renderAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case 'wifi': return <Wifi size={16} />;
    case 'restaurant': return <Utensils size={16} />;
    case 'pool': return <Waves size={16} />;
    case 'breakfast': return <Coffee size={16} />;
    default: return null;
  }
};

const HotelsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hotels, setHotels] = useState(DEMO_HOTELS);
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/admin/hotels/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/hotels/edit/${id}`);
  };

  const handleView = (id: string) => {
    window.open(`/services/hotels?hotel=${id}`, '_blank');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet hôtel?')) {
      setHotels(hotels.filter(hotel => hotel.id !== id));
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatedContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Hôtels</h1>
        <Button onClick={handleAddNew} className="bg-madagascar-green hover:bg-madagascar-green/80">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Hôtel
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Hôtels ({hotels.length})</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, lieu ou description..."
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
            <TableCaption>Liste des hôtels disponibles</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Lieu</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Prix/Nuit</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Équipements</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="h-12 w-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{hotel.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hotel.location}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{hotel.description}</TableCell>
                    <TableCell>{formatPrice(hotel.price)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        {hotel.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {hotel.amenities.map((amenity, idx) => (
                          <span key={idx} title={amenity} className="text-muted-foreground">
                            {renderAmenityIcon(amenity)}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(hotel.id)}
                          title="Voir"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(hotel.id)}
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(hotel.id)}
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
                    Aucun hôtel trouvé avec ces critères de recherche.
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

export default HotelsManagement;
