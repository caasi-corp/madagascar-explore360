
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminRoute from '@/components/auth/AdminRoute';
import UserManagement from '@/pages/admin/UserManagement';
import Tours from '@/pages/admin/Tours';
import TourEditor from '@/pages/admin/TourEditor';
import TourCategories from '@/pages/admin/TourCategories';
import Bookings from '@/pages/admin/Bookings';
import ExcursionsCalendar from '@/pages/admin/ExcursionsCalendar';
import Customers from '@/pages/admin/Customers';
import Vehicles from '@/pages/admin/Vehicles';
import VehicleEditor from '@/pages/admin/VehicleEditor';
import VehicleBookings from '@/pages/admin/VehicleBookings';
import CatamaranCruises from '@/pages/admin/CatamaranCruises';
import CatamaranCruiseEditor from '@/pages/admin/CatamaranCruiseEditor';
import Reports from '@/pages/admin/Reports';
import Messages from '@/pages/admin/Messages';
import Settings from '@/pages/admin/Settings';
import SeoSettings from '@/pages/admin/SeoSettings';
import Hotels from '@/pages/admin/Hotels';
import UserList from '@/pages/admin/UserList';

const adminRoutes = {
  path: '/admin',
  element: (
    <AdminRoute>
      <Outlet />
    </AdminRoute>
  ),
  children: [
    {
      path: '',
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: 'tours', element: <Tours /> },
        { path: 'tours/new', element: <TourEditor /> },
        { path: 'tours/edit/:id', element: <TourEditor /> },
        { path: 'tours/categories', element: <TourCategories /> },
        { path: 'bookings', element: <Bookings /> },
        { path: 'excursions-calendar', element: <ExcursionsCalendar /> },
        { path: 'customers', element: <Customers /> },
        { path: 'vehicles', element: <Vehicles /> },
        { path: 'vehicles/new', element: <VehicleEditor /> },
        { path: 'vehicles/edit/:id', element: <VehicleEditor /> },
        { path: 'vehicles/bookings', element: <VehicleBookings /> },
        { path: 'catamaran-cruises', element: <CatamaranCruises /> },
        { path: 'catamaran-cruises/new', element: <CatamaranCruiseEditor /> },
        { path: 'catamaran-cruises/edit/:id', element: <CatamaranCruiseEditor /> },
        { path: 'hotels', element: <Hotels /> },
        { path: 'reports', element: <Reports /> },
        { path: 'messages', element: <Messages /> },
        { path: 'settings', element: <Settings /> },
        { path: 'settings/seo', element: <SeoSettings /> },
        { path: 'settings/users', element: <UserManagement /> },
        { path: 'users', element: <UserList /> },
        { path: '*', element: <Navigate to="/admin" replace /> }
      ]
    }
  ]
};

export default adminRoutes;
