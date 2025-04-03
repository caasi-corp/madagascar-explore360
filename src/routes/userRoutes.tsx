
import React from 'react';
import UserLayout from '@/components/UserLayout';
import UserDashboard from '@/pages/UserDashboard';
import UserSettings from '@/pages/UserSettings';

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
};

export default userRoutes;
