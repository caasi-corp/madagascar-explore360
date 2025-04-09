
import React from 'react';
import { Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CalendarExportMenuProps {
  onExportCSV: () => void;
  onPrintCalendar: () => void;
}

export const CalendarExportMenu: React.FC<CalendarExportMenuProps> = ({
  onExportCSV,
  onPrintCalendar
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onExportCSV}>
          Exporter en CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPrintCalendar}>
          Imprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
