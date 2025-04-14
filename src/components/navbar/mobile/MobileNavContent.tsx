
import React from 'react';
import MobileNavHeader from './MobileNavHeader';
import MobileNavLink from './MobileNavLink';
import MobileNavSection from './MobileNavSection';

const MobileNavContent: React.FC = () => {
  return (
    <>
      <MobileNavHeader />
      
      <nav className="flex flex-col gap-4 mt-8">
        <MobileNavLink to="/">
          Accueil
        </MobileNavLink>

        <MobileNavSection 
          title="Circuits"
          items={[
            { title: 'Tous les circuits', path: '/tours' },
            { title: 'Nord', path: '/tours?region=north' },
            { title: 'Sud', path: '/tours?region=south' },
            { title: 'Est', path: '/tours?region=east' },
            { title: 'Ouest', path: '/tours?region=west' },
          ]}
        />

        <MobileNavSection 
          title="Services"
          items={[
            { title: 'Location de voitures', path: '/car-rental' },
            { title: 'Croisières en catamaran', path: '/catamaran-cruise' },
            { title: 'Réservation d\'hôtels', path: '/hotels' },
            { title: 'Vols', path: '/flights' },
          ]}
        />

        <MobileNavLink to="/about">
          À propos
        </MobileNavLink>

        <MobileNavLink to="/contact">
          Contact
        </MobileNavLink>
      </nav>
    </>
  );
};

export default MobileNavContent;
