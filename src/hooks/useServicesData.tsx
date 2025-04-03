
import React from 'react';
import { Map, Car, Plane, Building } from 'lucide-react';

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
      title: 'Réservation de Vols',
      description: 'Réservations de vols nationaux et internationaux à des prix compétitifs.',
      icon: <Plane className="h-8 w-8 text-madagascar-green" />,
      link: '/services/flights',
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
