
import React, { useState } from 'react';
import { Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface TravelerCount {
  adults: number;
  children: number;
  infants: number;
}

interface TravelersSelectorProps {
  travelers: TravelerCount;
  setTravelers: (travelers: TravelerCount) => void;
}

const TravelersSelector: React.FC<TravelersSelectorProps> = ({ travelers, setTravelers }) => {
  const [isTravelersOpen, setIsTravelersOpen] = useState(false);

  // Format travelers for display
  const formatTravelers = () => {
    const { adults, children, infants } = travelers;
    const totalTravelers = adults + children + infants;
    
    if (totalTravelers === 1) {
      return '1 voyageur';
    }
    
    let display = `${totalTravelers} voyageurs`;
    
    if (children > 0 || infants > 0) {
      display += ` (${adults} adulte${adults > 1 ? 's' : ''}`;
      if (children > 0) display += `, ${children} enfant${children > 1 ? 's' : ''}`;
      if (infants > 0) display += `, ${infants} bébé${infants > 1 ? 's' : ''}`;
      display += ')';
    }
    
    return display;
  };

  return (
    <div className="relative">
      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
      <Popover open={isTravelersOpen} onOpenChange={setIsTravelersOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="glass"
            className="w-full pl-10 justify-between font-normal"
          >
            {formatTravelers()}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 glass-popover" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Adultes</p>
                <p className="text-xs text-muted-foreground">13+ ans</p>
              </div>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => setTravelers(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                  disabled={travelers.adults <= 1}
                >
                  -
                </Button>
                <span className="w-10 text-center">{travelers.adults}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => setTravelers(prev => ({ ...prev, adults: Math.min(10, prev.adults + 1) }))}
                  disabled={travelers.adults >= 10}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enfants</p>
                <p className="text-xs text-muted-foreground">2-12 ans</p>
              </div>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => setTravelers(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                  disabled={travelers.children <= 0}
                >
                  -
                </Button>
                <span className="w-10 text-center">{travelers.children}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => setTravelers(prev => ({ ...prev, children: Math.min(6, prev.children + 1) }))}
                  disabled={travelers.children >= 6}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Bébés</p>
                <p className="text-xs text-muted-foreground">0-2 ans</p>
              </div>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => setTravelers(prev => ({ ...prev, infants: Math.max(0, prev.infants - 1) }))}
                  disabled={travelers.infants <= 0}
                >
                  -
                </Button>
                <span className="w-10 text-center">{travelers.infants}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => setTravelers(prev => ({ ...prev, infants: Math.min(4, prev.infants + 1) }))}
                  disabled={travelers.infants >= 4}
                >
                  +
                </Button>
              </div>
            </div>
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

export default TravelersSelector;
