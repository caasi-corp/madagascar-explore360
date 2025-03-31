
import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type Destination = {
  name: string;
  type: string;
};

interface DestinationSelectorProps {
  destination: string;
  setDestination: (destination: string) => void;
  destinations: Destination[];
}

const DestinationSelector: React.FC<DestinationSelectorProps> = ({
  destination,
  setDestination,
  destinations,
}) => {
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [isOpen, setIsOpen] = useState(false);

  // Handle destination search filter
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);
    
    if (value.trim() === '') {
      setFilteredDestinations(destinations);
    } else {
      setFilteredDestinations(
        destinations.filter(dest => 
          dest.name.toLowerCase().includes(value.toLowerCase()) ||
          dest.type.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const clearDestination = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDestination('');
    setFilteredDestinations(destinations);
  };

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="cursor-pointer relative">
            <Input 
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Où aller?" 
              className="pl-10 pr-8 text-foreground focus:text-foreground active:text-foreground bg-black/30 dark:bg-black/40 border-white/20"
              onClick={() => setIsOpen(true)}
              variant="glass"
            />
            {destination && (
              <button 
                type="button" 
                onClick={clearDestination}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                aria-label="Effacer la destination"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 max-h-[300px] overflow-auto glass-popover border-white/20 bg-black/80 backdrop-blur-md" align="start">
          <div className="py-2">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((dest, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    setDestination(dest.name);
                    setFilteredDestinations(destinations);
                    setIsOpen(false);
                  }}
                >
                  <span className="text-white">{dest.name}</span>
                  <span className="text-xs text-white/70">{dest.type}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-white/70">Aucune destination trouvée</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DestinationSelector;
