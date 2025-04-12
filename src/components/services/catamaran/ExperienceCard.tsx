
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export interface Experience {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <Card variant="glass" className="p-6 text-center hover-scale">
      <CardContent className="p-0">
        <div className="flex justify-center mb-4">
          {experience.icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
        <p className="text-sm text-muted-foreground">{experience.description}</p>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
