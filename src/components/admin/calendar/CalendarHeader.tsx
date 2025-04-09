
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, Calendar, CalendarDays, CalendarClock, ListTodo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { NewBookingDialog } from './NewBookingDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  showNewBookingDialog: boolean;
  setShowNewBookingDialog: (show: boolean) => void;
  viewMode: 'month' | 'week' | 'day' | 'list';
  setViewMode: (mode: 'month' | 'week' | 'day' | 'list') => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  showNewBookingDialog,
  setShowNewBookingDialog,
  viewMode,
  setViewMode
}) => {
  const handleViewChange = (mode: 'month' | 'week' | 'day' | 'list') => {
    setViewMode(mode);
  };

  const getViewIcon = () => {
    switch (viewMode) {
      case 'month':
        return <CalendarDays className="h-4 w-4 mr-2" />;
      case 'week':
        return <Calendar className="h-4 w-4 mr-2" />;
      case 'day':
        return <CalendarClock className="h-4 w-4 mr-2" />;
      case 'list':
        return <ListTodo className="h-4 w-4 mr-2" />;
      default:
        return <CalendarDays className="h-4 w-4 mr-2" />;
    }
  };

  const getViewTitle = () => {
    switch (viewMode) {
      case 'month':
        return 'Vue mensuelle';
      case 'week':
        return 'Vue hebdomadaire';
      case 'day':
        return 'Vue journalière';
      case 'list':
        return 'Vue liste';
      default:
        return 'Vue mensuelle';
    }
  };

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
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden md:flex">
              {getViewIcon()}
              {getViewTitle()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewChange('month')}>
              <CalendarDays className="h-4 w-4 mr-2" />
              Vue mensuelle
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleViewChange('week')}>
              <Calendar className="h-4 w-4 mr-2" />
              Vue hebdomadaire
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleViewChange('day')}>
              <CalendarClock className="h-4 w-4 mr-2" />
              Vue journalière
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleViewChange('list')}>
              <ListTodo className="h-4 w-4 mr-2" />
              Vue liste
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          size="sm" 
          variant="default"
          onClick={() => setShowNewBookingDialog(true)}
          className="bg-northgascar-teal hover:bg-northgascar-teal/80"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle réservation
        </Button>
      </div>
      
      <NewBookingDialog 
        open={showNewBookingDialog} 
        onOpenChange={setShowNewBookingDialog} 
      />
    </div>
  );
};
