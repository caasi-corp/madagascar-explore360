
import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Info } from "lucide-react";
import { DayPicker, DayPickerRangeProps, SelectRangeEventHandler } from "react-day-picker";
import { fr } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  showYearNavigation?: boolean;
  showToday?: boolean;
  highlightToday?: boolean;
  showWeekNumber?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  tooltips?: { [key: string]: string };
  disabledDates?: Date[];
  bookedDates?: Date[];
  fullDates?: Date[];
  availableDates?: Date[];
  onRangeChange?: SelectRangeEventHandler;
  allowDisabledDaysInRange?: boolean;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  showYearNavigation = false,
  showToday = true,
  highlightToday = true,
  showWeekNumber = false,
  weekStartsOn = 1, // Lundi par défaut
  tooltips = {},
  disabledDates = [],
  bookedDates = [],
  fullDates = [],
  availableDates = [],
  allowDisabledDaysInRange = false,
  ...props
}: CalendarProps) {
  const today = new Date();
  const dayRefs = React.useRef<{ [key: string]: HTMLElement }>({});

  // Convertit une date en chaîne pour les tooltips
  const formatDateKey = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // Style personnalisé pour les jours selon leur état
  const getDayStyle = (date: Date) => {
    const dateStr = formatDateKey(date);
    
    if (disabledDates.some(d => formatDateKey(d) === dateStr)) {
      return "disabled-day";
    }
    if (fullDates.some(d => formatDateKey(d) === dateStr)) {
      return "full-day";
    }
    if (bookedDates.some(d => formatDateKey(d) === dateStr)) {
      return "booked-day";
    }
    if (availableDates.some(d => formatDateKey(d) === dateStr)) {
      return "available-day";
    }
    return "";
  };

  // Configuration des jours de la semaine en français
  const weekdaysLabels = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const reorderedWeekdays = [...weekdaysLabels.slice(weekStartsOn), ...weekdaysLabels.slice(0, weekStartsOn)];

  // Configuration des modificateurs pour styliser les jours
  const modifiers = {
    disabled: disabledDates,
    booked: bookedDates,
    full: fullDates,
    available: availableDates,
    today: today,
  };

  const modifiersClassNames = {
    disabled: "text-muted-foreground opacity-50 line-through cursor-not-allowed",
    booked: "bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400",
    full: "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400",
    available: "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400",
    today: highlightToday ? "border border-primary font-bold" : "",
  };

  // Rendu personnalisé pour afficher les tooltips
  const renderDay = (day: Date, modifiers: object) => {
    const dateKey = formatDateKey(day);
    const hasTooltip = tooltips[dateKey];
    const dayStyle = getDayStyle(day);

    if (!hasTooltip) {
      return (
        <div className={cn(dayStyle)} ref={(el) => el && (dayRefs.current[dateKey] = el)}>
          {day.getDate()}
        </div>
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className={cn("relative", dayStyle)} 
              ref={(el) => el && (dayRefs.current[dateKey] = el)}
            >
              {day.getDate()}
              <Info className="absolute -top-1 -right-1 h-3 w-3 text-blue-500" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="max-w-xs text-xs">{tooltips[dateKey]}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: cn(
          "text-sm font-medium", 
          { "mx-8": showYearNavigation }
        ),
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: cn(
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]", 
          { "w-10": showWeekNumber }
        ),
        row: "flex w-full mt-2",
        cell: cn(
          "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          { "w-10": showWeekNumber }
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: highlightToday ? "border border-primary font-bold" : "",
        day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50 line-through",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        ...(showYearNavigation ? {
          IconPrevious: ({ ..._props }) => <ChevronsLeft className="h-4 w-4" />,
          IconNext: ({ ..._props }) => <ChevronsRight className="h-4 w-4" />,
        } : {}),
        Day: ({ date, ...dayProps }) => renderDay(date, dayProps),
      }}
      weekStartsOn={weekStartsOn}
      locale={fr}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
