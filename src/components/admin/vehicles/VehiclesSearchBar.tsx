
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface VehiclesSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const VehiclesSearchBar: React.FC<VehiclesSearchBarProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par nom ou type..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" className="flex items-center">
        <Filter className="mr-2 h-4 w-4" /> Filtres
      </Button>
    </div>
  );
};

export default VehiclesSearchBar;
