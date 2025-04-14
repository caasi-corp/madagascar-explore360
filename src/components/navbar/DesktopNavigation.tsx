
import React from 'react';
import { NavLink } from 'react-router-dom';
import NavbarDropdown from './NavbarDropdown';

const DesktopNavigation: React.FC = () => {
  return (
    <nav className="flex items-center gap-1">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? 'bg-muted/80 text-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`
        }
      >
        Accueil
      </NavLink>

      <NavbarDropdown 
        trigger="Circuits"
        items={[
          { label: 'Tous les circuits', href: '/tours' },
          { label: 'Nord', href: '/tours?region=north' },
          { label: 'Sud', href: '/tours?region=south' },
          { label: 'Est', href: '/tours?region=east' },
          { label: 'Ouest', href: '/tours?region=west' },
        ]}
      />

      <NavbarDropdown 
        trigger="Services"
        items={[
          { label: 'Location de voitures', href: '/car-rental' },
          { label: 'Croisières en catamaran', href: '/catamaran-cruise' },
          { label: 'Réservation d\'hôtels', href: '/hotels' },
          { label: 'Vols', href: '/flights' },
        ]}
      />

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? 'bg-muted/80 text-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`
        }
      >
        À propos
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? 'bg-muted/80 text-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`
        }
      >
        Contact
      </NavLink>
    </nav>
  );
};

export default DesktopNavigation;
