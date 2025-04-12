
import React from 'react';
import SidebarNavGroup from './SidebarNavGroup';
import SidebarNavItem from './SidebarNavItem';
import SidebarSubmenu from './SidebarSubmenu';
import {
  LayoutDashboard,
  Map,
  CalendarDays,
  Users,
  CarFront,
  HotelIcon,
  FileBarChart2,
  MessageSquare,
  Settings,
  Globe,
  Ship,
  Image,
} from 'lucide-react';

const SidebarNavigation = () => {
  const [expandedSubmenu, setExpandedSubmenu] = React.useState<string | null>(null);
  
  const handleToggleSubmenu = (name: string) => {
    setExpandedSubmenu(prev => prev === name ? null : name);
  };
  
  const navGroups = [
    {
      title: "Excursions",
      items: [
        {
          name: "Circuits",
          href: "/admin/tours",
          icon: Map,
        },
        {
          name: "Catégories",
          href: "/admin/tours/categories",
          icon: Globe,
        },
        {
          name: "Calendrier",
          href: "/admin/excursions-calendar",
          icon: CalendarDays,
        }
      ]
    },
    {
      title: "Services",
      items: [
        {
          name: "Véhicules",
          href: "/admin/vehicles",
          icon: CarFront,
        },
        {
          name: "Croisières en Catamaran",
          href: "/admin/catamaran-cruises",
          icon: Ship,
        },
        {
          name: "Hôtels",
          href: "/admin/hotels",
          icon: HotelIcon,
        }
      ]
    },
    {
      title: "Réservations",
      items: [
        {
          name: "Réservations",
          href: "/admin/bookings",
          icon: CalendarDays,
        },
        {
          name: "Clients",
          href: "/admin/customers",
          icon: Users,
        }
      ]
    }
  ];

  return (
    <nav className="space-y-2 mt-4">
      <SidebarNavItem 
        name="Tableau de bord"
        href="/admin/dashboard"
        icon={LayoutDashboard}
        isActive={false}
      />

      {navGroups.map(group => (
        <div key={group.title} className="mb-2">
          <div className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {group.title}
          </div>
          {group.items.map(item => (
            <SidebarNavItem
              key={item.name}
              name={item.name}
              href={item.href}
              icon={item.icon}
              isActive={false}
            />
          ))}
        </div>
      ))}

      <SidebarNavItem
        name="Gestion des Photos"
        href="/admin/photos"
        icon={Image}
        isActive={false}
      />

      <SidebarNavItem
        name="Rapports"
        href="/admin/reports"
        icon={FileBarChart2}
        isActive={false}
      />

      <SidebarNavItem
        name="Messages"
        href="/admin/messages"
        icon={MessageSquare}
        isActive={false}
      />

      <div className="px-3 my-2">
        <div
          className="flex items-center px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-muted"
          onClick={() => handleToggleSubmenu("Paramètres")}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Paramètres</span>
          <svg
            className={`ml-auto h-4 w-4 transition-transform ${expandedSubmenu === "Paramètres" ? "rotate-90" : ""}`}
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
        </div>
        
        {expandedSubmenu === "Paramètres" && (
          <div className="ml-6 pl-3 border-l border-border space-y-1 my-1">
            <a
              href="/admin/settings"
              className="flex items-center p-2 rounded-md text-sm hover:bg-muted"
            >
              Général
            </a>
            <a
              href="/admin/settings/seo"
              className="flex items-center p-2 rounded-md text-sm hover:bg-muted"
            >
              SEO
            </a>
            <a
              href="/admin/settings/users"
              className="flex items-center p-2 rounded-md text-sm hover:bg-muted"
            >
              Utilisateurs
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SidebarNavigation;
