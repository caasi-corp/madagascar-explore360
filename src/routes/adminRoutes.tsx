
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import AdminDashboard from '@/pages/AdminDashboard';
import Tours from '@/pages/admin/Tours';
import TourEditor from '@/pages/admin/TourEditor';
import Vehicles from '@/pages/admin/Vehicles';
import VehicleEditor from '@/pages/admin/VehicleEditor';
import Bookings from '@/pages/admin/Bookings';
import VehicleBookings from '@/pages/admin/VehicleBookings';
import ExcursionsCalendar from '@/pages/admin/ExcursionsCalendar';
import Customers from '@/pages/admin/Customers';
import CatamaranCruises from '@/pages/admin/CatamaranCruises';
import CatamaranCruiseEditor from '@/pages/admin/CatamaranCruiseEditor';
import Hotels from '@/pages/admin/Hotels';
import Messages from '@/pages/admin/Messages';
import Reports from '@/pages/admin/Reports';
import UserManagement from '@/pages/admin/UserManagement';
import SeoSettings from '@/pages/admin/SeoSettings';
import TourCategories from '@/pages/admin/TourCategories';
import Settings from '@/pages/admin/Settings';
import DatabaseManagement from '@/pages/admin/DatabaseManagement';

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'tours',
        element: <Tours />,
      },
      {
        path: 'tours/categories',
        element: <TourCategories />,
      },
      {
        path: 'tours/new',
        element: <TourEditor />,
      },
      {
        path: 'tours/edit/:id',
        element: <TourEditor />,
      },
      {
        path: 'vehicles',
        element: <Vehicles />,
      },
      {
        path: 'vehicles/new',
        element: <VehicleEditor />,
      },
      {
        path: 'vehicles/edit/:id',
        element: <VehicleEditor />,
      },
      {
        path: 'bookings',
        element: <Bookings />,
      },
      {
        path: 'vehicle-bookings',
        element: <VehicleBookings />,
      },
      {
        path: 'excursions-calendar',
        element: <ExcursionsCalendar />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'catamaran-cruises',
        element: <CatamaranCruises />,
      },
      {
        path: 'catamaran-cruises/new',
        element: <CatamaranCruiseEditor />,
      },
      {
        path: 'catamaran-cruises/edit/:id',
        element: <CatamaranCruiseEditor />,
      },
      {
        path: 'hotels',
        element: <Hotels />,
      },
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'users',
        element: <UserManagement />,
      },
      {
        path: 'seo',
        element: <SeoSettings />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'database',
        element: <DatabaseManagement />,
      },
    ],
  },
];
