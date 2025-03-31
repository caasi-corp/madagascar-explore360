
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface DateRangeSelectorProps {
  dateRange: 'day' | 'week' | 'month' | 'year';
  setDateRange: (range: 'day' | 'week' | 'month' | 'year') => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ dateRange, setDateRange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Badge 
        variant={dateRange === 'day' ? 'default' : 'outline'} 
        className="cursor-pointer hover:bg-muted/50" 
        onClick={() => setDateRange('day')}
      >
        Jour
      </Badge>
      <Badge 
        variant={dateRange === 'week' ? 'default' : 'outline'} 
        className="cursor-pointer hover:bg-muted/50" 
        onClick={() => setDateRange('week')}
      >
        Semaine
      </Badge>
      <Badge 
        variant={dateRange === 'month' ? 'default' : 'outline'} 
        className="cursor-pointer hover:bg-muted/50" 
        onClick={() => setDateRange('month')}
      >
        Mois
      </Badge>
      <Badge 
        variant={dateRange === 'year' ? 'default' : 'outline'} 
        className="cursor-pointer hover:bg-muted/50" 
        onClick={() => setDateRange('year')}
      >
        Année
      </Badge>
    </div>
  );
};

export default DateRangeSelector;
