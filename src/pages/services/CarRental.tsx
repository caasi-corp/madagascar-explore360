
import React from 'react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Shield, Tool, Clock } from 'lucide-react';

const CarRental = () => {
  const vehicles = [
    {
      id: 1,
      name: 'Toyota Land Cruiser',
      image: 'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe',
      description: 'Idéal pour les terrains difficiles et les longues distances',
      price: 95,
      seats: 7,
      transmission: 'Automatique',
      ac: true
    },
    {
      id: 2,
      name: 'Toyota Hilux',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7',
      description: 'Parfait pour les aventures hors des sentiers battus',
      price: 85,
      seats: 5,
      transmission: 'Manuelle',
      ac: true
    },
    {
      id: 3,
      name: 'Hyundai H1',
      image: 'https://images.unsplash.com/photo-1616634375264-2d2e17736a36',
      description: 'Spacieux et confortable pour les groupes',
      price: 75,
      seats: 9,
      transmission: 'Manuelle',
      ac: true
    },
    {
      id: 4,
      name: 'Kia Picanto',
      image: 'https://images.unsplash.com/photo-1600259828526-77f8617cebd9',
      description: 'Économique et parfait pour la ville',
      price: 45,
      seats: 5,
      transmission: 'Manuelle',
      ac: true
    }
  ];

  return (
    <>
      <Hero
        title="Location de Véhicules à Madagascar"
        subtitle="Des véhicules fiables et bien entretenus pour explorer Madagascar en toute liberté"
        showSearch={false}
        height="h-[60vh]"
        backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
      />

      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Flotte de Véhicules</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez parmi notre sélection de véhicules adaptés à tous les types de terrains et besoins
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} variant="glass" className="overflow-hidden hover-scale">
              <div className="aspect-[4/3] relative">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{vehicle.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <span className="font-semibold">Places:</span> {vehicle.seats}
                  </div>
                  <div>
                    <span className="font-semibold">Boîte:</span> {vehicle.transmission}
                  </div>
                  <div>
                    <span className="font-semibold">A/C:</span> {vehicle.ac ? 'Oui' : 'Non'}
                  </div>
                  <div>
                    <span className="font-semibold">Prix/jour:</span> {vehicle.price}€
                  </div>
                </div>
                
                <Button variant="default" className="w-full bg-northgascar-teal hover:bg-northgascar-teal/80">
                  Réserver
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Pourquoi Louer avec Nous?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-northgascar-teal mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Véhicules Fiables</h3>
                    <p className="text-muted-foreground">Tous nos véhicules sont régulièrement entretenus et inspectés pour assurer votre sécurité</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Shield className="text-northgascar-teal mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Assurance Complète</h3>
                    <p className="text-muted-foreground">Protection contre les dommages, le vol et la responsabilité civile incluse</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Tool className="text-northgascar-teal mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Assistance Routière 24/7</h3>
                    <p className="text-muted-foreground">Une équipe technique disponible à tout moment en cas de problème sur la route</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="text-northgascar-teal mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">Flexibilité</h3>
                    <p className="text-muted-foreground">Options de prise en charge et de retour flexibles selon vos besoins</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Demande de Réservation</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pickup-date" className="block mb-2 font-medium">Date de prise en charge</label>
                    <Input 
                      type="date"
                      id="pickup-date"
                      className="glass-input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="return-date" className="block mb-2 font-medium">Date de retour</label>
                    <Input 
                      type="date"
                      id="return-date"
                      className="glass-input"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="vehicle-type" className="block mb-2 font-medium">Type de véhicule</label>
                  <select id="vehicle-type" className="glass-input w-full h-10 px-3 rounded-md">
                    <option value="">Sélectionnez un véhicule</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Nom complet</label>
                  <Input 
                    type="text"
                    id="name"
                    className="glass-input"
                    placeholder="Votre nom et prénom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <Input 
                    type="email"
                    id="email"
                    className="glass-input"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">Téléphone</label>
                  <Input 
                    type="tel"
                    id="phone"
                    className="glass-input"
                    placeholder="Votre numéro de téléphone"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-northgascar-teal hover:bg-northgascar-teal/80">
                  Demander un Devis
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarRental;
