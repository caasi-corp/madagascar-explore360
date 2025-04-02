
import React from 'react';
import { Filter, ArrowDownAZ } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FiltersBase from '@/components/admin/FiltersBase';
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
    <FiltersBase
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      placeholder="Rechercher un vol..."
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="font-sans">
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="font-sans">Tous les vols</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-sans">Planifiés</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Retardés</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Annulés</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-sans">Air Madagascar</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Air France</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="font-sans">
            <ArrowDownAZ className="mr-2 h-4 w-4" />
            Trier
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="font-sans">Date (plus récente)</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Date (plus ancienne)</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Prix (croissant)</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Prix (décroissant)</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Compagnie (A-Z)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </FiltersBase>
  );
};

export default FlightFilters;
