
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

const Index = () => {
  const toursData = useFeaturedTours();
  const services = useServicesData();
  const vehiclesData = useVehicles();
  const advantages = useAdvantages();

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
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
