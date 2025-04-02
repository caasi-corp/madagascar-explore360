
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  ListChecks,
  Settings,
  Car,
  Building,
  Plane,
  BarChart,
  MessageSquare,
  LogOut,
  ChevronRight,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import Logo from './Logo';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  active: boolean;
  children?: { title: string; path: string }[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title, path, active, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  // If this is a parent item and one of its children is active, expand it
  React.useEffect(() => {
    if (children && children.some(child => window.location.pathname === child.path)) {
      setIsOpen(true);
    }
  }, [children]);

  const toggleOpen = () => {
    if (children) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      {children ? (
        <button 
          onClick={toggleOpen}
          className={cn(
            "w-full flex items-center justify-between p-3 rounded-md mb-1 text-left transition-colors",
            active || isOpen
              ? "bg-madagascar-green/10 text-madagascar-green" 
              : "hover:bg-madagascar-green/5 text-foreground"
          )}
        >
          <div className="flex items-center">
            <div className="mr-3">{icon}</div>
            <span className="font-medium">{title}</span>
          </div>
          <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "transform rotate-90")} />
        </button>
      ) : (
        <Link
          to={path}
          className={cn(
            "flex items-center p-3 rounded-md mb-1 transition-colors",
            active 
              ? "bg-madagascar-green/10 text-madagascar-green" 
              : "hover:bg-madagascar-green/5 text-foreground"
          )}
        >
          <div className="mr-3">{icon}</div>
          <span className="font-medium">{title}</span>
        </Link>
      )}
      
      {children && isOpen && (
        <div className="ml-6 pl-3 border-l border-border space-y-1 mb-1">
          {children.map((child, index) => (
            <Link
              key={index}
              to={child.path}
              className={cn(
                "flex items-center p-2 rounded-md text-sm transition-colors",
                window.location.pathname === child.path 
                  ? "bg-madagascar-green/5 text-madagascar-green" 
                  : "hover:bg-madagascar-green/5 text-foreground"
              )}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const sidebarItems = [
    {
      icon: <LayoutDashboard size={20} />,
      title: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <ListChecks size={20} />,
      title: "Tours",
      path: "#",
      children: [
        { title: "All Tours", path: "/admin/tours" },
        { title: "Add New Tour", path: "/admin/tours/new" },
        { title: "Categories", path: "/admin/tours/categories" },
      ],
    },
    {
      icon: <CalendarDays size={20} />,
      title: "Bookings",
      path: "/admin/bookings",
    },
    {
      icon: <Users size={20} />,
      title: "Customers",
      path: "/admin/customers",
    },
    {
      icon: <Car size={20} />,
      title: "Vehicles",
      path: "#",
      children: [
        { title: "All Vehicles", path: "/admin/vehicles" },
        { title: "Add Vehicle", path: "/admin/vehicles/new" },
        { title: "Rental Bookings", path: "/admin/vehicles/bookings" },
      ],
    },
    {
      icon: <Building size={20} />,
      title: "Hotels",
      path: "/admin/hotels",
    },
    {
      icon: <Plane size={20} />,
      title: "Flights",
      path: "/admin/flights",
    },
    {
      icon: <BarChart size={20} />,
      title: "Reports",
      path: "/admin/reports",
    },
    {
      icon: <MessageSquare size={20} />,
      title: "Messages",
      path: "/admin/messages",
    },
    {
      icon: <Settings size={20} />,
      title: "Settings",
      path: "#",
      children: [
        { title: "General Settings", path: "/admin/settings" },
        { title: "SEO Settings", path: "/admin/settings/seo" },
        { title: "User Management", path: "/admin/settings/users" },
      ],
    },
  ];

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border overflow-y-auto z-40">
      <div className="p-5 border-b border-border">
        <Logo />
      </div>

      <div className="p-3">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Search..." 
            className="pl-9 text-sm"
          />
        </div>
        
        <nav>
          {sidebarItems.map((item, index) => (
            <SidebarItem 
              key={index}
              icon={item.icon}
              title={item.title}
              path={item.path}
              active={isActive(item.path)}
              children={item.children}
            />
          ))}
        </nav>
      </div>
      
      <div className="border-t border-border p-3 absolute bottom-0 left-0 right-0 bg-card">
        <Link
          to="/logout"
          className="flex items-center justify-center p-3 rounded-md text-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut size={18} className="mr-2" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
