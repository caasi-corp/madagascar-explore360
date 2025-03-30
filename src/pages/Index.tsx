
import React from 'react';
import Layout from '@/components/Layout';
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
  // Sample tour data
  const featuredTours: TourProps[] = [
    {
      id: '1',
      title: 'Avenue of the Baobabs Tour',
      description: 'Experience the iconic Avenue of the Baobabs, one of Madagascar\'s most famous landmarks.',
      location: 'Morondava',
      duration: '2 Days',
      price: 299,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      featured: true,
      category: 'Nature',
    },
    {
      id: '2',
      title: 'Lemur Trekking in Andasibe',
      description: 'Trek through the Andasibe National Park and encounter various species of lemurs in their natural habitat.',
      location: 'Andasibe',
      duration: '3 Days',
      price: 349,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      featured: true,
      category: 'Wildlife',
    },
    {
      id: '3',
      title: 'Isalo National Park Adventure',
      description: 'Discover the stunning landscapes of Isalo National Park with its canyons, waterfalls and natural pools.',
      location: 'Isalo',
      duration: '4 Days',
      price: 499,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
      featured: true,
      category: 'Adventure',
    },
    {
      id: '4',
      title: 'Nosy Be Island Paradise',
      description: 'Relax on the beautiful beaches of Nosy Be, Madagascar\'s premier beach destination.',
      location: 'Nosy Be',
      duration: '5 Days',
      price: 599,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
      featured: false,
      category: 'Beach',
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
      features: ['Air Conditioning', 'GPS Navigation', 'Roof Rack', '4x4 Drive', 'Bluetooth', 'USB Ports'],
      availability: true,
    },
    {
      id: 'v2',
      name: 'Yamaha TW200',
      type: 'motorcycle',
      pricePerDay: 45,
      seats: 2,
      transmission: 'Manual',
      fuelType: 'Petrol',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
      features: ['Helmet Included', 'Saddlebags', 'Off-road Capability', 'Fuel Efficient'],
      availability: true,
    },
    {
      id: 'v3',
      name: 'BRP Can-Am Outlander',
      type: 'quad',
      pricePerDay: 65,
      seats: 1,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      image: 'https://images.unsplash.com/photo-1566845735839-6e25c92269a1',
      features: ['Helmet Included', 'Storage Box', '4x4 Drive', 'High Ground Clearance'],
      availability: false,
    },
  ];

  // Services data
  const services = [
    {
      title: 'Tours & Excursions',
      description: 'Guided tours through Madagascar\'s most beautiful landscapes and wildlife reserves.',
      icon: <Map className="h-8 w-8 text-madagascar-green" />,
      link: '/tours',
    },
    {
      title: 'Vehicle Rental',
      description: 'Choose from our fleet of 4x4s, cars, motorcycles and quads for your adventure.',
      icon: <Car className="h-8 w-8 text-madagascar-green" />,
      link: '/services/car-rental',
    },
    {
      title: 'Flight Booking',
      description: 'Domestic and international flight reservations at competitive prices.',
      icon: <Plane className="h-8 w-8 text-madagascar-green" />,
      link: '/services/flights',
    },
    {
      title: 'Hotel Booking',
      description: 'Find the perfect accommodation, from luxury resorts to eco-lodges.',
      icon: <Building className="h-8 w-8 text-madagascar-green" />,
      link: '/services/hotels',
    },
  ];

  // Why choose us data
  const advantages = [
    {
      title: 'Expert Local Guides',
      description: 'Our knowledgeable guides are native to Madagascar and speak multiple languages.',
      icon: <CheckCircle className="h-8 w-8 text-madagascar-yellow" />,
    },
    {
      title: 'Sustainable Tourism',
      description: 'We are committed to environmental conservation and supporting local communities.',
      icon: <HeartHandshake className="h-8 w-8 text-madagascar-yellow" />,
    },
    {
      title: 'Safe & Reliable',
      description: 'Your safety is our priority with well-maintained vehicles and 24/7 customer support.',
      icon: <ShieldCheck className="h-8 w-8 text-madagascar-yellow" />,
    },
  ];

  return (
    <Layout>
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
    </Layout>
  );
};

export default Index;
