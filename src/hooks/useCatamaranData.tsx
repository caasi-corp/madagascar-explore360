
import React from 'react';
import { Fish, Shell, Compass, Waves, Sun } from 'lucide-react';
import { Experience } from '@/components/services/catamaran/ExperienceCard';
import { Destination } from '@/components/services/catamaran/DestinationCard';
import { CruiseOption } from '@/components/services/catamaran/CruiseCard';
import { Catamaran } from '@/components/services/catamaran/CatamaranCard';

export const useCatamaranData = () => {
  const cruiseOptions: CruiseOption[] = [
    {
      id: 1,
      name: "Découverte de la Baie de Nosy Be",
      duration: "1 jour",
      description: "Explorez les eaux cristallines autour de Nosy Be à bord d'un catamaran de luxe.",
      price: 180,
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6"
    },
    {
      id: 2,
      name: "Les Îles de Mitsio",
      duration: "3 jours",
      description: "Croisière vers l'archipel de Mitsio avec plongée, pêche et détente sur des plages désertes.",
      price: 650,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
    },
    {
      id: 3,
      name: "Tour de Nosy Komba",
      duration: "2 jours",
      description: "Excursion vers l'île aux lémuriens avec nuit à bord et baignade avec les tortues marines.",
      price: 380,
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
    },
    {
      id: 4,
      name: "Expédition Radama",
      duration: "5 jours",
      description: "Aventure vers les îles Radama avec leurs récifs coralliens exceptionnels et villages de pêcheurs.",
      price: 990,
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4"
    }
  ];
  
  const destinations: Destination[] = [
    {
      name: "Nosy Be",
      image: "https://images.unsplash.com/photo-1590523278191-304df6c77268",
      description: "L'île parfumée, point de départ de toutes nos croisières"
    },
    {
      name: "Archipel de Mitsio",
      image: "https://images.unsplash.com/photo-1465447142348-e9952c393450",
      description: "Un paradis de biodiversité marine aux eaux turquoise"
    },
    {
      name: "Nosy Komba",
      image: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c",
      description: "L'île aux lémuriens avec ses plages sauvages"
    },
    {
      name: "Îles Radama",
      image: "https://images.unsplash.com/photo-1562523331-9ddcaeda6477",
      description: "Archipel préservé aux eaux cristallines et à la biodiversité exceptionnelle"
    }
  ];

  const catamarans: Catamaran[] = [
    {
      id: 1,
      name: "Paradis Bleu",
      type: "Lagoon 42",
      capacity: 8,
      cabins: 4,
      length: "12.8m",
      description: "Notre catamaran le plus confortable avec 4 grandes cabines doubles et un spacieux salon extérieur.",
      features: ["Cuisine équipée", "Kayaks", "Équipement de plongée", "Paddle", "Sound system"],
      images: [
        "https://images.unsplash.com/photo-1563296291-14f26f10c20c", // Remplacé l'image qui ne fonctionne pas
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166",
        "https://images.unsplash.com/photo-1542066559-83d5c27d5d6e"
      ]
    },
    {
      id: 2,
      name: "Océan Nomade",
      type: "Nautitech 40",
      capacity: 6,
      cabins: 3,
      length: "11.4m",
      description: "Catamaran rapide idéal pour les amateurs de navigations sportives et les petits groupes.",
      features: ["Générateur", "Dessalinisateur", "Wifi", "Équipement de pêche", "Toilettes électriques"],
      images: [
        "https://images.unsplash.com/photo-1563296291-14f26f10c20c",
        "https://images.unsplash.com/photo-1556216576-a2eac9d8e7b7",
        "https://images.unsplash.com/photo-1562521623-d77d771453e0"
      ]
    }
  ];

  const experiences: Experience[] = [
    {
      title: "Snorkeling avec les tortues",
      description: "Explorez les récifs coralliens et nagez aux côtés des tortues marines dans des eaux cristallines.",
      icon: <Fish className="h-10 w-10 text-northgascar-teal" />
    },
    {
      title: "Plages désertes",
      description: "Découvrez des plages de sable blanc immaculées accessibles uniquement par bateau.",
      icon: <Sun className="h-10 w-10 text-northgascar-teal" />
    },
    {
      title: "Villages de pêcheurs",
      description: "Rencontrez les communautés locales et découvrez leur mode de vie traditionnel.",
      icon: <Shell className="h-10 w-10 text-northgascar-teal" />
    },
    {
      title: "Couchers de soleil",
      description: "Admirez des couchers de soleil spectaculaires depuis le pont de votre catamaran.",
      icon: <Waves className="h-10 w-10 text-northgascar-teal" />
    }
  ];

  return {
    cruiseOptions,
    destinations,
    catamarans,
    experiences
  };
};
