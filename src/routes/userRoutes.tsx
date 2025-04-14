
import React from 'react';
import UserLayout from '@/components/UserLayout';
import UserDashboard from '@/pages/UserDashboard';
import UserSettings from '@/pages/UserSettings';
import BookingList from '@/pages/user/BookingList';
import Wishlist from '@/pages/user/Wishlist';
import PaymentMethods from '@/pages/user/PaymentMethods';
import Notifications from '@/pages/user/Notifications';

const userRoutes = {
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
      element: <BookingList />
    },
    {
      path: 'wishlist',
      element: <Wishlist />
    },
    {
      path: 'payments',
      element: <PaymentMethods />
    },
    {
      path: 'notifications',
      element: <Notifications />
    }
  ]
};

export default userRoutes;
