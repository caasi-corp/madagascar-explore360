
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { userAPI } from '@/lib/store';

const AdminRoute = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setCheckingRole(false);
        return;
      }
      
      try {
        const userData = await userAPI.getById(user.id);
        setIsAdmin(userData?.role === 'admin');
      } catch (error) {
        console.error("Erreur lors de la vérification des droits d'admin:", error);
        setIsAdmin(false);
      } finally {
        setCheckingRole(false);
      }
    };
    
    if (!loading) {
      checkAdminRole();
    }
  }, [user, loading]);
  
  // Afficher un écran de chargement pendant la vérification
  if (loading || checkingRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-madagascar-green border-r-transparent"></div>
          <p className="mt-4">Vérification des droits d'accès...</p>
        </div>
      </div>
    );
  }
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Rediriger vers la page d'accueil si l'utilisateur n'est pas admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // Rendre les routes enfants si l'utilisateur est admin
  return <Outlet />;
};

export default AdminRoute;
