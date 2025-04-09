
import React from 'react';
import { Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, List } from 'lucide-react';

interface CalendarSearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const CalendarSearchFilters: React.FC<CalendarSearchFiltersProps> = ({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex items-center space-x-2 print:hidden">
      <Input
        placeholder="Rechercher client, tour, ID..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
      <Button 
        variant="outline" 
        size="icon"
        onClick={onToggleFilters}
        className={showFilters ? "bg-accent" : ""}
      >
        <Filter className="h-4 w-4" />
      </Button>
      <Tabs defaultValue="calendar" value={activeTab} onValueChange={onTabChange} className="ml-auto">
        <TabsList>
          <TabsTrigger value="calendar">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendrier
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="mr-2 h-4 w-4" />
            Liste
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
