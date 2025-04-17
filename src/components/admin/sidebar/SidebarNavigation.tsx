
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Home,
  Map,
  Calendar,
  CalendarDays,
  Users,
  Car,
  Building,
  Plane,
  BarChart,
  MessageCircle,
  Settings,
  Ship,
  LucideIcon,
  UsersRound
} from 'lucide-react';
import SidebarNavGroup from './SidebarNavGroup';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  submenu?: NavItem[];
}

// Navigation data
const navItems: NavItem[] = [
  {
    name: 'Tableau de bord',
    href: '/admin',
    icon: Home
  },
  {
    name: 'Circuits',
    href: '/admin/tours',
    icon: Map,
    submenu: [
      { name: 'Tous les circuits', href: '/admin/tours', icon: Map },
      { name: 'Catégories', href: '/admin/tours/categories', icon: Map }
    ]
  },
  {
    name: 'Réservations',
    href: '/admin/bookings',
    icon: Calendar,
    submenu: [
      { name: 'Liste des réservations', href: '/admin/bookings', icon: Calendar },
      { name: 'Calendrier des excursions', href: '/admin/excursions-calendar', icon: CalendarDays }
    ]
  },
  {
    name: 'Utilisateurs',
    href: '/admin/users',
    icon: UsersRound
  },
  {
    name: 'Clients',
    href: '/admin/customers',
    icon: Users
  },
  {
    name: 'Véhicules',
    href: '/admin/vehicles',
    icon: Car,
    submenu: [
      { name: 'Tous les véhicules', href: '/admin/vehicles', icon: Car },
      { name: 'Réservations', href: '/admin/vehicles/bookings', icon: Calendar }
    ]
  },
  {
    name: 'Croisières Catamaran',
    href: '/admin/catamaran-cruises',
    icon: Ship,
    submenu: [
      { name: 'Toutes les croisières', href: '/admin/catamaran-cruises', icon: Ship },
      { name: 'Nouvelle croisière', href: '/admin/catamaran-cruises/new', icon: Ship }
    ]
  },
  {
    name: 'Hôtels',
    href: '/admin/hotels',
    icon: Building
  },
  {
    name: 'Rapports',
    href: '/admin/reports',
    icon: BarChart
  },
  {
    name: 'Messages',
    href: '/admin/messages',
    icon: MessageCircle
  },
  {
    name: 'Paramètres',
    href: '/admin/settings',
    icon: Settings,
    submenu: [
      { name: 'Général', href: '/admin/settings', icon: Settings },
      { name: 'SEO', href: '/admin/settings/seo', icon: Settings },
      { name: 'Utilisateurs', href: '/admin/settings/users', icon: Users }
    ]
  }
];

const SidebarNavigation: React.FC = () => {
  const location = useLocation();
  const [expandedSubmenu, setExpandedSubmenu] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Trouver si un élément parent doit être ouvert en fonction de l'URL actuelle
    const parentItem = navItems.find(item => 
      item.submenu?.some(subitem => location.pathname === subitem.href)
    );
    
    if (parentItem) {
      setExpandedSubmenu(parentItem.name);
    }
  }, [location.pathname]);

  const toggleSubmenu = (name: string) => {
    setExpandedSubmenu(expandedSubmenu === name ? null : name);
  };

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <SidebarNavGroup
          key={item.name}
          item={item}
          expandedSubmenu={expandedSubmenu}
          onToggleSubmenu={toggleSubmenu}
        />
      ))}
    </nav>
  );
};

export default SidebarNavigation;
