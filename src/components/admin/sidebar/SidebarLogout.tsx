
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SidebarLogout: React.FC = () => {
  const handleLogout = () => {
    // Logique de déconnexion ici
    window.location.href = '/login';
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
};

export default SidebarLogout;
