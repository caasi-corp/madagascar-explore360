
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
import ToursManagement from './pages/admin/ToursManagement';
import VehiclesManagement from './pages/admin/VehiclesManagement';
import BookingsManagement from './pages/admin/BookingsManagement';
import CustomersManagement from './pages/admin/CustomersManagement';
import HotelsManagement from './pages/admin/HotelsManagement';
import FlightsManagement from './pages/admin/FlightsManagement';
import ReportsPage from './pages/admin/ReportsPage';
import MessagesManagement from './pages/admin/MessagesManagement';
import TourEditor from './pages/admin/TourEditor';

// Update TourEditor interface to support useCategories prop
const CategoriesEditor = () => <TourEditor useCategories={true} />;

// Update BookingsManagement interface to support vehiclesOnly prop
const VehicleBookings = () => <BookingsManagement vehiclesOnly={true} />;

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
        element: <ToursManagement />
      },
      {
        path: 'tours/new',
        element: <TourEditor />
      },
      {
        path: 'tours/edit/:id',
        element: <TourEditor />
      },
      {
        path: 'tours/categories',
        element: <CategoriesEditor />
      },
      {
        path: 'bookings',
        element: <BookingsManagement />
      },
      {
        path: 'customers',
        element: <CustomersManagement />
      },
      {
        path: 'vehicles',
        element: <VehiclesManagement />
      },
      {
        path: 'vehicles/new',
        element: <AdminDashboard /> // Placeholder, will be replaced with VehicleEditor
      },
      {
        path: 'vehicles/edit/:id',
        element: <AdminDashboard /> // Placeholder, will be replaced with VehicleEditor
      },
      {
        path: 'vehicles/bookings',
        element: <VehicleBookings />
      },
      {
        path: 'hotels',
        element: <HotelsManagement />
      },
      {
        path: 'flights',
        element: <FlightsManagement />
      },
      {
        path: 'reports',
        element: <ReportsPage />
      },
      {
        path: 'messages',
        element: <MessagesManagement />
      },
      {
        path: 'settings',
        element: <AdminDashboard /> // Placeholder, will be replaced with SettingsPage
      },
      {
        path: 'settings/seo',
        element: <AdminDashboard /> // Placeholder, will be replaced with SEOSettings
      },
      {
        path: 'settings/users',
        element: <AdminDashboard /> // Placeholder, will be replaced with UserManagement
      }
    ]
  }
]);

export default router;
