
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

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
        { title: 'Croisières en Catamaran', path: '/services/catamaran' },
        { title: 'Réservation de Vol', path: '/services/flights' },
        { title: 'Réservation d\'Hôtel', path: '/services/hotels' },
      ]
    },
    { title: 'À Propos', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

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
        
        <DesktopNavigation
          navItems={navItems}
          theme={theme}
          toggleTheme={toggleTheme}
          scrolled={scrolled}
          closeMenu={closeMenu}
        />

        <MobileNavigation
          navItems={navItems}
          theme={theme}
          toggleTheme={toggleTheme}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          closeMenu={closeMenu}
        />
      </div>
    </header>
  );
};

export default Navbar;
