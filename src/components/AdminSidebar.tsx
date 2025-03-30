
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import SidebarHeader from './admin/sidebar/SidebarHeader';
import SidebarNavigation from './admin/sidebar/SidebarNavigation';
import SidebarFooterAction from './admin/sidebar/SidebarFooterAction';

const AdminSidebar: React.FC = () => {
  return (
    <Sidebar className="border-r border-white/10 dark:border-white/5 backdrop-blur-md bg-white/70 dark:bg-black/50">
      <SidebarHeader />
      <SidebarContent>
        <SidebarNavigation />
      </SidebarContent>
      <SidebarFooter className="border-t border-white/10 dark:border-white/5">
        <SidebarFooterAction />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
