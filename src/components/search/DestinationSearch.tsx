import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Destination {
  name: string;
  type: string;
}

interface DestinationSearchProps {
  destination: string;
  onDestinationChange: (destination: string) => void;
}

const destinations: Destination[] = [
  { name: 'Nosy Be', type: 'plages' },
  { name: 'Antananarivo', type: 'ville' },
  { name: 'Parc National d\'Andasibe', type: 'nature' },
  { name: 'Allée des Baobabs', type: 'attraction' },
  { name: 'Île Sainte-Marie', type: 'plages' },
  { name: 'Parc National de l\'Isalo', type: 'nature' },
  { name: 'Morondava', type: 'ville' },
  { name: 'Diego Suarez', type: 'ville' },
];

const DestinationSearch: React.FC<DestinationSearchProps> = ({ 
  destination, 
  onDestinationChange 
}) => {
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle destination search filter
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onDestinationChange(value);
    
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
    
    setIsOpen(true);
  };

  // Add a click handler for the input to keep the popover open
  const handleInputClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative w-full">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="cursor-pointer w-full">
            <Input 
              ref={inputRef}
              value={destination}
              onChange={handleDestinationChange}
              onClick={handleInputClick}
              placeholder="Où aller?" 
              className="pl-10 pr-4 h-11 text-sm"
              variant="glass"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100%-24px)] p-0 max-h-[300px] overflow-auto z-50 bg-white/90 backdrop-blur-sm" align="center">
          <div className="py-2">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((dest, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 hover:bg-accent/20 cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    onDestinationChange(dest.name);
                    setIsOpen(false);
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

export default DestinationSearch;
