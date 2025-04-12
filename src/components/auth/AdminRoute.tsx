
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminRoute: React.FC = () => {
  try {
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
    return <Outlet />;
  } catch (error) {
    // En cas d'erreur avec le contexte d'authentification, rediriger vers la page de connexion
    console.error("Erreur d'authentification dans AdminRoute:", error);
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
