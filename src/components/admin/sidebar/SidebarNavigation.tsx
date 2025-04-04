
import React from 'react';
import { useLocation } from 'react-router-dom';
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
  MessageSquare
} from 'lucide-react';
import SidebarItem from './SidebarItem';

const SidebarNavigation: React.FC = () => {
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
  );
};

export default SidebarNavigation;
