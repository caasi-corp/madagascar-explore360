
import React from 'react';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateRange } from 'react-day-picker';

interface CalendarDateRangeSelectorProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export const CalendarDateRangeSelector: React.FC<CalendarDateRangeSelectorProps> = ({
  dateRange,
  onDateRangeChange
}) => {
  return (
    <div className="flex gap-2">
      <Select 
        value={format(dateRange.from || new Date(), 'yyyy-MM-dd')} 
        onValueChange={(value) => onDateRangeChange({ ...dateRange, from: new Date(value) })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Date de début" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(30)].map((_, i) => {
            const date = addDays(new Date(), i - 15);
            return (
              <SelectItem key={i} value={format(date, 'yyyy-MM-dd')}>
                {format(date, 'dd MMM yyyy', { locale: fr })}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Select 
        value={format(dateRange.to || addDays(new Date(), 7), 'yyyy-MM-dd')}
        onValueChange={(value) => onDateRangeChange({ ...dateRange, to: new Date(value) })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Date de fin" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(30)].map((_, i) => {
            const date = addDays(new Date(), i - 8);
            return (
              <SelectItem key={i} value={format(date, 'yyyy-MM-dd')}>
                {format(date, 'dd MMM yyyy', { locale: fr })}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
