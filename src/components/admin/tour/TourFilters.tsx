
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

interface TourFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TourFilters: React.FC<TourFiltersProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <FiltersBase
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      placeholder="Rechercher un circuit..."
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="font-sans">
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="font-sans">Tous les circuits</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Circuits actifs</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Circuits inactifs</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-sans">Mis en avant</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-sans">Nature</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Aventure</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Plage</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Culture</DropdownMenuItem>
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
          <DropdownMenuItem className="font-sans">Nom (A-Z)</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Nom (Z-A)</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Prix (croissant)</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Prix (décroissant)</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Durée (courte à longue)</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Durée (longue à courte)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </FiltersBase>
  );
};

export default TourFilters;
