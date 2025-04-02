
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/hero/Hero';
import { Heading2, Lead } from '@/components/common/Typography';
import { Shield, Map, Users, Star, Car, Calendar, Building, Globe } from 'lucide-react';
import FeaturedTours from '@/components/sections/FeaturedTours';
import Advantages from '@/components/sections/Advantages';
import Services from '@/components/sections/Services';
import VehicleSection from '@/components/sections/VehicleSection';
import CallToAction from '@/components/sections/CallToAction';

const Index = () => {
  const heroProps = {
    title: "Explorez Madagascar comme Jamais Auparavant",
    subtitle: "Découvrez la magie de la Grande Île avec des expériences authentiques et des aventures inoubliables",
    cta: {
      primary: {
        text: "Explorer Nos Circuits",
        link: "/tours"
      },
      secondary: {
        text: "Contactez-Nous",
        link: "/contact"
      }
    },
    images: [
      "/lovable-uploads/f8c8f079-7776-45ac-a077-6570cfbb7fcf.png",
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  };

  const advantages = [
    {
      title: "Sécurité Garantie",
      description: "Voyagez en toute sérénité avec nos guides expérimentés et nos véhicules bien entretenus",
      icon: <Shield className="w-8 h-8 text-northgascar-navy dark:text-northgascar-teal" />
    },
    {
      title: "Expertise Locale",
      description: "Bénéficiez des connaissances approfondies de nos guides natifs de Madagascar",
      icon: <Map className="w-8 h-8 text-northgascar-navy dark:text-northgascar-teal" />
    },
    {
      title: "Expériences Authentiques",
      description: "Immergez-vous dans la culture malgache avec des rencontres authentiques",
      icon: <Users className="w-8 h-8 text-northgascar-navy dark:text-northgascar-teal" />
    }
  ];

  const services = [
    {
      title: "Circuits Touristiques",
      description: "Des parcours sur mesure pour découvrir les merveilles de Madagascar",
      icon: <Globe className="w-6 h-6 text-madagascar-green" />,
      link: "/tours"
    },
    {
      title: "Location de Voitures",
      description: "Une flotte de véhicules adaptés à tous les types de terrains",
      icon: <Car className="w-6 h-6 text-madagascar-green" />,
      link: "/services/car-rental"
    },
    {
      title: "Réservation d'Hôtels",
      description: "Des hébergements soigneusement sélectionnés pour votre confort",
      icon: <Building className="w-6 h-6 text-madagascar-green" />,
      link: "/services/hotel-booking"
    },
    {
      title: "Vols Domestiques",
      description: "Organisation de vos déplacements internes en avion",
      icon: <Calendar className="w-6 h-6 text-madagascar-green" />,
      link: "/services/flight-booking"
    }
  ];

  const vehicles = [
    {
      id: "v1",
      name: "Toyota Land Cruiser",
      type: "4x4",
      pricePerDay: 80,
      seats: 7,
      transmission: "Automatic",
      fuelType: "Diesel",
      image: "/placeholder.svg",
      features: ["Climatisation", "GPS", "Bluetooth", "Toit ouvrant"],
      availability: true
    },
    {
      id: "v2",
      name: "Hyundai i10",
      type: "car",
      pricePerDay: 35,
      seats: 4,
      transmission: "Manual",
      fuelType: "Essence",
      image: "/placeholder.svg",
      features: ["Économique", "Facile à conduire", "Idéal pour la ville"],
      availability: true
    },
    {
      id: "v3",
      name: "Yamaha XT660",
      type: "motorcycle",
      pricePerDay: 45,
      seats: 2,
      transmission: "Manual",
      fuelType: "Essence",
      image: "/placeholder.svg",
      features: ["Trail", "Tout terrain", "Légère"],
      availability: true
    }
  ];

  const featuredTours = [
    {
      id: "tour1",
      title: "Avenue des Baobabs",
      location: "Morondava",
      description: "Découvrez les majestueux baobabs de Madagascar au coucher du soleil",
      duration: "3 Jours", // Changed from number to string
      price: 299,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 124,
      featured: true,
      categories: ["Nature", "Photographie"]
    },
    {
      id: "tour2",
      title: "Trek dans l'Isalo",
      location: "Parc National de l'Isalo",
      description: "Une randonnée mémorable à travers des formations rocheuses spectaculaires",
      duration: "5 Jours", // Changed from number to string
      price: 499,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 89,
      featured: true,
      categories: ["Aventure", "Randonnée"]
    },
    {
      id: "tour3",
      title: "Plages de Nosy Be",
      location: "Nosy Be",
      description: "Détendez-vous sur les plages paradisiaques de l'île aux parfums",
      duration: "7 Jours", // Changed from number to string
      price: 799,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 156,
      featured: true,
      categories: ["Plage", "Détente"]
    },
    {
      id: "tour4",
      title: "Tsingy de Bemaraha",
      location: "Parc National de Bemaraha",
      description: "Explorez ce labyrinthe de formations karstiques unique au monde",
      duration: "6 Jours", // Changed from number to string
      price: 649,
      image: "/placeholder.svg",
      rating: 5.0,
      reviews: 72,
      featured: true,
      categories: ["Aventure", "UNESCO"]
    }
  ];

  return (
    <Layout>
      <Hero {...heroProps} />
      
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <Heading2 className="mb-6">Bienvenue chez North Gascar Tours</Heading2>
          <Lead className="mb-8 text-muted-foreground">
            Votre partenaire de confiance pour explorer les merveilles cachées de Madagascar, 
            de ses paysages spectaculaires à sa faune et flore uniques au monde.
          </Lead>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Star className="text-northgascar-yellow h-5 w-5" />
              <span className="font-bold">4.9/5</span>
              <span className="text-muted-foreground">(230+ avis)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-northgascar-teal h-5 w-5" />
              <span>Plus de 5000 clients satisfaits</span>
            </div>
          </div>
        </div>
      </section>
      
      <Advantages advantages={advantages} />
      <FeaturedTours tours={featuredTours} />
      <Services services={services} />
      <VehicleSection vehicles={vehicles} />
      <CallToAction />
    </Layout>
  );
};

export default Index;
