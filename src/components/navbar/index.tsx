
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
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
    // Default to dark theme
    setTheme('dark');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
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

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-northgascar-navy"
    >
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <Logo variant="white" />
        
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
