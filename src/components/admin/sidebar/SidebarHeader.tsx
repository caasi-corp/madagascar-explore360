
import React from 'react';
import { SidebarHeader as BaseSidebarHeader } from '@/components/ui/sidebar';
import Logo from '@/components/Logo';
import SidebarSearch from './SidebarSearch';

const SidebarHeader: React.FC = () => {
  return (
    <BaseSidebarHeader>
      <div className="p-3 flex justify-center">
        <Logo />
      </div>
      <SidebarSearch />
    </BaseSidebarHeader>
  );
};

export default SidebarHeader;
