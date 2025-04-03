
import React from 'react';
import { CheckCircle, HeartHandshake, ShieldCheck } from 'lucide-react';

export interface Advantage {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function useAdvantages(): Advantage[] {
  const advantages: Advantage[] = [
    {
      title: 'Guides Locaux Experts',
      description: 'Nos guides compétents sont originaires de Madagascar et parlent plusieurs langues.',
      icon: <CheckCircle className="h-8 w-8 text-madagascar-yellow" />,
    },
    {
      title: 'Tourisme Durable',
      description: 'Nous sommes engagés dans la conservation de l\'environnement et le soutien aux communautés locales.',
      icon: <HeartHandshake className="h-8 w-8 text-madagascar-yellow" />,
    },
    {
      title: 'Sûr et Fiable',
      description: 'Votre sécurité est notre priorité avec des véhicules bien entretenus et un support client 24/7.',
      icon: <ShieldCheck className="h-8 w-8 text-madagascar-yellow" />,
    },
  ];

  return advantages;
}
