import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Booking } from '@/types/booking';

interface CalendarDayContentProps {
  day: Date;
  bookings: Booking[];
}

export const CalendarDayContent: React.FC<CalendarDayContentProps> = ({ day, bookings }) => {
  return (
    <div className="relative w-full h-full">
      <div>{day.getDate()}</div>
      {bookings.length > 0 && (
        <Badge 
          className="absolute bottom-0 right-0 text-[10px] min-w-4 h-4 flex items-center justify-center" 
          variant="default"
        >
          {bookings.length}
        </Badge>
      )}
    </div>
  );
};
