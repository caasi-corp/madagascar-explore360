
import React from 'react';
import { Check } from 'lucide-react';
import { Tour } from '@/lib/db/schema';

interface TourAboutTabProps {
  tour: Tour;
}

const TourAboutTab: React.FC<TourAboutTabProps> = ({ tour }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-muted-foreground">{tour.description}</p>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-3">Points forts du circuit</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-madagascar-green mr-2 mt-0.5" />
            <span>Observation de la faune endémique de Madagascar</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-madagascar-green mr-2 mt-0.5" />
            <span>Découverte des paysages spectaculaires et variés</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-madagascar-green mr-2 mt-0.5" />
            <span>Rencontre avec les communautés locales</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-madagascar-green mr-2 mt-0.5" />
            <span>Expérience culinaire malgache authentique</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TourAboutTab;
