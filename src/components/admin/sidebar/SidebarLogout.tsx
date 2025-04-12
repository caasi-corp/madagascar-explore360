
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SidebarLogout: React.FC = () => {
  try {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate('/login');
    };

    return (
      <div className="mt-auto p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full flex items-center justify-start text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </Button>
      </div>
    );
  } catch (error) {
    // En cas d'erreur avec le contexte d'authentification, rendre un bouton qui renvoie à la page de connexion
    const navigate = useNavigate();
    
    return (
      <div className="mt-auto p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full flex items-center justify-start text-destructive hover:text-destructive"
          onClick={() => navigate('/login')}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se connecter</span>
        </Button>
      </div>
    );
  }
};

export default SidebarLogout;
