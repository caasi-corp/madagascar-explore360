
import React from 'react';
import { RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarExportMenu } from './CalendarExportMenu';

interface CalendarToolbarProps {
  isSyncing: boolean;
  isConfigured: boolean;
  onSync: () => void;
  onOpenConfig: () => void;
  onExportCSV: () => void;
  onPrintCalendar: () => void;
}

export const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  isSyncing,
  isConfigured,
  onSync,
  onOpenConfig,
  onExportCSV,
  onPrintCalendar
}) => {
  return (
    <div className="flex gap-2">
      <CalendarExportMenu 
        onExportCSV={onExportCSV} 
        onPrintCalendar={onPrintCalendar} 
      />

      <Button 
        variant="outline"
        size="sm" 
        onClick={onSync}
        disabled={isSyncing || !isConfigured}
      >
        {isSyncing ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Synchronisation...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            Synchroniser
          </>
        )}
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={onOpenConfig}
      >
        <Settings className="mr-2 h-4 w-4" />
        API
      </Button>
    </div>
  );
};
