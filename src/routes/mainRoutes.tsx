
import React from 'react';
import Layout from '@/components/Layout';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Tours from '@/pages/Tours';
import TourDetail from '@/pages/TourDetail';
import CarRental from '@/pages/services/CarRental';
import CatamaranCruise from '@/pages/services/CatamaranCruise';
import HotelBooking from '@/pages/services/HotelBooking';
import Hotels from '@/pages/hotels/Hotels';
import HotelDetail from '@/pages/hotels/HotelDetail';
import Flights from '@/pages/flights/Flights';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';
import TermsOfService from '@/pages/legal/TermsOfService';
import Sitemap from '@/pages/legal/Sitemap';
import SeoInformations from '@/pages/SeoInformations';

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Index /> },
    { path: 'about', element: <About /> },
    { path: 'contact', element: <Contact /> },
    { path: 'tours', element: <Tours /> },
    { path: 'tours/:id', element: <TourDetail /> },
    { path: 'car-rental', element: <CarRental /> },
    { path: 'catamaran-cruise', element: <CatamaranCruise /> },
    { path: 'hotel-booking', element: <HotelBooking /> },
    { path: 'hotels', element: <Hotels /> },
    { path: 'hotels/:id', element: <HotelDetail /> },
    { path: 'flights', element: <Flights /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'legal/privacy-policy', element: <PrivacyPolicy /> },
    { path: 'legal/terms-of-service', element: <TermsOfService /> },
    { path: 'legal/sitemap', element: <Sitemap /> },
    { path: 'meta/seo-info', element: <SeoInformations /> },
    { path: '*', element: <NotFound /> },
  ]
};

export default mainRoutes;
