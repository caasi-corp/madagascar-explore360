
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, RefreshCw } from 'lucide-react';

interface PhotosFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

const PhotosFilter: React.FC<PhotosFilterProps> = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  onReset
}) => {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative w-full md:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Select value={categoryFilter} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[140px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes</SelectItem>
          <SelectItem value="hero">Héro</SelectItem>
          <SelectItem value="catamaran">Catamarans</SelectItem>
          <SelectItem value="destination">Destinations</SelectItem>
          <SelectItem value="cruise">Croisières</SelectItem>
          <SelectItem value="experience">Expériences</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="active">Actives</SelectItem>
          <SelectItem value="inactive">Inactives</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="outline" size="icon" onClick={onReset} title="Réinitialiser les filtres">
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PhotosFilter;
