
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';
import Index from './pages/Index';
import Tours from './pages/Tours';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import UserSettings from './pages/UserSettings';
import NotFound from './pages/NotFound';
import CarRental from './pages/services/CarRental';
import FlightBooking from './pages/services/FlightBooking';
import HotelBooking from './pages/services/HotelBooking';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import Sitemap from './pages/legal/Sitemap';

console.log("Creating router");

const router = createBrowserRouter([
  {
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
  },
  {
    path: '/user',
    element: <UserLayout />,
    children: [
      {
        path: 'dashboard',
        element: <UserDashboard />
      },
      {
        path: 'settings',
        element: <UserSettings />
      },
      {
        path: 'bookings',
        element: <UserDashboard />  // À remplacer plus tard par un composant BookingList
      },
      {
        path: 'wishlist',
        element: <UserDashboard />  // À remplacer plus tard par un composant Wishlist
      },
      {
        path: 'payments',
        element: <UserDashboard />  // À remplacer plus tard par un composant PaymentMethods
      },
      {
        path: 'notifications',
        element: <UserDashboard />  // À remplacer plus tard par un composant Notifications
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      }
    ]
  }
]);

export default router;
