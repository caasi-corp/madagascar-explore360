
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

const destinations = [
  { name: 'Nosy Be', type: 'plages' },
  { name: 'Antananarivo', type: 'ville' },
  { name: 'Parc National d\'Andasibe', type: 'nature' },
  { name: 'Allée des Baobabs', type: 'attraction' },
  { name: 'Île Sainte-Marie', type: 'plages' },
  { name: 'Parc National de l\'Isalo', type: 'nature' },
  { name: 'Morondava', type: 'ville' },
  { name: 'Diego Suarez', type: 'ville' },
];

const HeroSearch = () => {
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [travelers, setTravelers] = useState({
    adults: 2,
    children: 0,
    infants: 0,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTravelersOpen, setIsTravelersOpen] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);

  // Handle destination search filter
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);
    
    if (value.trim() === '') {
      setFilteredDestinations(destinations);
    } else {
      setFilteredDestinations(
        destinations.filter(destination => 
          destination.name.toLowerCase().includes(value.toLowerCase()) ||
          destination.type.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  // Format date range for display
  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'd MMM', { locale: fr })} - ${format(dateRange.to, 'd MMM yyyy', { locale: fr })}`;
    }
    
    if (dateRange.from) {
      return `${format(dateRange.from, 'd MMM yyyy', { locale: fr })}`;
    }
    
    return 'Sélectionner des dates';
  };

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

  // Handle search button click
  const handleSearch = () => {
    console.log('Recherche avec:', {
      destination,
      dateRange,
      travelers
    });
    // Implement search functionality or navigation
  };

  return (
    <div className="glass-card p-4 md:p-6 rounded-lg shadow-lg max-w-4xl mx-auto md:mx-0 animation-delay-600 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Destination Field */}
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

        {/* Date Range Picker */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="glass"
                className="w-full pl-10 justify-between font-normal"
              >
                {formatDateRange()}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass-popover" align="start">
              <div className="p-3">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                  className="pointer-events-auto"
                  locale={fr}
                />
                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setDateRange({ from: undefined, to: undefined });
                    }}
                  >
                    Effacer
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setIsCalendarOpen(false)}
                  >
                    Appliquer
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Travelers Selector */}
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

        {/* Search Button */}
        <Button 
          className="bg-northgascar-teal hover:bg-northgascar-teal/80 text-white h-10 lg:h-full"
          onClick={handleSearch}
        >
          <Search className="mr-2" size={18} />
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default HeroSearch;
