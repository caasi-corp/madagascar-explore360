
import React from 'react';
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
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  const toursData = useFeaturedTours();
  const services = useServicesData();
  const vehiclesData = useVehicles();
  const advantages = useAdvantages();
  
  // Vérifier s'il y a des erreurs globales de base de données
  const hasDBError = toursData.error || vehiclesData.error;

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Alerte d'erreur de base de données */}
      {hasDBError && (
        <div className="container mx-auto px-4 mt-6">
          <Alert variant="destructive">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              Problème de configuration de la base de données. Utilisation des données de secours.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {/* Featured Tours Section */}
      <FeaturedToursSection tours={toursData.tours} loading={toursData.loading} error={toursData.error} />
      
      {/* Services Section */}
      <ServicesSection services={services} />
      
      {/* Vehicle Rental Section */}
      <VehicleSection vehicles={vehiclesData} />
      
      {/* Why Choose Us Section */}
      <AdvantagesSection advantages={advantages} />
      
      {/* Call To Action Section */}
      <CallToAction />
    </>
  );
};

export default Index;
