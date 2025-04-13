
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedToursSection from '@/components/sections/FeaturedToursSection';
import ServicesSection from '@/components/sections/ServicesSection';
import VehicleSection from '@/components/sections/VehicleSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import CallToAction from '@/components/sections/CallToAction';
import { useServicesData } from '@/hooks/useServicesData';
import { useVehicles } from '@/hooks/useVehicles';
import { useAdvantages } from '@/hooks/useAdvantages';
import { useFeaturedTours } from '@/hooks/useFeaturedTours';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { featuredTours, loading, error, refetch } = useFeaturedTours();
  const services = useServicesData();
  const vehicles = useVehicles();
  const advantages = useAdvantages();
  const { toast } = useToast();

  // Show error toast if there's an error loading tours
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les circuits. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  console.log("Index rendering with tours:", featuredTours, "loading:", loading);

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Tours Section */}
      <FeaturedToursSection 
        tours={featuredTours} 
        loading={loading} 
        onRefresh={refetch}
      />
      
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
