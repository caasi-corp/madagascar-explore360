import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { title: 'Accueil', path: '/' },
    { title: 'Circuits', path: '/tours' },
    { 
      title: 'Services', 
      path: '#', 
      dropdown: [
        { title: 'Location de Voiture', path: '/services/car-rental' },
        { title: 'Réservation de Vol', path: '/services/flights' },
        { title: 'Réservation d\'Hôtel', path: '/services/hotels' },
      ]
    },
    { title: 'À Propos', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-madagascar-blue/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo variant={scrolled || theme === 'dark' ? 'default' : 'white'} />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            item.dropdown ? (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`px-3 flex items-center text-base font-medium ${
                      scrolled || theme === 'dark'
                        ? 'text-foreground hover:text-madagascar-green'
                        : 'text-white hover:text-madagascar-yellow'
                    }`}
                  >
                    {item.title} <ChevronDown size={16} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.dropdown.map((subItem, subIndex) => (
                    <DropdownMenuItem key={subIndex} asChild>
                      <Link to={subItem.path}>{subItem.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                key={index} 
                to={item.path}
                className={`px-3 py-2 text-base font-medium transition-colors ${
                  isActive(item.path) 
                    ? 'text-madagascar-green dark:text-madagascar-yellow font-semibold' 
                    : scrolled || theme === 'dark'
                      ? 'text-foreground hover:text-madagascar-green'
                      : 'text-white hover:text-madagascar-yellow'
                }`}
                onClick={closeMenu}
              >
                {item.title}
              </Link>
            )
          ))}
          
          <div className="ml-4 flex items-center space-x-2">
            <Button 
              onClick={toggleTheme} 
              variant="ghost" 
              size="icon" 
              className={`rounded-full ${
                scrolled || theme === 'dark'
                  ? 'text-foreground hover:text-madagascar-green'
                  : 'text-white hover:text-madagascar-yellow'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            <Link to="/login">
              <Button 
                variant="outline" 
                className="rounded-full"
              >
                <User size={18} className="mr-1" /> Connexion
              </Button>
            </Link>
            
            <Link to="/register">
              <Button className="rounded-full bg-madagascar-green hover:bg-madagascar-green/80 text-white">
                S'inscrire
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation Toggle Button */}
        <div className="md:hidden flex items-center">
          <Button 
            onClick={toggleTheme}
            variant="ghost" 
            size="icon"
            className="mr-2"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <Button 
            onClick={toggleMenu} 
            variant="ghost" 
            size="icon"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-madagascar-blue/95 shadow-lg animate-fade-in">
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
              <div className="pt-4 flex space-x-3">
                <Link to="/login" className="w-1/2">
                  <Button variant="outline" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link to="/register" className="w-1/2">
                  <Button className="w-full bg-madagascar-green hover:bg-madagascar-green/80 text-white">
                    S'inscrire
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
