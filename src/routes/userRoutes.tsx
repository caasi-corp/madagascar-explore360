
import React from 'react';
import { Navigate } from 'react-router-dom';
import UserLayout from '@/components/UserLayout';
import UserDashboard from '@/pages/UserDashboard';
import UserSettings from '@/pages/UserSettings';
import BookingList from '@/pages/user/BookingList';
import Wishlist from '@/pages/user/Wishlist';
import PaymentMethods from '@/pages/user/PaymentMethods';
import Notifications from '@/pages/user/Notifications';

// Route protégée pour les utilisateurs connectés
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = !!localStorage.getItem('supabase.auth.token');
  
  if (!isAuthenticated) {
    // Rediriger vers la page de connexion si non connecté
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const userRoutes = {
  path: '/user',
  element: (
    <ProtectedRoute>
      <UserLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
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
      path: 'payment-methods',
      element: <PaymentMethods />
    },
    {
      path: 'notifications',
      element: <Notifications />
    }
  ]
};

export default userRoutes;
