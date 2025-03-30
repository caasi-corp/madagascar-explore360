
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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const hasActiveChild = (children: { path: string }[] = []) => {
    return children?.some(child => location.pathname === child.path);
  };

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
    <Sidebar className="border-r border-white/10 dark:border-white/5 backdrop-blur-md bg-white/70 dark:bg-black/50">
      <SidebarHeader>
        <div className="p-3 flex justify-center">
          <Logo />
        </div>
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Search..." 
              className="pl-9 text-sm glass-input bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              {item.children ? (
                <>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={hasActiveChild(item.children)}
                    className="hover:bg-northgascar-teal/10 data-[active=true]:bg-northgascar-teal/20"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.children.map((child, idx) => (
                      <SidebarMenuSubItem key={idx}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(child.path)}
                        >
                          <Link to={child.path}>{child.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </>
              ) : (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive(item.path)}
                  className="hover:bg-northgascar-teal/10 data-[active=true]:bg-northgascar-teal/20"
                >
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 dark:border-white/5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-destructive hover:bg-destructive/10">
              <Link to="/logout">
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
