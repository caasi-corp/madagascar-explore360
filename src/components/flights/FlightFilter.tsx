
import React, { useState } from 'react';
import { Search, Calendar, Plane, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface FlightFilterProps {
  destinations: string[];
  airlines: string[];
  onFilterChange: (filters: FlightFilterOptions) => void;
}

export interface FlightFilterOptions {
  departure?: string;
  arrival?: string;
  departureDate?: string;
  airline?: string;
  minPrice?: number;
  maxPrice?: number;
}

const FlightFilter: React.FC<FlightFilterProps> = ({ 
  destinations, 
  airlines, 
  onFilterChange 
}) => {
  const [filters, setFilters] = useState<FlightFilterOptions>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleDepartureChange = (departure: string) => {
    setFilters(prev => ({ ...prev, departure: departure || undefined }));
    updateActiveFilters('departure', departure);
  };

  const handleArrivalChange = (arrival: string) => {
    setFilters(prev => ({ ...prev, arrival: arrival || undefined }));
    updateActiveFilters('arrival', arrival);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setFilters(prev => ({ ...prev, departureDate: date || undefined }));
    updateActiveFilters('date', date);
  };

  const handleAirlineChange = (airline: string) => {
    setFilters(prev => ({ ...prev, airline: airline || undefined }));
    updateActiveFilters('airline', airline);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    setFilters(prev => ({ 
      ...prev, 
      minPrice: values[0] > 0 ? values[0] : undefined, 
      maxPrice: values[1] < 1000 ? values[1] : undefined 
    }));
    updateActiveFilters('price', `${values[0]}€ - ${values[1]}€`);
  };

  const updateActiveFilters = (type: string, value: string | undefined) => {
    if (!value) {
      setActiveFilters(prev => prev.filter(f => !f.startsWith(type)));
      return;
    }

    const filterText = type === 'departure' ? `De: ${value}` :
                       type === 'arrival' ? `À: ${value}` :
                       type === 'date' ? `Date: ${value}` :
                       type === 'airline' ? `Compagnie: ${value}` :
                       type === 'price' ? `Prix: ${value}` : '';

    setActiveFilters(prev => {
      const newFilters = prev.filter(f => !f.startsWith(type));
      return [...newFilters, filterText];
    });
  };

  const removeFilter = (filter: string) => {
    if (filter.startsWith('De:')) {
      setFilters(prev => ({ ...prev, departure: undefined }));
    } else if (filter.startsWith('À:')) {
      setFilters(prev => ({ ...prev, arrival: undefined }));
    } else if (filter.startsWith('Date:')) {
      setFilters(prev => ({ ...prev, departureDate: undefined }));
    } else if (filter.startsWith('Compagnie:')) {
      setFilters(prev => ({ ...prev, airline: undefined }));
    } else if (filter.startsWith('Prix:')) {
      setPriceRange([0, 1000]);
      setFilters(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }));
    }
    
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    setFilters({});
    setPriceRange([0, 1000]);
    setActiveFilters([]);
    onFilterChange({});
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departure">Départ</Label>
              <Select 
                value={filters.departure} 
                onValueChange={handleDepartureChange}
              >
                <SelectTrigger id="departure">
                  <SelectValue placeholder="Toutes les villes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les villes</SelectItem>
                  {destinations.map(city => (
                    <SelectItem key={`dep-${city}`} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrival">Arrivée</Label>
              <Select 
                value={filters.arrival} 
                onValueChange={handleArrivalChange}
              >
                <SelectTrigger id="arrival">
                  <SelectValue placeholder="Toutes les villes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les villes</SelectItem>
                  {destinations.map(city => (
                    <SelectItem key={`arr-${city}`} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date de départ</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  className="pl-9"
                  value={filters.departureDate || ''}
                  onChange={handleDateChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="airline">Compagnie aérienne</Label>
              <Select 
                value={filters.airline} 
                onValueChange={handleAirlineChange}
              >
                <SelectTrigger id="airline">
                  <SelectValue placeholder="Toutes les compagnies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les compagnies</SelectItem>
                  {airlines.map(airline => (
                    <SelectItem key={airline} value={airline}>{airline}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Prix (€)</Label>
              <span className="text-sm text-muted-foreground">
                {priceRange[0]}€ - {priceRange[1]}€
              </span>
            </div>
            <Slider
              value={priceRange}
              min={0}
              max={1000}
              step={50}
              onValueChange={handlePriceChange}
              className="py-2"
            />
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={resetFilters} disabled={activeFilters.length === 0}>
              Réinitialiser
            </Button>
            <Button onClick={applyFilters} className="bg-madagascar-green hover:bg-madagascar-green/80">
              Rechercher
            </Button>
          </div>
        </CardContent>
      </Card>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightFilter;
