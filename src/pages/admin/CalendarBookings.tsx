
import React from 'react';
import { CalendarController } from '@/components/admin/calendar/CalendarController';

const CalendarBookings = () => {
  return (
    <div className="space-y-6 print:m-4">
      <CalendarController />
    </div>
  );
};

export default CalendarBookings;
