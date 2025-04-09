
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BookingFiltersProps {
  filters: {
    status: string;
    tour: string;
    minParticipants: number;
    maxParticipants: number;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    status: string;
    tour: string;
    minParticipants: number;
    maxParticipants: number;
  }>>;
  tours: string[];
  statuses: string[];
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({
  filters,
  setFilters,
  tours,
  statuses
}) => {
  const resetFilters = () => {
    setFilters({
      status: 'all',
      tour: 'all',
      minParticipants: 0,
      maxParticipants: 20,
    });
  };

  const handleParticipantsChange = (values: number[]) => {
    setFilters(prev => ({
      ...prev,
      minParticipants: values[0],
      maxParticipants: values[1],
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <Label htmlFor="tour-filter">Circuit</Label>
        <Select
          value={filters.tour}
          onValueChange={(value) => setFilters(prev => ({ ...prev, tour: value }))}
        >
          <SelectTrigger id="tour-filter">
            <SelectValue placeholder="Tous les circuits" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les circuits</SelectItem>
            {tours.map((tour, index) => (
              <SelectItem key={index} value={tour}>{tour}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status-filter">Statut</Label>
        <Select
          value={filters.status}
          onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
        >
          <SelectTrigger id="status-filter">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {statuses.map((status, index) => (
              <SelectItem key={index} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 md:col-span-2">
        <div className="flex justify-between">
          <Label>Nombre de participants</Label>
          <span className="text-sm text-muted-foreground">
            {filters.minParticipants} - {filters.maxParticipants}
          </span>
        </div>
        <Slider
          defaultValue={[filters.minParticipants, filters.maxParticipants]}
          min={0}
          max={20}
          step={1}
          value={[filters.minParticipants, filters.maxParticipants]}
          onValueChange={handleParticipantsChange}
          className="py-4"
        />
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Réinitialiser les filtres
          </Button>
        </div>
      </div>
    </div>
  );
};
