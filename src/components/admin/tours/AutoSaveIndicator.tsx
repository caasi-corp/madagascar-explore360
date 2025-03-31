
import React from 'react';
import { Clock } from 'lucide-react';

interface AutoSaveIndicatorProps {
  lastSavedAt: Date | null;
}

const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({ lastSavedAt }) => {
  if (!lastSavedAt) return null;

  // Format the last saved time
  const formatLastSaved = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <div className="text-sm text-gray-500 flex items-center">
      <Clock className="h-4 w-4 mr-1" />
      Auto-saved at {formatLastSaved(lastSavedAt)}
    </div>
  );
};

export default AutoSaveIndicator;
