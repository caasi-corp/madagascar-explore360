
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ItinerarySection from './ItinerarySection';
import IncludesExcludesSection from './IncludesExcludesSection';

interface ItineraryItem {
  time: string;
  description: string;
}

interface ProgramSectionProps {
  itinerary: ItineraryItem[];
  includes: string[];
  excludes: string[];
  onAddItineraryItem: () => void;
  onRemoveItineraryItem: (index: number) => void;
  onUpdateItineraryItem: (index: number, field: "time" | "description", value: string) => void;
  onAddItem: (field: "includes" | "excludes", value: string) => void;
  onRemoveItem: (field: "includes" | "excludes", index: number) => void;
}

const ProgramSection: React.FC<ProgramSectionProps> = ({
  itinerary,
  includes,
  excludes,
  onAddItineraryItem,
  onRemoveItineraryItem,
  onUpdateItineraryItem,
  onAddItem,
  onRemoveItem
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Programme</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ItinerarySection 
          itinerary={itinerary}
          onAdd={onAddItineraryItem}
          onRemove={onRemoveItineraryItem}
          onUpdate={onUpdateItineraryItem}
        />
        
        <IncludesExcludesSection 
          includes={includes}
          excludes={excludes}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      </CardContent>
    </Card>
  );
};

export default ProgramSection;
