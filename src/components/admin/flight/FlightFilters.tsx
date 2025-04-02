
import React from 'react';
import { 
  Search, 
  Filter, 
  ArrowDownAZ 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface FlightFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const FlightFilters: React.FC<FlightFiltersProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input 
          placeholder="Rechercher un vol..." 
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Tous les vols</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Planifiés</DropdownMenuItem>
          <DropdownMenuItem>Retardés</DropdownMenuItem>
          <DropdownMenuItem>Annulés</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Air Madagascar</DropdownMenuItem>
          <DropdownMenuItem>Air France</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <ArrowDownAZ className="mr-2 h-4 w-4" />
            Trier
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Date (plus récente)</DropdownMenuItem>
          <DropdownMenuItem>Date (plus ancienne)</DropdownMenuItem>
          <DropdownMenuItem>Prix (croissant)</DropdownMenuItem>
          <DropdownMenuItem>Prix (décroissant)</DropdownMenuItem>
          <DropdownMenuItem>Compagnie (A-Z)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FlightFilters;
