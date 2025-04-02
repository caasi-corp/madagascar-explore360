
import React from 'react';
import { Globe, Car, Building, Calendar } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export const services: Service[] = [
  {
    title: "Circuits Touristiques",
    description: "Des parcours sur mesure pour découvrir les merveilles de Madagascar",
    icon: <Globe className="w-6 h-6 text-madagascar-green" />,
    link: "/tours"
  },
  {
    title: "Location de Voitures",
    description: "Une flotte de véhicules adaptés à tous les types de terrains",
    icon: <Car className="w-6 h-6 text-madagascar-green" />,
    link: "/services/car-rental"
  },
  {
    title: "Réservation d'Hôtels",
    description: "Des hébergements soigneusement sélectionnés pour votre confort",
    icon: <Building className="w-6 h-6 text-madagascar-green" />,
    link: "/services/hotel-booking"
  },
  {
    title: "Vols Domestiques",
    description: "Organisation de vos déplacements internes en avion",
    icon: <Calendar className="w-6 h-6 text-madagascar-green" />,
    link: "/services/flight-booking"
  }
];
