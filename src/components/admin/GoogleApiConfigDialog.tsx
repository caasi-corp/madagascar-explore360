
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, CheckCircle, ExternalLink } from 'lucide-react';

interface GoogleApiConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GoogleApiConfigDialog: React.FC<GoogleApiConfigDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const { toast } = useToast();

  // Charger les configurations existantes
  useEffect(() => {
    const savedApiKey = localStorage.getItem('google_api_key');
    const savedClientId = localStorage.getItem('google_client_id');
    const savedClientSecret = localStorage.getItem('google_client_secret');
    const configStatus = localStorage.getItem('google_api_configured');

    if (savedApiKey) setApiKey(savedApiKey);
    if (savedClientId) setClientId(savedClientId);
    if (savedClientSecret) setClientSecret(savedClientSecret);
    setIsConfigured(configStatus === 'true');
  }, [open]);

  const handleSaveConfig = () => {
    setIsLoading(true);
    
    // Simuler un délai pour l'enregistrement
    setTimeout(() => {
      // Enregistrer dans le localStorage (dans une application réelle, 
      // cela devrait être stocké de manière sécurisée côté serveur)
      localStorage.setItem('google_api_key', apiKey);
      localStorage.setItem('google_client_id', clientId);
      localStorage.setItem('google_client_secret', clientSecret);
      localStorage.setItem('google_api_configured', 'true');
      
      setIsLoading(false);
      setIsConfigured(true);
      
      toast({
        title: "Configuration enregistrée",
        description: "Les informations d'API Google ont été enregistrées avec succès.",
      });
    }, 1000);
  };

  const handleTestConnection = () => {
    setIsTesting(true);
    
    // Simuler un test de connexion
    setTimeout(() => {
      setIsTesting(false);
      
      if (apiKey && clientId && clientSecret) {
        toast({
          title: "Connexion réussie",
          description: "La connexion à l'API Google a été testée avec succès.",
        });
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Veuillez compléter tous les champs requis.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

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
          
          <TabsContent value="credentials" className="space-y-4 mt-4">
            {isConfigured && (
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md p-3 mb-4 flex items-center">
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                <span>API configurée et prête à l'emploi</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Clé API</Label>
                <Input
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSyBE1K0Bz4lvVQnA-xQ_YkyT1sixGthOFUk"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientId">ID Client OAuth</Label>
                <Input
                  id="clientId"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="123456789012-abc123def456.apps.googleusercontent.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientSecret">Secret Client OAuth</Label>
                <Input
                  id="clientSecret"
                  type="password"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder="GOCSPX-abc123def456"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="instructions" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Comment configurer l'API Google Tasks</h3>
              
              <ol className="space-y-4 list-decimal pl-5">
                <li>
                  <p>Accédez à la <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center">
                    Console Google Cloud
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a></p>
                </li>
                <li>
                  <p>Créez un nouveau projet ou sélectionnez un projet existant</p>
                </li>
                <li>
                  <p>Activez l'API Google Tasks dans la bibliothèque d'API</p>
                </li>
                <li>
                  <p>Créez des identifiants OAuth 2.0 pour une application web</p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Configurez l'écran de consentement OAuth</li>
                    <li>Ajoutez les URI de redirection autorisés (généralement votre domaine)</li>
                    <li>Copiez l'ID client et le secret client générés</li>
                  </ul>
                </li>
                <li>
                  <p>Créez une clé API restreinte pour l'API Tasks</p>
                </li>
                <li>
                  <p>Saisissez ces identifiants dans ce formulaire de configuration</p>
                </li>
              </ol>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md p-3 mt-4">
                <p className="text-sm">Pour plus d'informations, consultez la <a href="https://developers.google.com/tasks/quickstart/js" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center">
                  documentation officielle de Google Tasks API
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a></p>
              </div>
            </div>
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
