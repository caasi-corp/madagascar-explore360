
import React from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import Index from '../pages/Index';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import CarRental from '../pages/services/CarRental';
import FlightBooking from '../pages/services/FlightBooking';
import HotelBooking from '../pages/services/HotelBooking';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';
import TermsOfService from '../pages/legal/TermsOfService';
import Sitemap from '../pages/legal/Sitemap';
import NotFound from '../pages/NotFound';

export const mainRoutes: RouteObject = {
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
      path: 'tours/:id',
      element: <TourDetails />
    },
    {
      path: 'services/car-rental',
      element: <CarRental />
    },
    {
      path: 'services/flights',
      element: <FlightBooking />
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
