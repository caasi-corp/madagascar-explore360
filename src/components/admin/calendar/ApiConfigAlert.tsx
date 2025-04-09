
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ApiConfigAlertProps {
  isConfigured: boolean;
  onOpenConfig: () => void;
}

export const ApiConfigAlert: React.FC<ApiConfigAlertProps> = ({ isConfigured, onOpenConfig }) => {
  if (isConfigured) return null;
  
  return (
    <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
          <AlertCircle className="h-4 w-4" />
          <p>L'API Google n'est pas configurée. Veuillez configurer l'API pour activer la synchronisation.</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto border-amber-200 text-amber-600"
            onClick={onOpenConfig}
          >
            Configurer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
