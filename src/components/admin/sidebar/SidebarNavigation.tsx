
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Map,
  Calendar,
  Users,
  Car,
  Building,
  Plane,
  BarChart,
  MessageCircle,
  Settings,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  submenu?: NavItem[];
}

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
    icon: Calendar
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
    name: 'Hôtels',
    href: '/admin/hotels',
    icon: Building
  },
  {
    name: 'Vols',
    href: '/admin/flights',
    icon: Plane
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
      {navItems.map((item) => {
        const isActive = location.pathname === item.href || 
                         (item.submenu && item.submenu.some(subitem => location.pathname === subitem.href));
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isSubmenuExpanded = expandedSubmenu === item.name;

        return (
          <div key={item.name} className="mb-1">
            {hasSubmenu ? (
              <button
                onClick={() => toggleSubmenu(item.name)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  isActive 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-muted"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
                <svg
                  className={cn(
                    "ml-auto h-4 w-4 transition-transform",
                    isSubmenuExpanded ? "rotate-90" : ""
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ) : (
              <Link
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
            )}

            {/* Sous-menu */}
            {hasSubmenu && isSubmenuExpanded && (
              <div className="mt-1 ml-4 space-y-1">
                {item.submenu?.map((subitem) => (
                  <Link
                    key={subitem.name}
                    to={subitem.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                      location.pathname === subitem.href
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <subitem.icon className="mr-2 h-4 w-4" />
                    <span>{subitem.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default SidebarNavigation;
