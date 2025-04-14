
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SheetClose } from '@/components/ui/sheet';
import { ChevronRight } from 'lucide-react';

interface MobileNavLinkProps {
  to: string;
  indented?: boolean;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, indented = false, children }) => {
  return (
    <SheetClose asChild>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${
            indented ? 'pl-6' : ''
          } ${
            isActive
              ? 'bg-muted/80 text-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`
        }
      >
        {children}
        <ChevronRight className="h-4 w-4" />
      </NavLink>
    </SheetClose>
  );
};

export default MobileNavLink;
