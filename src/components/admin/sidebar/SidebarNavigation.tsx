
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Calendar, 
  Bookmark, 
  Users, 
  Car, 
  Building2, 
  Plane, 
  PieChart, 
  MessageSquare, 
  Settings, 
  Folder,
  FolderTree,
  CalendarCheck
} from 'lucide-react';
import SidebarItem from './SidebarItem';

const SidebarNavigation: React.FC = () => {
  const isActiveLink = ({ isActive }: { isActive: boolean }) => 
    isActive ? 'bg-accent' : '';
  
  return (
    <div className="space-y-6">
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Tableau de bord</h4>
        <nav className="space-y-1">
          <SidebarItem icon={<LayoutDashboard size={18} />} as={NavLink} to="/admin" className={isActiveLink} end>
            Tableau de bord
          </SidebarItem>
        </nav>
      </div>
      
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Circuits</h4>
        <nav className="space-y-1">
          <SidebarItem icon={<Map size={18} />} as={NavLink} to="/admin/tours" className={isActiveLink}>
            Circuits
          </SidebarItem>
          <SidebarItem icon={<FolderTree size={18} />} as={NavLink} to="/admin/tours/categories" className={isActiveLink}>
            Catégories
          </SidebarItem>
        </nav>
      </div>
      
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Réservations</h4>
        <nav className="space-y-1">
          <SidebarItem icon={<Bookmark size={18} />} as={NavLink} to="/admin/bookings" className={isActiveLink}>
            Réservations
          </SidebarItem>
          <SidebarItem icon={<CalendarCheck size={18} />} as={NavLink} to="/admin/calendar" className={isActiveLink}>
            Calendrier
          </SidebarItem>
          <SidebarItem icon={<Users size={18} />} as={NavLink} to="/admin/customers" className={isActiveLink}>
            Clients
          </SidebarItem>
        </nav>
      </div>
      
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Transport</h4>
        <nav className="space-y-1">
          <SidebarItem icon={<Car size={18} />} as={NavLink} to="/admin/vehicles" className={isActiveLink}>
            Véhicules
          </SidebarItem>
          <SidebarItem icon={<Building2 size={18} />} as={NavLink} to="/admin/hotels" className={isActiveLink}>
            Hôtels
          </SidebarItem>
          <SidebarItem icon={<Plane size={18} />} as={NavLink} to="/admin/flights" className={isActiveLink}>
            Vols
          </SidebarItem>
        </nav>
      </div>
      
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Informations</h4>
        <nav className="space-y-1">
          <SidebarItem icon={<PieChart size={18} />} as={NavLink} to="/admin/reports" className={isActiveLink}>
            Rapports
          </SidebarItem>
          <SidebarItem icon={<MessageSquare size={18} />} as={NavLink} to="/admin/messages" className={isActiveLink}>
            Messages
          </SidebarItem>
        </nav>
      </div>
      
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Système</h4>
        <nav className="space-y-1">
          <SidebarItem icon={<Settings size={18} />} as={NavLink} to="/admin/settings" className={isActiveLink}>
            Paramètres
          </SidebarItem>
        </nav>
      </div>
    </div>
  );
};

export default SidebarNavigation;
