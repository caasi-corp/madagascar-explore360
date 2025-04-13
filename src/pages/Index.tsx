
import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import FeaturedToursSection from '@/components/sections/FeaturedToursSection';
import ServicesSection from '@/components/sections/ServicesSection';
import VehicleSection from '@/components/sections/VehicleSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import CallToAction from '@/components/sections/CallToAction';
import { useServicesData } from '@/hooks/useServicesData';
import { useVehicles } from '@/hooks/useVehicles';
import { useAdvantages } from '@/hooks/useAdvantages';
import { tourAPI } from '@/lib/store';
import { Tour } from '@/lib/db/schema';

const Index = () => {
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const services = useServicesData();
  const vehicles = useVehicles();
  const advantages = useAdvantages();

  useEffect(() => {
    const loadFeaturedTours = async () => {
      try {
        setLoading(true);
        const tours = await tourAPI.getFeatured();
        console.log('Tours chargés:', tours);
        setFeaturedTours(tours);
      } catch (error) {
        console.error('Erreur lors du chargement des tours:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedTours();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Tours Section */}
      {loading ? (
        <div className="section-padding bg-muted/30">
          <div className="container mx-auto text-center">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-madagascar-green border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-madagascar-blue dark:text-madagascar-yellow">Chargement des circuits...</p>
            </div>
          </div>
        </div>
      ) : (
        <FeaturedToursSection tours={featuredTours} />
      )}
      
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
