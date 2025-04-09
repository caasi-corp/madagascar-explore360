
import React from 'react';
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

const SidebarNavigation: React.FC = () => {
  const isActive = (path: string) => window.location.pathname === path || window.location.pathname.startsWith(path + '/');
  
  return (
    <div className="space-y-6">
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Tableau de bord</h4>
        <nav className="space-y-1">
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><LayoutDashboard size={18} /></div>
            <a href="/admin" className="font-medium">Tableau de bord</a>
          </div>
        </nav>
      </div>
      
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Circuits</h4>
        <nav className="space-y-1">
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin/tours') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><Map size={18} /></div>
            <a href="/admin/tours" className="font-medium">Circuits</a>
          </div>
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin/tours/categories') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><FolderTree size={18} /></div>
            <a href="/admin/tours/categories" className="font-medium">Catégories</a>
          </div>
        </nav>
      </div>
      
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Réservations</h4>
        <nav className="space-y-1">
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin/bookings') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><Bookmark size={18} /></div>
            <a href="/admin/bookings" className="font-medium">Réservations</a>
          </div>
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin/calendar') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><CalendarCheck size={18} /></div>
            <a href="/admin/calendar" className="font-medium">Calendrier</a>
          </div>
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin/customers') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><Users size={18} /></div>
            <a href="/admin/customers" className="font-medium">Clients</a>
          </div>
        </nav>
      </div>
      
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Transport</h4>
        <nav className="space-y-1">
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin/vehicles') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><Car size={18} /></div>
            <a href="/admin/vehicles" className="font-medium">Véhicules</a>
          </div>
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin/hotels') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><Building2 size={18} /></div>
            <a href="/admin/hotels" className="font-medium">Hôtels</a>
          </div>
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin/flights') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><Plane size={18} /></div>
            <a href="/admin/flights" className="font-medium">Vols</a>
          </div>
        </nav>
      </div>
      
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Informations</h4>
        <nav className="space-y-1">
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin/reports') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><PieChart size={18} /></div>
            <a href="/admin/reports" className="font-medium">Rapports</a>
          </div>
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin/messages') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><MessageSquare size={18} /></div>
            <a href="/admin/messages" className="font-medium">Messages</a>
          </div>
        </nav>
      </div>
      
      <div>
        <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-3 uppercase">Système</h4>
        <nav className="space-y-1">
          <div className={`flex items-center p-3 rounded-md mb-1 transition-colors ${isActive('/admin/settings') ? 'bg-madagascar-green/10 text-madagascar-green' : 'hover:bg-madagascar-green/5 text-foreground'}`}>
            <div className="mr-3"><Settings size={18} /></div>
            <a href="/admin/settings" className="font-medium">Paramètres</a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidebarNavigation;
