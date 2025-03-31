
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
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

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
      <Popover>
        <PopoverTrigger asChild>
          <div className="cursor-pointer">
            <Input 
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Où aller?" 
              className="pl-10 pr-4"
              variant="glass"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 max-h-[300px] overflow-auto glass-popover" align="start">
          <div className="py-2">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((dest, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 hover:bg-accent/20 cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    setDestination(dest.name);
                    setFilteredDestinations(destinations);
                  }}
                >
                  <span>{dest.name}</span>
                  <span className="text-xs text-muted-foreground">{dest.type}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-muted-foreground">Aucune destination trouvée</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DestinationSelector;
