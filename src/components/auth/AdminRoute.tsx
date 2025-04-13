
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-madagascar-green"></div>
        <div className="ml-4 text-lg">Chargement de l'authentification...</div>
      </div>
    );
  }

  // Vérifier si l'utilisateur est connecté et a le rôle d'administrateur
  if (!user || user.role !== 'admin') {
    console.log("Redirection: utilisateur non admin", user);
    return <Navigate to="/login" replace />;
  }

  console.log("Utilisateur admin authentifié:", user.email);
  // Si l'utilisateur est connecté et est un administrateur, afficher les routes enfants
  return <Outlet />;
};

export default AdminRoute;
