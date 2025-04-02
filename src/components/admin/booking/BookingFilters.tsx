
import React from 'react';
import { Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FiltersBase from '@/components/admin/FiltersBase';
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
    <FiltersBase
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      placeholder="Rechercher une réservation..."
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="font-sans">
            <Calendar className="mr-2 h-4 w-4" />
            Date
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="font-sans">Aujourd'hui</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Cette semaine</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Ce mois</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Mois dernier</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Personnalisé...</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="font-sans">
            <Filter className="mr-2 h-4 w-4" />
            Statut
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="font-sans">Tous</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-sans">Confirmé</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">En attente</DropdownMenuItem>
          <DropdownMenuItem className="font-sans">Annulé</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </FiltersBase>
  );
};

export default BookingFilters;
