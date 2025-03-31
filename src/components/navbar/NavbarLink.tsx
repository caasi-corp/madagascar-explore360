
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarLinkProps {
  to: string;
  title: string;
  isActive?: boolean;
  isDark?: boolean;
  isScrolled?: boolean;
  onClick?: () => void;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ 
  to, 
  title, 
  isActive = false, 
  isDark = false,
  isScrolled = false,
  onClick 
}) => {
  return (
    <Link 
      to={to}
      className={`px-3 py-2 text-base font-medium transition-colors ${
        isActive 
          ? 'text-madagascar-green dark:text-madagascar-yellow font-semibold' 
          : isScrolled || isDark
            ? 'text-foreground'
            : 'text-white'
      }`}
      onClick={onClick}
    >
      {title}
    </Link>
  );
};

export default NavbarLink;
