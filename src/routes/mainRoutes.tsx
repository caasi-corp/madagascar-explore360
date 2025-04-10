
import React from 'react';
import Layout from '@/components/Layout';
import Index from '@/pages/Index';
import Tours from '@/pages/Tours';
import TourDetail from '@/pages/TourDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import CarRental from '@/pages/services/CarRental';
import CatamaranCruise from '@/pages/services/CatamaranCruise';
import HotelBooking from '@/pages/services/HotelBooking';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';
import TermsOfService from '@/pages/legal/TermsOfService';
import Sitemap from '@/pages/legal/Sitemap';

const mainRoutes = {
  path: '/',
  element: <Layout />,
  errorElement: <NotFound />,
  children: [
    {
      index: true,
      element: <Index />
    },
    {
      path: 'tours',
      element: <Tours />
    },
    {
      path: 'tours/:tourId',
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
      path: 'about',
      element: <About />
    },
    {
      path: 'contact',
      element: <Contact />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
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
    }
  ]
};

export default mainRoutes;
