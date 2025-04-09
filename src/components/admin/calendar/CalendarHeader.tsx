
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { NewBookingDialog } from './NewBookingDialog';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  showNewBookingDialog: boolean;
  setShowNewBookingDialog: (show: boolean) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  showNewBookingDialog,
  setShowNewBookingDialog
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onPreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <CardTitle className="text-center min-w-40">
          {format(currentMonth, 'MMMM yyyy', { locale: fr })}
        </CardTitle>
        <Button variant="outline" size="icon" onClick={onNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <NewBookingDialog 
        open={showNewBookingDialog} 
        onOpenChange={setShowNewBookingDialog} 
      />
    </div>
  );
};
