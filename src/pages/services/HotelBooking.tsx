
import React from 'react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Calendar, Users, Wifi, Coffee, Utensils, Waves, Star, Search } from 'lucide-react';

const HotelBooking = () => {
  const hotels = [
    {
      id: 1,
      name: "Royal Beach Resort & Spa",
      location: "Nosy Be",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      description: "Resort de luxe avec vue imprenable sur l'océan",
      price: 150,
      rating: 4.8,
      amenities: ["wifi", "pool", "restaurant", "spa"]
    },
    {
      id: 2,
      name: "Lemur Lodge",
      location: "Andasibe",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      description: "Eco-lodge au cœur de la forêt tropicale",
      price: 85,
      rating: 4.5,
      amenities: ["wifi", "restaurant", "tours"]
    },
    {
      id: 3,
      name: "Baobab Palace Hotel",
      location: "Antananarivo",
      image: "https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5",
      description: "Hôtel de ville élégant avec restaurant panoramique",
      price: 110,
      rating: 4.2,
      amenities: ["wifi", "restaurant", "bar", "gym"]
    },
    {
      id: 4,
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

  return (
    <>
      <Hero
        title="Réservation d'Hôtels à Madagascar"
        subtitle="Des hébergements pour tous les budgets, du luxe aux options économiques"
        showSearch={false}
        height="h-[60vh]"
        backgroundImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
      />

      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="glass-card p-8 rounded-xl mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="destination" variant="glass">Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="destination"
                        placeholder="Ville ou région"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="check-in" variant="glass">Arrivée</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="check-in"
                        type="date"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-out" variant="glass">Départ</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="check-out"
                        type="date"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests" variant="glass">Voyageurs</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        defaultValue="2"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rooms" variant="glass">Chambres</Label>
                    <Input
                      id="rooms"
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="glass-input"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full bg-northgascar-teal hover:bg-northgascar-teal/80">
                  <Search size={18} className="mr-2" /> Rechercher
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hébergements Recommandés</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection d'hébergements à travers Madagascar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel) => (
              <Card key={hotel.id} variant="glass" className="overflow-hidden hover-scale">
                <div className="aspect-[4/3] relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="glass" className="flex items-center gap-1">
                      <Star size={12} className="fill-northgascar-yellow text-northgascar-yellow" /> 
                      {hotel.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{hotel.name}</h3>
                    <div className="text-lg font-semibold text-northgascar-teal">{hotel.price}€<span className="text-sm font-normal text-muted-foreground">/nuit</span></div>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin size={14} className="mr-1" /> {hotel.location}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{hotel.description}</p>
                  
                  <div className="flex space-x-2 mb-4">
                    {hotel.amenities.map((amenity, index) => (
                      <div key={index} className="text-muted-foreground" title={amenity}>
                        {renderAmenityIcon(amenity)}
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="default" className="w-full bg-northgascar-teal hover:bg-northgascar-teal/80">
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelBooking;
