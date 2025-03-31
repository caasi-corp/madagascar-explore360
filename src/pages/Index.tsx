import React from 'react';
import Hero from '@/components/Hero';
import { TourProps } from '@/components/TourCard';
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
  // Sample tour data with enhanced information
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
      groupSize: 12,
      difficulty: 'Facile',
      language: ['Français', 'Anglais'],
      startDate: '15/05/2025',
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
      groupSize: 8,
      difficulty: 'Modéré',
      language: ['Français', 'Anglais', 'Malgache'],
      startDate: '02/06/2025',
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
      groupSize: 10,
      difficulty: 'Modéré',
      language: ['Français', 'Anglais'],
      startDate: '10/06/2025',
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
      featured: true,
      category: 'Plage',
      groupSize: 14,
      difficulty: 'Facile',
      language: ['Français', 'Anglais', 'Italien'],
      startDate: '22/06/2025',
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
      <VehicleSection />
      
      {/* Why Choose Us Section */}
      <Advantages advantages={advantages} />
      
      {/* Call To Action Section */}
      <CallToAction />
    </>
  );
};

export default Index;
