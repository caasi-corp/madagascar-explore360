
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Plus, Clock } from 'lucide-react';

interface ItineraryItem {
  time: string;
  description: string;
}

interface ItinerarySectionProps {
  itinerary: ItineraryItem[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: "time" | "description", value: string) => void;
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({
  itinerary,
  onAdd,
  onRemove,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <Label className="flex items-center">
        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
        Itinéraire
      </Label>
      <ScrollArea className="max-h-[300px] pr-4">
        {itinerary.map((item, index) => (
          <div key={index} className="flex items-start mb-3">
            <Input
              className="w-24 mr-2"
              value={item.time}
              onChange={(e) => onUpdate(index, "time", e.target.value)}
              placeholder="Heure"
            />
            <Input
              className="flex-1 mr-2"
              value={item.description}
              onChange={(e) => onUpdate(index, "description", e.target.value)}
              placeholder="Description"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onRemove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </ScrollArea>
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={onAdd}
      >
        <Plus className="mr-2 h-4 w-4" /> Ajouter une étape
      </Button>
    </div>
  );
};

export default ItinerarySection;
