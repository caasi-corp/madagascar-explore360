
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminRouteProps {
  children?: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  // Vérifier si l'utilisateur est connecté et a le rôle d'administrateur
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  // Si l'utilisateur est connecté et est un administrateur, afficher les routes enfants
  return children ? <>{children}</> : <Outlet />;
};

export default AdminRoute;
