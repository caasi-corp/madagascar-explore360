
import React from 'react';
import { useLocation } from 'react-router-dom';
import SidebarNavGroup from './SidebarNavGroup';
import SidebarNavItem from './SidebarNavItem';
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
  Database
} from 'lucide-react';

const SidebarNavigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="space-y-2 mt-4">
      <SidebarNavItem 
        to="/admin/dashboard" 
        icon={<LayoutDashboard size={18} />} 
        label="Tableau de bord"
        active={path === '/admin' || path === '/admin/dashboard'}
      />
      
      <SidebarNavGroup 
        title="Circuits & Excursions"
        icon={<MapPin size={18} />}
        active={path.includes('/admin/tours') || path.includes('/admin/excursions')}
      >
        <SidebarNavItem 
          to="/admin/tours" 
          label="Tous les circuits" 
          active={path === '/admin/tours'}
        />
        <SidebarNavItem 
          to="/admin/tours/categories" 
          label="Catégories" 
          active={path === '/admin/tours/categories'}
        />
        <SidebarNavItem 
          to="/admin/excursions-calendar" 
          label="Calendrier des excursions" 
          active={path === '/admin/excursions-calendar'}
        />
      </SidebarNavGroup>
      
      <SidebarNavItem 
        to="/admin/bookings" 
        icon={<CalendarDays size={18} />} 
        label="Réservations"
        active={path === '/admin/bookings'}
      />
      
      <SidebarNavItem 
        to="/admin/customers" 
        icon={<Users size={18} />} 
        label="Clients"
        active={path === '/admin/customers'}
      />
      
      <SidebarNavGroup 
        title="Transports"
        icon={<Car size={18} />}
        active={path.includes('/admin/vehicles')}
      >
        <SidebarNavItem 
          to="/admin/vehicles" 
          label="Véhicules" 
          active={path === '/admin/vehicles'}
        />
        <SidebarNavItem 
          to="/admin/vehicles/bookings" 
          label="Réservations" 
          active={path === '/admin/vehicles/bookings'}
        />
      </SidebarNavGroup>
      
      <SidebarNavGroup 
        title="Croisières"
        icon={<Ship size={18} />}
        active={path.includes('/admin/catamaran')}
      >
        <SidebarNavItem 
          to="/admin/catamaran-cruises" 
          label="Croisières" 
          active={path === '/admin/catamaran-cruises'}
        />
      </SidebarNavGroup>
      
      <SidebarNavItem 
        to="/admin/hotels" 
        icon={<Hotel size={18} />} 
        label="Hôtels"
        active={path === '/admin/hotels'}
      />
      
      <SidebarNavItem 
        to="/admin/reports" 
        icon={<BarChart3 size={18} />} 
        label="Rapports"
        active={path === '/admin/reports'}
      />
      
      <SidebarNavItem 
        to="/admin/messages" 
        icon={<MessageSquare size={18} />} 
        label="Messages"
        active={path === '/admin/messages'}
      />
      
      <SidebarNavItem 
        to="/admin/banners" 
        icon={<Image size={18} />} 
        label="Bannières"
        active={path === '/admin/banners'}
      />
      
      <SidebarNavItem 
        to="/admin/database" 
        icon={<Database size={18} />} 
        label="Base de données"
        active={path === '/admin/database'}
      />
      
      <SidebarNavGroup 
        title="Paramètres"
        icon={<Settings size={18} />}
        active={path.includes('/admin/settings')}
      >
        <SidebarNavItem 
          to="/admin/settings" 
          label="Général" 
          active={path === '/admin/settings'}
        />
        <SidebarNavItem 
          to="/admin/settings/seo" 
          label="SEO" 
          active={path === '/admin/settings/seo'}
        />
        <SidebarNavItem 
          to="/admin/settings/users" 
          label="Utilisateurs" 
          active={path === '/admin/settings/users'}
        />
      </SidebarNavGroup>
      
      <SidebarNavItem 
        to="/admin-documentation" 
        icon={<FileText size={18} />} 
        label="Documentation"
        active={path === '/admin-documentation'}
      />
    </nav>
  );
};

export default SidebarNavigation;
