
import React from 'react';
import { Search, Filter, ArrowDownAZ } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface TourFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TourFilterBar: React.FC<TourFilterBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input 
          placeholder="Rechercher un circuit..." 
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          <DropdownMenuItem>Tous les circuits</DropdownMenuItem>
          <DropdownMenuItem>Circuits actifs</DropdownMenuItem>
          <DropdownMenuItem>Circuits inactifs</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Mis en avant</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Nature</DropdownMenuItem>
          <DropdownMenuItem>Aventure</DropdownMenuItem>
          <DropdownMenuItem>Plage</DropdownMenuItem>
          <DropdownMenuItem>Culture</DropdownMenuItem>
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
          <DropdownMenuItem>Durée (courte à longue)</DropdownMenuItem>
          <DropdownMenuItem>Durée (longue à courte)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TourFilterBar;
