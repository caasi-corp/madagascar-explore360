
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  MapPin,
  CalendarDays,
  Users,
  Car,
  Ship,
  Hotel,
  BarChart3,
  MessageSquare,
  Settings,
  FileText,
  Image,
  Database,
  ChevronRight,
  LucideIcon
} from 'lucide-react';

// Use interface for menu items
interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
  children?: MenuItem[];
}

const SidebarNavigation: React.FC = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  // Toggle submenu visibility
  const toggleItem = (itemLabel: string) => {
    setExpandedItems(prev => 
      prev.includes(itemLabel) 
        ? prev.filter(item => item !== itemLabel) 
        : [...prev, itemLabel]
    );
  };
  
  // Check if an item or any of its children is active
  const isActive = (item: MenuItem): boolean => {
    if (location.pathname === item.path) return true;
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return false;
  };
  
  // Define the menu items with proper typing
  const menuItems: MenuItem[] = [
    {
      label: "Tableau de bord",
      path: "/admin/dashboard",
      icon: LayoutDashboard
    },
    {
      label: "Circuits & Excursions",
      path: "#",
      icon: MapPin,
      children: [
        {
          label: "Tous les circuits",
          path: "/admin/tours",
          icon: MapPin
        },
        {
          label: "Catégories",
          path: "/admin/tours/categories",
          icon: MapPin
        },
        {
          label: "Calendrier des excursions",
          path: "/admin/excursions-calendar",
          icon: CalendarDays
        }
      ]
    },
    {
      label: "Réservations",
      path: "/admin/bookings",
      icon: CalendarDays
    },
    {
      label: "Clients",
      path: "/admin/customers",
      icon: Users
    },
    {
      label: "Transports",
      path: "#",
      icon: Car,
      children: [
        {
          label: "Véhicules",
          path: "/admin/vehicles",
          icon: Car
        },
        {
          label: "Réservations",
          path: "/admin/vehicles/bookings",
          icon: CalendarDays
        }
      ]
    },
    {
      label: "Croisières",
      path: "#",
      icon: Ship,
      children: [
        {
          label: "Croisières",
          path: "/admin/catamaran-cruises",
          icon: Ship
        }
      ]
    },
    {
      label: "Hôtels",
      path: "/admin/hotels", 
      icon: Hotel
    },
    {
      label: "Rapports",
      path: "/admin/reports",
      icon: BarChart3
    },
    {
      label: "Messages",
      path: "/admin/messages",
      icon: MessageSquare
    },
    {
      label: "Bannières",
      path: "/admin/banners",
      icon: Image
    },
    {
      label: "Base de données",
      path: "/admin/database",
      icon: Database
    },
    {
      label: "Paramètres",
      path: "#",
      icon: Settings,
      children: [
        {
          label: "Général",
          path: "/admin/settings",
          icon: Settings
        },
        {
          label: "SEO",
          path: "/admin/settings/seo", 
          icon: Settings
        },
        {
          label: "Utilisateurs",
          path: "/admin/settings/users",
          icon: Users
        }
      ]
    },
    {
      label: "Documentation",
      path: "/admin-documentation",
      icon: FileText
    }
  ];

  // Render menu item with proper component usage
  const renderMenuItem = (item: MenuItem) => {
    const active = isActive(item);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const Icon = item.icon;
    
    return (
      <div key={item.label} className="mb-1">
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleItem(item.label)}
              className={cn(
                "w-full flex items-center justify-between p-2 rounded-md text-sm",
                active ? "bg-accent text-accent-foreground" : "hover:bg-muted"
              )}
            >
              <div className="flex items-center">
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </div>
              <ChevronRight 
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded && "transform rotate-90"
                )} 
              />
            </button>
            
            {isExpanded && item.children && (
              <div className="ml-4 pl-2 border-l border-border space-y-1 mt-1">
                {item.children.map(child => {
                  const childActive = location.pathname === child.path;
                  const ChildIcon = child.icon;
                  
                  return (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={cn(
                        "flex items-center px-2 py-1.5 text-sm rounded-md",
                        childActive
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      <ChildIcon className="mr-2 h-4 w-4" />
                      <span>{child.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <Link
            to={item.path}
            className={cn(
              "flex items-center p-2 rounded-md text-sm",
              active
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <nav className="space-y-2 mt-4">
      {menuItems.map(renderMenuItem)}
    </nav>
  );
};

export default SidebarNavigation;
