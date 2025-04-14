
import React, { useState } from 'react';
import { Search, Star, MapPin, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface HotelFilterProps {
  locations: string[];
  onFilterChange: (filters: HotelFilterOptions) => void;
}

export interface HotelFilterOptions {
  term?: string;
  location?: string;
  stars?: number;
  minPrice?: number;
  maxPrice?: number;
}

const HotelFilter: React.FC<HotelFilterProps> = ({ 
  locations, 
  onFilterChange 
}) => {
  const [filters, setFilters] = useState<HotelFilterOptions>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setFilters(prev => ({ ...prev, term: term || undefined }));
    updateActiveFilters('term', term);
  };

  const handleLocationChange = (location: string) => {
    setFilters(prev => ({ ...prev, location: location || undefined }));
    updateActiveFilters('location', location);
  };

  const handleStarsChange = (stars: string) => {
    const starsValue = parseInt(stars);
    setFilters(prev => ({ ...prev, stars: starsValue || undefined }));
    updateActiveFilters('stars', stars);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    setFilters(prev => ({ 
      ...prev, 
      minPrice: values[0] > 0 ? values[0] : undefined, 
      maxPrice: values[1] < 500 ? values[1] : undefined 
    }));
    updateActiveFilters('price', `${values[0]}€ - ${values[1]}€`);
  };

  const updateActiveFilters = (type: string, value: string | undefined) => {
    if (!value) {
      setActiveFilters(prev => prev.filter(f => !f.startsWith(type)));
      return;
    }

    const filterText = type === 'term' ? `Recherche: ${value}` :
                       type === 'location' ? `Lieu: ${value}` :
                       type === 'stars' ? `${value} étoiles` :
                       type === 'price' ? `Prix: ${value}` : '';

    setActiveFilters(prev => {
      const newFilters = prev.filter(f => !f.startsWith(type));
      return [...newFilters, filterText];
    });
  };

  const removeFilter = (filter: string) => {
    if (filter.startsWith('Recherche:')) {
      setFilters(prev => ({ ...prev, term: undefined }));
    } else if (filter.startsWith('Lieu:')) {
      setFilters(prev => ({ ...prev, location: undefined }));
    } else if (filter.includes('étoiles')) {
      setFilters(prev => ({ ...prev, stars: undefined }));
    } else if (filter.startsWith('Prix:')) {
      setPriceRange([0, 500]);
      setFilters(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }));
    }
    
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    setFilters({});
    setPriceRange([0, 500]);
    setActiveFilters([]);
    onFilterChange({});
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un hôtel..."
              className="pl-9"
              value={filters.term || ''}
              onChange={handleTermChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Destination</Label>
              <Select 
                value={filters.location} 
                onValueChange={handleLocationChange}
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Toutes les destinations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les destinations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stars">Nombre d'étoiles</Label>
              <Select 
                value={filters.stars?.toString()} 
                onValueChange={handleStarsChange}
              >
                <SelectTrigger id="stars">
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les catégories</SelectItem>
                  <SelectItem value="1">1 étoile</SelectItem>
                  <SelectItem value="2">2 étoiles</SelectItem>
                  <SelectItem value="3">3 étoiles</SelectItem>
                  <SelectItem value="4">4 étoiles</SelectItem>
                  <SelectItem value="5">5 étoiles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Prix par nuit</Label>
                <span className="text-sm text-muted-foreground">
                  {priceRange[0]}€ - {priceRange[1]}€
                </span>
              </div>
              <Slider
                value={priceRange}
                min={0}
                max={500}
                step={10}
                onValueChange={handlePriceChange}
                className="py-2"
              />
            </div>
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

export default HotelFilter;
