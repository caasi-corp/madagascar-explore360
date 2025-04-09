
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { CredentialsTab } from './CredentialsTab';
import { InstructionsTab } from './InstructionsTab';
import { useGoogleApiConfig } from './useGoogleApiConfig';

interface GoogleApiConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GoogleApiConfigDialog: React.FC<GoogleApiConfigDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    apiKey,
    setApiKey,
    clientId,
    setClientId,
    clientSecret,
    setClientSecret,
    isLoading,
    isTesting,
    isConfigured,
    handleSaveConfig,
    handleTestConnection
  } = useGoogleApiConfig();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Configuration de l'API Google</DialogTitle>
          <DialogDescription>
            Configurez les informations de connexion pour l'API Google Tasks afin de synchroniser les réservations.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="credentials" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credentials">Identifiants API</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="credentials">
            <CredentialsTab 
              apiKey={apiKey}
              setApiKey={setApiKey}
              clientId={clientId}
              setClientId={setClientId}
              clientSecret={clientSecret}
              setClientSecret={setClientSecret}
              isConfigured={isConfigured}
            />
          </TabsContent>
          
          <TabsContent value="instructions">
            <InstructionsTab />
          </TabsContent>
        </Tabs>
        
        <Separator className="my-4" />
        
        <DialogFooter className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handleTestConnection}
            disabled={isTesting || !apiKey || !clientId || !clientSecret}
          >
            {isTesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Test en cours...
              </>
            ) : (
              "Tester la connexion"
            )}
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSaveConfig}
              disabled={isLoading || !apiKey || !clientId || !clientSecret}
              className="bg-madagascar-green hover:bg-madagascar-green/80 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                "Enregistrer"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
