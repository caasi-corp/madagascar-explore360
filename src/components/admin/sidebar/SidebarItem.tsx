
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemChildProps {
  title: string;
  path: string;
}

export interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  children?: SidebarItemChildProps[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title, path, children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  
  // If this is a parent item and one of its children is active, expand it
  React.useEffect(() => {
    if (children && children.some(child => window.location.pathname === child.path)) {
      setIsOpen(true);
    }
  }, [children]);

  const isActive = location.pathname === path;
  
  const toggleOpen = () => {
    if (children) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      {children ? (
        <button 
          onClick={toggleOpen}
          className={cn(
            "w-full flex items-center justify-between p-3 rounded-md mb-1 text-left transition-colors",
            isActive || isOpen
              ? "bg-madagascar-green/10 text-madagascar-green" 
              : "hover:bg-madagascar-green/5 text-foreground"
          )}
        >
          <div className="flex items-center">
            <div className="mr-3">{icon}</div>
            <span className="font-medium">{title}</span>
          </div>
          <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "transform rotate-90")} />
        </button>
      ) : (
        <Link
          to={path}
          className={cn(
            "flex items-center p-3 rounded-md mb-1 transition-colors",
            isActive 
              ? "bg-madagascar-green/10 text-madagascar-green" 
              : "hover:bg-madagascar-green/5 text-foreground"
          )}
        >
          <div className="mr-3">{icon}</div>
          <span className="font-medium">{title}</span>
        </Link>
      )}
      
      {children && isOpen && (
        <div className="ml-6 pl-3 border-l border-border space-y-1 mb-1">
          {children.map((child, index) => (
            <Link
              key={index}
              to={child.path}
              className={cn(
                "flex items-center p-2 rounded-md text-sm transition-colors",
                window.location.pathname === child.path 
                  ? "bg-madagascar-green/5 text-madagascar-green" 
                  : "hover:bg-madagascar-green/5 text-foreground"
              )}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
