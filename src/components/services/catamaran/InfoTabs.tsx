
import React from 'react';
import { Fish, Shell, Compass, Waves, Sun } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import DestinationCard, { Destination } from './DestinationCard';
import ExperienceCard, { Experience } from './ExperienceCard';

interface InfoTabsProps {
  destinations: Destination[];
  experiences: Experience[];
}

const InfoTabs: React.FC<InfoTabsProps> = ({ destinations, experiences }) => {
  return (
    <Tabs defaultValue="destinations" className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Explorez Nos Offres</h2>
        <TabsList className="inline-flex">
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="experiences">Expériences</TabsTrigger>
          <TabsTrigger value="practical">Informations Pratiques</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="destinations" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} destination={destination} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="experiences" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="practical" className="space-y-8">
        <Card variant="glass">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Compass className="mr-2 text-northgascar-teal" /> Quand partir ?
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  La meilleure période pour une croisière en catamaran à Madagascar s'étend d'avril à novembre, pendant la saison sèche.
                </p>
                <p className="text-sm text-muted-foreground">
                  De mai à octobre, vous profiterez d'un climat idéal avec des températures agréables et une mer calme, parfaite pour la navigation.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Shell className="mr-2 text-northgascar-teal" /> Que prévoir ?
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                  <li>Crème solaire (écologique si possible)</li>
                  <li>Chapeau et lunettes de soleil</li>
                  <li>Maillots de bain</li>
                  <li>Vêtements légers</li>
                  <li>Chaussures aquatiques</li>
                  <li>Appareil photo étanche</li>
                  <li>Médicaments personnels</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InfoTabs;
