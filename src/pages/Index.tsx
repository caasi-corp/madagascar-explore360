
import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import FeaturedToursSection from '@/components/sections/FeaturedToursSection';
import ServicesSection from '@/components/sections/ServicesSection';
import VehicleSection from '@/components/sections/VehicleSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import CallToAction from '@/components/sections/CallToAction';
import { useFeaturedTours } from '@/hooks/useFeaturedTours';
import { useServicesData } from '@/hooks/useServicesData';
import { useVehicles } from '@/hooks/useVehicles';
import { useAdvantages } from '@/hooks/useAdvantages';
import { initDB } from '@/lib/DatabaseX/db';

const Index = () => {
  const tours = useFeaturedTours();
  const services = useServicesData();
  const vehicles = useVehicles();
  const advantages = useAdvantages();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // S'assurer que la base de données est initialisée
  useEffect(() => {
    const initializeDB = async () => {
      try {
        setIsLoading(true);
        await initDB();
        console.log('Base de données initialisée avec succès depuis la page d\'accueil');
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
        setError('Impossible de charger les données du site');
        setIsLoading(false);
      }
    };

    initializeDB();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Tours Section */}
      <FeaturedToursSection tours={tours} isLoading={isLoading} error={error} />
      
      {/* Services Section */}
      <ServicesSection services={services} />
      
      {/* Vehicle Rental Section */}
      <VehicleSection vehicles={vehicles} />
      
      {/* Why Choose Us Section */}
      <AdvantagesSection advantages={advantages} />
      
      {/* Call To Action Section */}
      <CallToAction />
    </>
  );
};

export default Index;
