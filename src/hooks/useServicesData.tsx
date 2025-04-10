
import React from 'react';
import { Map, Car, Building, Ship } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export function useServicesData(): ServiceItem[] {
  const services: ServiceItem[] = [
    {
      title: 'Circuits & Excursions',
      description: 'Visites guidées à travers les plus beaux paysages et réserves de faune de Madagascar.',
      icon: <Map className="h-8 w-8 text-madagascar-green" />,
      link: '/tours',
    },
    {
      title: 'Location de Véhicules',
      description: 'Choisissez parmi notre flotte de 4x4, voitures, motos et quads pour votre aventure.',
      icon: <Car className="h-8 w-8 text-madagascar-green" />,
      link: '/services/car-rental',
    },
    {
      title: 'Croisières en Catamaran',
      description: 'Découvrez les merveilles de Madagascar lors d\'une croisière exclusive en catamaran.',
      icon: <Ship className="h-8 w-8 text-madagascar-green" />,
      link: '/services/catamaran',
    },
    {
      title: 'Réservation d\'Hôtels',
      description: 'Trouvez l\'hébergement parfait, des complexes de luxe aux éco-lodges.',
      icon: <Building className="h-8 w-8 text-madagascar-green" />,
      link: '/services/hotels',
    },
  ];

  return services;
}
