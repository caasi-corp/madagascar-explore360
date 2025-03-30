
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const SidebarFooterAction: React.FC = () => {
  return (
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
  );
};

export default SidebarFooterAction;
