
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminTours from '@/pages/admin/Tours';
import AdminTourEditor from '@/pages/admin/TourEditor';
import AdminTourCategories from '@/pages/admin/TourCategories';
import AdminBookings from '@/pages/admin/Bookings';
import ExcursionsCalendar from '@/pages/admin/ExcursionsCalendar';
import AdminCustomers from '@/pages/admin/Customers';
import AdminVehicles from '@/pages/admin/Vehicles';
import AdminVehicleEditor from '@/pages/admin/VehicleEditor';
import AdminVehicleBookings from '@/pages/admin/VehicleBookings';
import AdminHotels from '@/pages/admin/Hotels';
import AdminReports from '@/pages/admin/Reports';
import AdminMessages from '@/pages/admin/Messages';
import AdminSettings from '@/pages/admin/Settings';
import AdminSeoSettings from '@/pages/admin/SeoSettings';
import AdminUserManagement from '@/pages/admin/UserManagement';
import AdminRoute from '@/components/auth/AdminRoute';
import CatamaranCruises from '@/pages/admin/CatamaranCruises';
import CatamaranCruiseEditor from '@/pages/admin/CatamaranCruiseEditor';
import PhotosAdmin from '@/pages/admin/PhotosAdmin';

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
          path: 'excursions-calendar',
          element: <ExcursionsCalendar />
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
          path: 'catamaran-cruises',
          element: <CatamaranCruises />
        },
        {
          path: 'catamaran-cruises/new',
          element: <CatamaranCruiseEditor />
        },
        {
          path: 'catamaran-cruises/edit/:id',
          element: <CatamaranCruiseEditor />
        },
        {
          path: 'photos',
          element: <PhotosAdmin />
        },
        {
          path: 'hotels',
          element: <AdminHotels />
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
  ]
};

export default adminRoutes;
