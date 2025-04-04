
import React from 'react';
import { Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Travelers } from './types';

interface TravelersSearchProps {
  travelers: Travelers;
  setTravelers: (travelers: Travelers) => void;
  isTravelersOpen: boolean;
  setIsTravelersOpen: (isOpen: boolean) => void;
}

const TravelersSearch: React.FC<TravelersSearchProps> = ({
  travelers,
  setTravelers,
  isTravelersOpen,
  setIsTravelersOpen
}) => {
  // Format travelers for display
  const formatTravelers = () => {
    const { adults, children, infants } = travelers;
    const totalTravelers = adults + children + infants;
    
    if (totalTravelers === 1) {
      return '1 voyageur';
    }
    
    return `${totalTravelers} voyageurs`;
  };

  // Helper function to update travelers state
  const updateTravelers = (field: keyof Travelers, value: number) => {
    const updatedTravelers = {
      ...travelers,
      [field]: value
    };
    setTravelers(updatedTravelers);
  };

  return (
    <div className="relative w-full">
      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
      <Popover open={isTravelersOpen} onOpenChange={setIsTravelersOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="glass"
            className="w-full h-11 pl-10 justify-between font-normal text-sm"
          >
            <span className="truncate">{formatTravelers()}</span>
            <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 z-50" align="center">
          <div className="space-y-4">
            <TravelerCounter 
              title="Adultes"
              subtitle="13+ ans"
              count={travelers.adults}
              min={1}
              max={10}
              onChange={(value) => updateTravelers('adults', value)}
            />
            <TravelerCounter 
              title="Enfants"
              subtitle="2-12 ans"
              count={travelers.children}
              min={0}
              max={6}
              onChange={(value) => updateTravelers('children', value)}
            />
            <TravelerCounter 
              title="Bébés"
              subtitle="0-2 ans"
              count={travelers.infants}
              min={0}
              max={4}
              onChange={(value) => updateTravelers('infants', value)}
            />
            <Button 
              className="w-full"
              onClick={() => setIsTravelersOpen(false)}
            >
              Appliquer
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface TravelerCounterProps {
  title: string;
  subtitle: string;
  count: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const TravelerCounter: React.FC<TravelerCounterProps> = ({
  title,
  subtitle,
  count,
  min,
  max,
  onChange
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={() => onChange(Math.max(min, count - 1))}
          disabled={count <= min}
        >
          -
        </Button>
        <span className="w-10 text-center">{count}</span>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={() => onChange(Math.min(max, count + 1))}
          disabled={count >= max}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default TravelersSearch;
