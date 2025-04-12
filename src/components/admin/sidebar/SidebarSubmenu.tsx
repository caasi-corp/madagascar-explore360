
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubmenuItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarSubmenuProps {
  items: SubmenuItemProps[];
  isExpanded: boolean;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({ items, isExpanded }) => {
  const location = useLocation();

  if (!isExpanded) return null;

  return (
    <div className="mt-1 ml-4 space-y-1">
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
            location.pathname === item.href
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default SidebarSubmenu;
