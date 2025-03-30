import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import { TourProps } from '@/components/TourCard';
import { VehicleProps } from '@/components/VehicleCard';
import { 
  Map, 
  Car, 
  Plane, 
  Building, 
  CheckCircle,
  HeartHandshake,
  ShieldCheck,
} from 'lucide-react';
import FeaturedTours from '@/components/sections/FeaturedTours';
import Services from '@/components/sections/Services';
import VehicleSection from '@/components/sections/VehicleSection';
import Advantages from '@/components/sections/Advantages';
import CallToAction from '@/components/sections/CallToAction';

const Index = () => {
  useEffect(() => {
    console.log('Index page rendering - component mounted');
    
    return () => {
      console.log('Index page unmounting');
    };
  }, []);

  console.log('Index page render function running');

  // Sample tour data
  const featuredTours: TourProps[] = [
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

  // Sample vehicles data
  const vehicles: VehicleProps[] = [
    {
      id: 'v1',
      name: 'Toyota Land Cruiser',
      type: '4x4',
      pricePerDay: 89,
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
      features: ['Climatisation', 'GPS', 'Porte-bagages', '4x4', 'Bluetooth', 'Ports USB'],
      availability: true,
    },
    {
      id: 'v2',
      name: 'Yamaha TW200',
      type: 'motorcycle',
      pricePerDay: 45,
      seats: 2,
      transmission: 'Manual',
      fuelType: 'Essence',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
      features: ['Casque inclus', 'Sacoches', 'Capacité tout-terrain', 'Économe en carburant'],
      availability: true,
    },
    {
      id: 'v3',
      name: 'BRP Can-Am Outlander',
      type: 'quad',
      pricePerDay: 65,
      seats: 1,
      transmission: 'Automatic',
      fuelType: 'Essence',
      image: 'https://images.unsplash.com/photo-1566845735839-6e25c92269a1',
      features: ['Casque inclus', 'Coffre de rangement', '4x4', 'Garde au sol élevée'],
      availability: false,
    },
  ];

  // Services data
  const services = [
    {
      title: 'Circuits & Excursions',
      description: 'Visites guidées à travers les plus beaux paysages et réserves de faune de Madagascar.',
      icon: <Map className="h-8 w-8 text-madagascar-green" />,
      link: '/tours',
    },
    {
      title: 'Location de Véhicules',
      description: 'Choisissez parmi notre flotte de 4x4, voitures, motos et quads pour votre aventure.',
      icon: <Car className="h-8 w-8 text-madagascar-green" />,
      link: '/services/car-rental',
    },
    {
      title: 'Réservation de Vols',
      description: 'Réservations de vols nationaux et internationaux à des prix compétitifs.',
      icon: <Plane className="h-8 w-8 text-madagascar-green" />,
      link: '/services/flights',
    },
    {
      title: 'Réservation d\'Hôtels',
      description: 'Trouvez l\'hébergement parfait, des complexes de luxe aux éco-lodges.',
      icon: <Building className="h-8 w-8 text-madagascar-green" />,
      link: '/services/hotels',
    },
  ];

  // Why choose us data
  const advantages = [
    {
      title: 'Guides Locaux Experts',
      description: 'Nos guides compétents sont originaires de Madagascar et parlent plusieurs langues.',
      icon: <CheckCircle className="h-8 w-8 text-madagascar-yellow" />,
    },
    {
      title: 'Tourisme Durable',
      description: 'Nous sommes engagés dans la conservation de l\'environnement et le soutien aux communautés locales.',
      icon: <HeartHandshake className="h-8 w-8 text-madagascar-yellow" />,
    },
    {
      title: 'Sûr et Fiable',
      description: 'Votre sécurité est notre priorité avec des véhicules bien entretenus et un support client 24/7.',
      icon: <ShieldCheck className="h-8 w-8 text-madagascar-yellow" />,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Tours Section */}
      <FeaturedTours tours={featuredTours} />
      
      {/* Services Section */}
      <Services services={services} />
      
      {/* Vehicle Rental Section */}
      <VehicleSection vehicles={vehicles} />
      
      {/* Why Choose Us Section */}
      <Advantages advantages={advantages} />
      
      {/* Call To Action Section */}
      <CallToAction />
    </>
  );
};

export default Index;
