
import React from 'react';
import { Globe, Car, Building, Calendar } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

// Create a function that will render the icon when called
const createIconFactory = (IconComponent: typeof Globe | typeof Car | typeof Building | typeof Calendar) => {
  return () => React.createElement(IconComponent, { 
    className: "w-6 h-6 text-madagascar-green" 
  });
};

export const services: Service[] = [
  {
    title: "Circuits Touristiques",
    description: "Des parcours sur mesure pour découvrir les merveilles de Madagascar",
    icon: createIconFactory(Globe)(),
    link: "/tours"
  },
  {
    title: "Location de Voitures",
    description: "Une flotte de véhicules adaptés à tous les types de terrains",
    icon: createIconFactory(Car)(),
    link: "/services/car-rental"
  },
  {
    title: "Réservation d'Hôtels",
    description: "Des hébergements soigneusement sélectionnés pour votre confort",
    icon: createIconFactory(Building)(),
    link: "/services/hotel-booking"
  },
  {
    title: "Vols Domestiques",
    description: "Organisation de vos déplacements internes en avion",
    icon: createIconFactory(Calendar)(),
    link: "/services/flight-booking"
  }
];
