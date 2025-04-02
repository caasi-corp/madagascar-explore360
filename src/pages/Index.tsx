
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/hero/Hero';
import WelcomeSection from '@/components/sections/WelcomeSection';
import FeaturedTours from '@/components/sections/FeaturedTours';
import Advantages from '@/components/sections/Advantages';
import Services from '@/components/sections/Services';
import VehicleSection from '@/components/sections/VehicleSection';
import CallToAction from '@/components/sections/CallToAction';

// Import data from separate files
import { heroContent } from '@/data/hero';
import { advantages } from '@/data/advantages';
import { featuredTours } from '@/data/tours';
import { services } from '@/data/services';
import { vehicles } from '@/data/vehicles';

const Index = () => {
  return (
    <Layout>
      <Hero {...heroContent} />
      <WelcomeSection />
      <Advantages advantages={advantages} />
      <FeaturedTours tours={featuredTours} />
      <Services services={services} />
      <VehicleSection vehicles={vehicles} />
      <CallToAction />
    </Layout>
  );
};

export default Index;
