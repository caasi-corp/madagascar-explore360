
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import TourCard, { TourProps } from '@/components/TourCard';
import VehicleCard, { VehicleProps } from '@/components/VehicleCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  MapPin, 
  Car, 
  Plane, 
  Building, 
  ArrowRight,
  CheckCircle,
  HeartHandshake,
  ShieldCheck,
  Map,
} from 'lucide-react';

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
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Popular Tours & Excursions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore Madagascar's most popular destinations with our guided tours
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
              <a href="/tours">
                View All Tours <ArrowRight size={16} className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete travel solutions for your Madagascar adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 mx-auto bg-madagascar-green/10 w-16 h-16 rounded-full flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button variant="link" asChild className="text-madagascar-green">
                    <a href={service.link}>
                      Learn more <ArrowRight size={16} className="ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Vehicle Rental Section */}
      <section className="section-padding bg-gradient-to-b from-madagascar-blue to-madagascar-blue/80 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Explore Your Way</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Choose from our fleet of well-maintained vehicles for the perfect Madagascar adventure
            </p>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-white/10">
                <TabsTrigger value="all">All Vehicles</TabsTrigger>
                <TabsTrigger value="4x4">4x4</TabsTrigger>
                <TabsTrigger value="car">Cars</TabsTrigger>
                <TabsTrigger value="motorcycle">Motorcycles</TabsTrigger>
                <TabsTrigger value="quad">Quads</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="4x4" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.filter(v => v.type === '4x4').map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </TabsContent>
            
            {/* Add other tabs content for different vehicle types */}
            <TabsContent value="motorcycle" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.filter(v => v.type === 'motorcycle').map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="quad" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.filter(v => v.type === 'quad').map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-10 text-center">
            <Button asChild className="bg-white hover:bg-white/90 text-madagascar-blue">
              <a href="/services/car-rental">
                View All Vehicles <ArrowRight size={16} className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose North Gascar Tours</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing unforgettable experiences with safety, sustainability, and quality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="mx-auto mb-4 bg-madagascar-blue/10 w-16 h-16 rounded-full flex items-center justify-center">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call To Action Section */}
      <section className="py-16 px-4 bg-madagascar-green/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Madagascar Adventure?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Start planning your trip today and experience the wonders of Madagascar with North Gascar Tours
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
              <a href="/tours">
                <Calendar className="mr-2 h-5 w-5" /> Book a Tour
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/contact">
                <MapPin className="mr-2 h-5 w-5" /> Contact Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
