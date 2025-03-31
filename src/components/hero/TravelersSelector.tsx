
import React, { useState } from 'react';
import { Users, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import TravelerTypeSelector from './travelers/TravelerTypeSelector';
import { useTravelerFormatter } from './travelers/useTravelerFormatter';
import { updateAdults, updateChildren, updateInfants } from './travelers/travelerUpdaters';
import { TravelerCount, TravelersSelectorProps } from './travelers/types';

const TravelersSelector: React.FC<TravelersSelectorProps> = ({ travelers, setTravelers }) => {
  const [isTravelersOpen, setIsTravelersOpen] = useState(false);
  const { formatTravelers } = useTravelerFormatter();

  // Helper functions to update traveler counts
  const decreaseAdults = () => {
    setTravelers(updateAdults(travelers, false));
  };

  const increaseAdults = () => {
    setTravelers(updateAdults(travelers, true));
  };

  const decreaseChildren = () => {
    setTravelers(updateChildren(travelers, false));
  };

  const increaseChildren = () => {
    setTravelers(updateChildren(travelers, true));
  };

  const decreaseInfants = () => {
    setTravelers(updateInfants(travelers, false));
  };

  const increaseInfants = () => {
    setTravelers(updateInfants(travelers, true));
  };
  
  const resetTravelers = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTravelers({
      adults: 1,
      children: 0,
      infants: 0,
    });
  };

  const hasNonDefaultTravelers = travelers.adults > 1 || travelers.children > 0 || travelers.infants > 0;

  return (
    <div className="relative">
      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
      <Popover open={isTravelersOpen} onOpenChange={setIsTravelersOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Button 
              variant="glass"
              className="w-full pl-10 pr-8 h-10 justify-between font-normal text-foreground focus:text-foreground active:text-foreground bg-black/30 dark:bg-black/40 border-white/20"
            >
              <span className="truncate">{formatTravelers(travelers)}</span>
              <ChevronDown className="h-4 w-4 opacity-50 absolute right-3" />
              
              {hasNonDefaultTravelers && (
                <button 
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                  onClick={resetTravelers}
                  aria-label="Réinitialiser les voyageurs"
                >
                  <X size={16} />
                </button>
              )}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 glass-popover border-white/20 bg-black/80 backdrop-blur-md" align="start">
          <div className="space-y-4">
            <TravelerTypeSelector
              type="adults"
              label="Adultes"
              ageInfo="13+ ans"
              count={travelers.adults}
              onDecrease={decreaseAdults}
              onIncrease={increaseAdults}
              minCount={1}
              maxCount={10}
            />
            <TravelerTypeSelector
              type="children"
              label="Enfants"
              ageInfo="2-12 ans"
              count={travelers.children}
              onDecrease={decreaseChildren}
              onIncrease={increaseChildren}
              minCount={0}
              maxCount={6}
            />
            <TravelerTypeSelector
              type="infants"
              label="Bébés"
              ageInfo="0-2 ans"
              count={travelers.infants}
              onDecrease={decreaseInfants}
              onIncrease={increaseInfants}
              minCount={0}
              maxCount={4}
            />
            <Button 
              className="w-full bg-northgascar-teal hover:bg-northgascar-teal/80 text-white"
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
