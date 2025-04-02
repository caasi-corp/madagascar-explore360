
import React from 'react';
import { Shield, Map, Users } from 'lucide-react';

export interface Advantage {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const advantages: Advantage[] = [
  {
    title: "Sécurité Garantie",
    description: "Voyagez en toute sérénité avec nos guides expérimentés et nos véhicules bien entretenus",
    icon: <Shield className="w-8 h-8 text-northgascar-navy dark:text-northgascar-teal" />
  },
  {
    title: "Expertise Locale",
    description: "Bénéficiez des connaissances approfondies de nos guides natifs de Madagascar",
    icon: <Map className="w-8 h-8 text-northgascar-navy dark:text-northgascar-teal" />
  },
  {
    title: "Expériences Authentiques",
    description: "Immergez-vous dans la culture malgache avec des rencontres authentiques",
    icon: <Users className="w-8 h-8 text-northgascar-navy dark:text-northgascar-teal" />
  }
];
