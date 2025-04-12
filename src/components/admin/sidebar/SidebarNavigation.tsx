
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
  GlobePlus,
  Ship,
  Image,
} from 'lucide-react';

const SidebarNavigation = () => {
  return (
    <nav className="space-y-2 mt-4">
      <SidebarNavItem href="/admin/dashboard" icon={<LayoutDashboard size={18} />}>
        Tableau de bord
      </SidebarNavItem>

      <SidebarNavGroup title="Excursions">
        <SidebarNavItem href="/admin/tours" icon={<Map size={18} />}>
          Circuits
        </SidebarNavItem>
        <SidebarNavItem href="/admin/tours/categories" icon={<GlobePlus size={18} />}>
          Catégories
        </SidebarNavItem>
        <SidebarNavItem href="/admin/excursions-calendar" icon={<CalendarDays size={18} />}>
          Calendrier
        </SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup title="Services">
        <SidebarNavItem href="/admin/vehicles" icon={<CarFront size={18} />}>
          Véhicules
        </SidebarNavItem>
        <SidebarNavItem href="/admin/catamaran-cruises" icon={<Ship size={18} />}>
          Croisières en Catamaran
        </SidebarNavItem>
        <SidebarNavItem href="/admin/hotels" icon={<HotelIcon size={18} />}>
          Hôtels
        </SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup title="Réservations">
        <SidebarNavItem href="/admin/bookings" icon={<CalendarDays size={18} />}>
          Réservations
        </SidebarNavItem>
        <SidebarNavItem href="/admin/customers" icon={<Users size={18} />}>
          Clients
        </SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem href="/admin/photos" icon={<Image size={18} />}>
        Gestion des Photos
      </SidebarNavItem>

      <SidebarNavItem href="/admin/reports" icon={<FileBarChart2 size={18} />}>
        Rapports
      </SidebarNavItem>

      <SidebarNavItem href="/admin/messages" icon={<MessageSquare size={18} />}>
        Messages
      </SidebarNavItem>

      <SidebarSubmenu title="Paramètres" icon={<Settings size={18} />}>
        <SidebarNavItem href="/admin/settings">Général</SidebarNavItem>
        <SidebarNavItem href="/admin/settings/seo">SEO</SidebarNavItem>
        <SidebarNavItem href="/admin/settings/users">Utilisateurs</SidebarNavItem>
      </SidebarSubmenu>
    </nav>
  );
};

export default SidebarNavigation;
