
import React from 'react';
import { useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import SidebarNavItem from './SidebarNavItem';
import SidebarSubmenu from './SidebarSubmenu';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  submenu?: NavItem[];
}

interface SidebarNavGroupProps {
  item: NavItem;
  expandedSubmenu: string | null;
  onToggleSubmenu: (name: string) => void;
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({
  item,
  expandedSubmenu,
  onToggleSubmenu
}) => {
  const location = useLocation();
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const isSubmenuExpanded = expandedSubmenu === item.name;
  const isActive = location.pathname === item.href || 
                   (hasSubmenu && item.submenu?.some(subitem => location.pathname === subitem.href));

  return (
    <div className="mb-1">
      <SidebarNavItem 
        name={item.name}
        href={item.href}
        icon={item.icon}
        isActive={isActive}
        hasSubmenu={hasSubmenu}
        isSubmenuExpanded={isSubmenuExpanded}
        onToggle={() => onToggleSubmenu(item.name)}
      />
      
      {hasSubmenu && (
        <SidebarSubmenu 
          items={item.submenu || []}
          isExpanded={isSubmenuExpanded}
        />
      )}
    </div>
  );
};

export default SidebarNavGroup;
