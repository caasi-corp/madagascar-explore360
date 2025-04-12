
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
  hasSubmenu?: boolean;
  isSubmenuExpanded?: boolean;
  onToggle?: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  name,
  href,
  icon: Icon,
  isActive = false,
  hasSubmenu = false,
  isSubmenuExpanded = false,
  onToggle
}) => {
  const location = useLocation();
  
  // Check if current route is active
  const checkIsActive = () => {
    if (isActive !== undefined) return isActive;
    return location.pathname === href;
  };
  
  const isCurrentActive = checkIsActive();
  
  if (hasSubmenu) {
    return (
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors",
          isCurrentActive 
            ? "bg-accent text-accent-foreground" 
            : "hover:bg-muted"
        )}
      >
        <Icon className="mr-2 h-4 w-4" />
        <span>{name}</span>
        <svg
          className={cn(
            "ml-auto h-4 w-4 transition-transform",
            isSubmenuExpanded ? "rotate-90" : ""
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    );
  }

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
        isCurrentActive 
          ? "bg-accent text-accent-foreground" 
          : "hover:bg-muted"
      )}
    >
      <Icon className="mr-2 h-4 w-4" />
      <span>{name}</span>
    </Link>
  );
};

export default SidebarNavItem;
