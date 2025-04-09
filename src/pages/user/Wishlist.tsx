
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, Users, Clock, MapPin, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

// Mock wishlist data
const mockWishlistItems = [
  {
    id: 1,
    name: 'Avenue des Baobabs',
    image: '/placeholder.svg',
    location: 'Morondava',
    duration: '3 jours',
    price: 599,
    rating: 4.8,
    reviewCount: 48
  },
  {
    id: 2,
    name: 'Parc National de l\'Isalo',
    image: '/placeholder.svg',
    location: 'Ranohira',
    duration: '4 jours',
    price: 699,
    rating: 4.9,
    reviewCount: 36
  },
  {
    id: 3,
    name: 'Nosy Be - Île paradisiaque',
    image: '/placeholder.svg',
    location: 'Nosy Be',
    duration: '5 jours',
    price: 899,
    rating: 4.7,
    reviewCount: 64
  }
];

const Wishlist: React.FC = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = React.useState(mockWishlistItems);

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Ma Liste de Souhaits</h1>
        <p className="text-muted-foreground">
          Retrouvez ici les circuits que vous avez enregistrés pour plus tard
        </p>
      </div>
      
      {wishlist.length === 0 ? (
        <Card className="border border-dashed">
          <CardContent className="flex flex-col items-center justify-center text-center p-10">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Votre liste de souhaits est vide</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Vous n'avez pas encore ajouté de circuits à votre liste de souhaits. 
              Explorez nos circuits et cliquez sur le cœur pour les sauvegarder ici.
            </p>
            <Button asChild className="bg-northgascar-teal hover:bg-northgascar-teal/80 text-white">
              <a href="/tours">Explorer les circuits</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {wishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col md:flex-row">
              <div className="relative h-48 md:h-auto md:w-2/5">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span className="text-sm">{item.location}</span>
                    </div>
                  </div>
                  <button 
                    className="text-destructive hover:bg-destructive/10 p-1 rounded-full"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-auto pt-3">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1 text-northgascar-teal" />
                    <span className="text-sm">{item.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1 text-northgascar-teal" />
                    <span className="text-sm">Disponible</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-yellow-500 mr-1">★</span>
                    <span className="text-sm">{item.rating} ({item.reviewCount} avis)</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t">
                  <div className="font-bold text-lg mb-3 sm:mb-0">
                    À partir de {item.price} €
                  </div>
                  <Button asChild className="w-full sm:w-auto bg-northgascar-teal hover:bg-northgascar-teal/80 text-white">
                    <a href={`/tours/${item.id}`}>Voir le circuit</a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
