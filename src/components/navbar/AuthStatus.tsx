
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthStatus: React.FC = () => {
  // Utiliser try/catch pour éviter l'erreur si l'AuthProvider n'est pas disponible
  try {
    const { user, logout } = useAuth();

    const handleLogout = () => {
      logout();
    };

    // Si l'utilisateur est connecté
    if (user) {
      const initials = user.firstName && user.lastName 
        ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` 
        : user.email.substring(0, 2).toUpperCase();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-madagascar-green">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="font-medium">{user.firstName} {user.lastName}</div>
              <div className="text-xs text-muted-foreground mt-1">{user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={user.role === 'admin' ? "/admin" : "/user/dashboard"}>
                <User className="mr-2 h-4 w-4" /> Tableau de bord
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={user.role === 'admin' ? "/admin/settings" : "/user/settings"}>
                <User className="mr-2 h-4 w-4" /> Paramètres
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    // Si l'utilisateur n'est pas connecté
    return (
      <div className="flex items-center space-x-2">
        <Link to="/login">
          <Button variant="outline" className="rounded-full">
            <User size={18} className="mr-1" /> Connexion
          </Button>
        </Link>
        
        <Link to="/register">
          <Button className="rounded-full bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            S'inscrire
          </Button>
        </Link>
      </div>
    );
  } catch (error) {
    // Fallback UI en cas d'erreur avec l'AuthContext
    return (
      <div className="flex items-center space-x-2">
        <Link to="/login">
          <Button variant="outline" className="rounded-full">
            <User size={18} className="mr-1" /> Connexion
          </Button>
        </Link>
        
        <Link to="/register">
          <Button className="rounded-full bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            S'inscrire
          </Button>
        </Link>
      </div>
    );
  }
};

export default AuthStatus;
