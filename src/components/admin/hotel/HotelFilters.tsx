
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

interface HotelFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const HotelFilters: React.FC<HotelFiltersProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input 
          placeholder="Rechercher un hôtel..." 
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
          <DropdownMenuItem>Tous les hôtels</DropdownMenuItem>
          <DropdownMenuItem>Hôtels disponibles</DropdownMenuItem>
          <DropdownMenuItem>Hôtels non disponibles</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Mis en avant</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>5 étoiles</DropdownMenuItem>
          <DropdownMenuItem>4 étoiles</DropdownMenuItem>
          <DropdownMenuItem>3 étoiles</DropdownMenuItem>
          <DropdownMenuItem>2 étoiles</DropdownMenuItem>
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
          <DropdownMenuItem>Nom (A-Z)</DropdownMenuItem>
          <DropdownMenuItem>Nom (Z-A)</DropdownMenuItem>
          <DropdownMenuItem>Prix (croissant)</DropdownMenuItem>
          <DropdownMenuItem>Prix (décroissant)</DropdownMenuItem>
          <DropdownMenuItem>Étoiles (croissant)</DropdownMenuItem>
          <DropdownMenuItem>Étoiles (décroissant)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HotelFilters;
