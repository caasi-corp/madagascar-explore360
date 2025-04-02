
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

// Pages d'administration
import AdminSettings from './pages/admin/Settings';
import AdminTours from './pages/admin/Tours';
import AdminTourEditor from './pages/admin/TourEditor';
import AdminTourCategories from './pages/admin/TourCategories';
import AdminBookings from './pages/admin/Bookings';
import AdminCustomers from './pages/admin/Customers';
import AdminVehicles from './pages/admin/Vehicles';
import AdminVehicleEditor from './pages/admin/VehicleEditor';
import AdminVehicleBookings from './pages/admin/VehicleBookings';
import AdminHotels from './pages/admin/Hotels';
import AdminFlights from './pages/admin/Flights';
import AdminReports from './pages/admin/Reports';
import AdminMessages from './pages/admin/Messages';
import AdminSeoSettings from './pages/admin/SeoSettings';
import AdminUserManagement from './pages/admin/UserManagement';

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
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />
      },
      {
        path: 'tours',
        element: <AdminTours />
      },
      {
        path: 'tours/new',
        element: <AdminTourEditor />
      },
      {
        path: 'tours/edit/:id',
        element: <AdminTourEditor />
      },
      {
        path: 'tours/categories',
        element: <AdminTourCategories />
      },
      {
        path: 'bookings',
        element: <AdminBookings />
      },
      {
        path: 'customers',
        element: <AdminCustomers />
      },
      {
        path: 'vehicles',
        element: <AdminVehicles />
      },
      {
        path: 'vehicles/new',
        element: <AdminVehicleEditor />
      },
      {
        path: 'vehicles/edit/:id',
        element: <AdminVehicleEditor />
      },
      {
        path: 'vehicles/bookings',
        element: <AdminVehicleBookings />
      },
      {
        path: 'hotels',
        element: <AdminHotels />
      },
      {
        path: 'flights',
        element: <AdminFlights />
      },
      {
        path: 'reports',
        element: <AdminReports />
      },
      {
        path: 'messages',
        element: <AdminMessages />
      },
      {
        path: 'settings',
        element: <AdminSettings />
      },
      {
        path: 'settings/seo',
        element: <AdminSeoSettings />
      },
      {
        path: 'settings/users',
        element: <AdminUserManagement />
      }
    ]
  }
]);

export default router;
