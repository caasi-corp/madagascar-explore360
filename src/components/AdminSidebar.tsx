
import React from 'react';
import Logo from './Logo';
import SidebarSearch from './admin/sidebar/SidebarSearch';
import SidebarNavigation from './admin/sidebar/SidebarNavigation';
import LogoutButton from './admin/sidebar/LogoutButton';

const AdminSidebar: React.FC = () => {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border overflow-y-auto z-40">
      <div className="p-5 border-b border-border">
        <Logo />
      </div>

      <div className="p-3">
        <SidebarSearch />
        <SidebarNavigation />
      </div>
      
      <LogoutButton />
    </aside>
  );
};

export default AdminSidebar;
