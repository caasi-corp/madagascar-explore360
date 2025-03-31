
import React, { useState } from 'react';
import { Users, ChevronDown } from 'lucide-react';
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

  return (
    <div className="relative">
      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
      <Popover open={isTravelersOpen} onOpenChange={setIsTravelersOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="glass"
            className="w-full pl-10 justify-between font-normal"
          >
            {formatTravelers(travelers)}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 glass-popover" align="start">
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
