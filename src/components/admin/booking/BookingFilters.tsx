
import React from 'react';
import { 
  Search, 
  Calendar, 
  Filter
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

interface BookingFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const BookingFilters: React.FC<BookingFiltersProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input 
          placeholder="Rechercher une réservation..." 
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Aujourd'hui</DropdownMenuItem>
          <DropdownMenuItem>Cette semaine</DropdownMenuItem>
          <DropdownMenuItem>Ce mois</DropdownMenuItem>
          <DropdownMenuItem>Mois dernier</DropdownMenuItem>
          <DropdownMenuItem>Personnalisé...</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Statut
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Tous</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Confirmé</DropdownMenuItem>
          <DropdownMenuItem>En attente</DropdownMenuItem>
          <DropdownMenuItem>Annulé</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BookingFilters;
