
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminRoute from '@/components/auth/AdminRoute';
import Bookings from '@/pages/admin/Bookings';
import Customers from '@/pages/admin/Customers';
import Tours from '@/pages/admin/Tours';
import TourEditor from '@/pages/admin/TourEditor';
import TourCategories from '@/pages/admin/TourCategories';
import Vehicles from '@/pages/admin/Vehicles';
import VehicleEditor from '@/pages/admin/VehicleEditor';
import VehicleBookings from '@/pages/admin/VehicleBookings';
import CatamaranCruises from '@/pages/admin/CatamaranCruises';
import CatamaranCruiseEditor from '@/pages/admin/CatamaranCruiseEditor';
import Hotels from '@/pages/admin/Hotels';
import ExcursionsCalendar from '@/pages/admin/ExcursionsCalendar';
import Messages from '@/pages/admin/Messages';
import Reports from '@/pages/admin/Reports';
import SeoSettings from '@/pages/admin/SeoSettings';
import Settings from '@/pages/admin/Settings';
import UserManagement from '@/pages/admin/UserManagement';

const adminRoutes = {
  path: '/admin',
  element: <AdminRoute />,
  children: [
    {
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <AdminDashboard />
        },
        {
          path: 'bookings',
          element: <Bookings />
        },
        {
          path: 'customers',
          element: <Customers />
        },
        {
          path: 'tours',
          element: <Tours />
        },
        {
          path: 'tours/new',
          element: <TourEditor />
        },
        {
          path: 'tours/:id',
          element: <TourEditor />
        },
        {
          path: 'tour-categories',
          element: <TourCategories />
        },
        {
          path: 'vehicles',
          element: <Vehicles />
        },
        {
          path: 'vehicles/new',
          element: <VehicleEditor />
        },
        {
          path: 'vehicles/:id',
          element: <VehicleEditor />
        },
        {
          path: 'vehicle-bookings',
          element: <VehicleBookings />
        },
        {
          path: 'catamaran-cruises',
          element: <CatamaranCruises />
        },
        {
          path: 'catamaran-cruises/new',
          element: <CatamaranCruiseEditor />
        },
        {
          path: 'catamaran-cruises/:id',
          element: <CatamaranCruiseEditor />
        },
        {
          path: 'hotels',
          element: <Hotels />
        },
        {
          path: 'calendar',
          element: <ExcursionsCalendar />
        },
        {
          path: 'messages',
          element: <Messages />
        },
        {
          path: 'reports',
          element: <Reports />
        },
        {
          path: 'seo-settings',
          element: <SeoSettings />
        },
        {
          path: 'settings',
          element: <Settings />
        },
        {
          path: 'users',
          element: <UserManagement />
        }
      ]
    }
  ]
};

export default adminRoutes;
