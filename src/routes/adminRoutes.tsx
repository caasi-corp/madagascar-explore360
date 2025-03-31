
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import ToursManagement from '../pages/admin/ToursManagement';
import TourEditor from '../pages/admin/TourEditor';
import BookingsManagement from '../pages/admin/BookingsManagement';
import CustomersManagement from '../pages/admin/CustomersManagement';
import VehiclesManagement from '../pages/admin/VehiclesManagement';
import HotelsManagement from '../pages/admin/HotelsManagement';
import FlightsManagement from '../pages/admin/FlightsManagement';
import ReportsPage from '../pages/admin/ReportsPage';
import MessagesManagement from '../pages/admin/MessagesManagement';

// Components with props
const CategoriesEditor = () => <TourEditor useCategories={true} />;
const VehicleBookings = () => <BookingsManagement vehiclesOnly={true} />;

export const adminRoutes: RouteObject = {
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
};
