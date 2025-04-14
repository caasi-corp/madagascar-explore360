
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  User,
  Calendar,
  Heart,
  CreditCard,
  Bell,
  Settings,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import SidebarLogout from '@/components/admin/sidebar/SidebarLogout';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    name: 'Tableau de bord',
    href: '/user/dashboard',
    icon: User
  },
  {
    name: 'Mes Réservations',
    href: '/user/bookings',
    icon: Calendar
  },
  {
    name: 'Liste de Souhaits',
    href: '/user/wishlist',
    icon: Heart
  },
  {
    name: 'Méthodes de Paiement',
    href: '/user/payments',
    icon: CreditCard
  },
  {
    name: 'Notifications',
    href: '/user/notifications',
    icon: Bell
  },
  {
    name: 'Paramètres',
    href: '/user/settings',
    icon: Settings
  }
];

const UserSidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-northgascar-teal text-white rounded-full h-10 w-10 flex items-center justify-center font-medium">
            {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="font-medium">{user?.firstName} {user?.lastName}</h3>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  isActive 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-muted"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <SidebarLogout />
    </div>
  );
};

export default UserSidebar;
