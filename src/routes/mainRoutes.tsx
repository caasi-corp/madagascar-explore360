
import React from 'react';
import SeoInformations from '@/pages/SeoInformations';
import Layout from '@/components/Layout';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Tours from '@/pages/Tours';
import TourDetail from '@/pages/TourDetail';
import CarRental from '@/pages/services/CarRental';
import CatamaranCruise from '@/pages/services/CatamaranCruise';
import HotelBooking from '@/pages/services/HotelBooking';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';
import TermsOfService from '@/pages/legal/TermsOfService';
import Sitemap from '@/pages/legal/Sitemap';

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Index />
    },
    {
      path: 'about',
      element: <About />
    },
    {
      path: 'contact',
      element: <Contact />
    },
    {
      path: 'tours',
      element: <Tours />
    },
    {
      path: 'tours/:id',
      element: <TourDetail />
    },
    {
      path: 'services/car-rental',
      element: <CarRental />
    },
    {
      path: 'services/catamaran',
      element: <CatamaranCruise />
    },
    {
      path: 'services/hotels',
      element: <HotelBooking />
    },
    {
      path: 'auth',
      element: <Auth />
    },
    {
      path: 'privacy-policy',
      element: <PrivacyPolicy />
    },
    {
      path: 'terms-of-service',
      element: <TermsOfService />
    },
    {
      path: 'sitemap',
      element: <Sitemap />
    },
    {
      path: 'seo-informations',
      element: <SeoInformations />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]
};

export default mainRoutes;
