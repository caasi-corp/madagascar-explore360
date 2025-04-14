
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import AuthStatus from './AuthStatus';

interface NavItem {
  title: string;
  path: string;
  dropdown?: { title: string; path: string }[];
}

interface MobileNavigationProps {
  navItems: NavItem[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  navItems,
  theme,
  toggleTheme,
  isMenuOpen,
  toggleMenu,
  closeMenu
}) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="md:hidden">
      <div className="flex items-center">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        
        <Button 
          onClick={toggleMenu} 
          variant="ghost" 
          size="icon"
          className="ml-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-madagascar-blue/95 shadow-lg animate-fade-in">
          <nav className="container mx-auto p-4 flex flex-col space-y-4">
            {navItems.map((item, index) => (
              item.dropdown ? (
                <div key={index} className="flex flex-col space-y-2">
                  <div className="font-medium text-lg">{item.title}</div>
                  <div className="pl-4 flex flex-col space-y-2">
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`py-1 text-base ${isActive(subItem.path) ? 'text-madagascar-green dark:text-madagascar-yellow font-medium' : ''}`}
                        onClick={closeMenu}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className={`py-2 text-lg font-medium ${isActive(item.path) ? 'text-madagascar-green dark:text-madagascar-yellow' : ''}`}
                  onClick={closeMenu}
                >
                  {item.title}
                </Link>
              )
            ))}
            <div className="pt-4">
              <AuthStatus />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
