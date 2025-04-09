
import React from 'react';
import { Ship, Anchor, Wind } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Hero from '@/components/hero/Hero';

const CatamaranCruise = () => {
  const catamaranOptions = [
    {
      title: 'Croisière journée',
      description: 'Une journée complète de navigation le long des côtes avec repas et boissons inclus.',
      icon: <Ship className="h-8 w-8" />,
      price: 199,
      duration: '1 jour',
    },
    {
      title: 'Week-end en mer',
      description: 'Deux jours de croisière avec nuit à bord, repas gastronomiques et activités aquatiques.',
      icon: <Anchor className="h-8 w-8" />,
      price: 499,
      duration: '2 jours',
    },
    {
      title: 'Semaine d\'exploration',
      description: 'Explorez plusieurs îles et baies secrètes pendant une semaine complète à bord de nos catamarans de luxe.',
      icon: <Wind className="h-8 w-8" />,
      price: 1299,
      duration: '7 jours',
    },
  ];

  return (
    <>
      <Hero 
        title="Croisières en Catamaran à Madagascar" 
        subtitle="Explorez les eaux cristallines et les îles paradisiaques de Madagascar à bord de nos catamarans luxueux"
        height="h-[70vh]"
        backgroundImage="https://images.unsplash.com/photo-1544551763-46a013bb70d5"
        showSearch={false}
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Une expérience de navigation inoubliable</h2>
            <p className="text-lg text-muted-foreground">
              Nos catamarans modernes vous offrent confort, stabilité et espace pour profiter pleinement 
              de votre croisière le long des côtes malgaches. Que vous soyez débutant ou marin expérimenté, 
              nos équipages professionnels vous garantissent une expérience sécuritaire et agréable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {catamaranOptions.map((option, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">{option.price} €</span>
                    <span className="text-sm text-muted-foreground">{option.duration}</span>
                  </div>
                  <Button className="w-full">Réserver maintenant</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">Ce qui est inclus</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                  <Ship className="h-4 w-4 text-primary" />
                </span>
                <span>Équipage professionnel et attentionné</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                  <Ship className="h-4 w-4 text-primary" />
                </span>
                <span>Repas et boissons préparés à bord</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                  <Ship className="h-4 w-4 text-primary" />
                </span>
                <span>Équipement de snorkeling et de pêche</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                  <Ship className="h-4 w-4 text-primary" />
                </span>
                <span>Visites des îles et villages locaux</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                  <Ship className="h-4 w-4 text-primary" />
                </span>
                <span>Assurance et équipement de sécurité</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default CatamaranCruise;
