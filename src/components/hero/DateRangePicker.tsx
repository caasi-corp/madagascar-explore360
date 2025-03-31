
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { useBreakpoint } from '@/hooks/use-mobile';

interface DateRangePickerProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, setDateRange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  // Format date range for display
  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'd MMM', { locale: fr })} - ${format(dateRange.to, 'd MMM yyyy', { locale: fr })}`;
    }
    
    if (dateRange.from) {
      return `${format(dateRange.from, 'd MMM yyyy', { locale: fr })}`;
    }
    
    return 'Sélectionner des dates';
  };

  const clearDates = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDateRange({ from: undefined, to: undefined });
  };

  const hasSelectedDates = dateRange.from || dateRange.to;

  return (
    <div className="relative">
      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Button
              variant="glass"
              className="w-full pl-10 pr-8 h-10 justify-between font-normal text-white hover:text-white focus:text-white active:text-white bg-black/30 dark:bg-black/40 border-white/20"
            >
              <span className="truncate">{formatDateRange()}</span>
              <ChevronDown className="h-4 w-4 opacity-50 absolute right-3" />
              
              {hasSelectedDates && (
                <button 
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                  onClick={clearDates}
                  aria-label="Effacer les dates"
                >
                  <X size={16} />
                </button>
              )}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 glass-popover border-white/20 bg-black/80 backdrop-blur-md" 
          align="start"
          sideOffset={5}
        >
          <div className="p-3">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={isMobile ? 1 : 2}
              disabled={(date) => date < new Date()}
              className="pointer-events-auto text-white"
              locale={fr}
              classNames={{
                day_today: "bg-northgascar-teal/20 text-white",
                day_selected: "bg-northgascar-teal !text-white hover:bg-northgascar-teal/80",
                day_outside: "text-white/40 opacity-50",
                day: "text-white hover:bg-white/10 hover:text-white",
                caption: "text-white",
                caption_label: "text-white",
                nav_button: "text-white hover:bg-white/10",
                table: "text-white",
                head_cell: "text-white/70"
              }}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setDateRange({ from: undefined, to: undefined });
                }}
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Effacer
              </Button>
              <Button 
                size="sm"
                onClick={() => setIsCalendarOpen(false)}
                className="bg-northgascar-teal hover:bg-northgascar-teal/80 text-white hover:text-white"
              >
                Appliquer
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
