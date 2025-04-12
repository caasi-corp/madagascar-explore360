
import React from 'react';
import { useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import SidebarNavItem from './SidebarNavItem';
import SidebarSubmenu from './SidebarSubmenu';

interface NavItemType {
  name: string;
  href: string;
  icon: LucideIcon;
  submenu?: NavItemType[];
}

interface SidebarNavGroupProps {
  title: string;
  items: NavItemType[];
  expandedSubmenu: string | null;
  onToggleSubmenu: (name: string) => void;
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({
  title,
  items,
  expandedSubmenu,
  onToggleSubmenu
}) => {
  const location = useLocation();

  return (
    <div className="mb-4">
      <div className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {title}
      </div>
      
      {items.map(item => {
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isSubmenuExpanded = expandedSubmenu === item.name;
        const isActive = location.pathname === item.href || 
                        (hasSubmenu && item.submenu?.some(subitem => location.pathname === subitem.href));

        return (
          <div key={item.name} className="mb-1">
            <SidebarNavItem 
              name={item.name}
              href={item.href}
              icon={item.icon}
              isActive={isActive}
              hasSubmenu={hasSubmenu}
              isSubmenuExpanded={isSubmenuExpanded}
              onToggle={() => onToggleSubmenu(item.name)}
            />
            
            {hasSubmenu && isSubmenuExpanded && (
              <div className="ml-6 pl-3 border-l border-border space-y-1 my-1">
                {item.submenu?.map(subitem => (
                  <Link
                    key={subitem.name}
                    to={subitem.href}
                    className={cn(
                      "flex items-center p-2 rounded-md text-sm transition-colors",
                      location.pathname === subitem.href 
                        ? "bg-accent text-accent-foreground" 
                        : "hover:bg-muted"
                    )}
                  >
                    {subitem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarNavGroup;
