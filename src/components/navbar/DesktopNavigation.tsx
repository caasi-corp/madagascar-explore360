
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavbarLink from './NavbarLink';
import NavbarDropdown from './NavbarDropdown';
import ThemeToggle from './ThemeToggle';
import AuthStatus from './AuthStatus';

interface NavItem {
  title: string;
  path: string;
  dropdown?: { title: string; path: string }[];
}

interface DesktopNavigationProps {
  navItems: NavItem[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  scrolled: boolean;
  closeMenu: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ 
  navItems, 
  theme, 
  toggleTheme, 
  scrolled,
  closeMenu 
}) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navItems.map((item, index) => (
        item.dropdown ? (
          <NavbarDropdown
            key={index}
            title={item.title}
            items={item.dropdown}
            isDark={theme === 'dark'}
            isScrolled={scrolled}
            onClick={closeMenu}
          />
        ) : (
          <NavbarLink
            key={index}
            to={item.path}
            title={item.title}
            isActive={isActive(item.path)}
            isDark={theme === 'dark'}
            isScrolled={scrolled}
            onClick={closeMenu}
          />
        )
      ))}
      
      <div className="ml-4 flex items-center space-x-2">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} isScrolled={scrolled} />
        <AuthStatus />
      </div>
    </nav>
  );
};

export default DesktopNavigation;
