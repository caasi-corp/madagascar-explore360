
import React from 'react';
import { Shield, Map, Users } from 'lucide-react';

export interface Advantage {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Create a function that will render the icon when called
const createIconFactory = (IconComponent: typeof Shield | typeof Map | typeof Users) => {
  return () => React.createElement(IconComponent, { 
    className: "w-8 h-8 text-northgascar-navy dark:text-northgascar-teal" 
  });
};

export const advantages: Advantage[] = [
  {
    title: "Sécurité Garantie",
    description: "Voyagez en toute sérénité avec nos guides expérimentés et nos véhicules bien entretenus",
    icon: createIconFactory(Shield)()
  },
  {
    title: "Expertise Locale",
    description: "Bénéficiez des connaissances approfondies de nos guides natifs de Madagascar",
    icon: createIconFactory(Map)()
  },
  {
    title: "Expériences Authentiques",
    description: "Immergez-vous dans la culture malgache avec des rencontres authentiques",
    icon: createIconFactory(Users)()
  }
];
