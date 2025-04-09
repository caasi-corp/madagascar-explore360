
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function useGoogleApiConfig() {
  const [apiKey, setApiKey] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const { toast } = useToast();

  // Load existing configurations
  useEffect(() => {
    const savedApiKey = localStorage.getItem('google_api_key');
    const savedClientId = localStorage.getItem('google_client_id');
    const savedClientSecret = localStorage.getItem('google_client_secret');
    const configStatus = localStorage.getItem('google_api_configured');

    if (savedApiKey) setApiKey(savedApiKey);
    if (savedClientId) setClientId(savedClientId);
    if (savedClientSecret) setClientSecret(savedClientSecret);
    setIsConfigured(configStatus === 'true');
  }, []);

  const handleSaveConfig = () => {
    setIsLoading(true);
    
    // Simulate a delay for saving
    setTimeout(() => {
      // Save to localStorage (in a real app, this should be stored securely on the server)
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
    
    // Simulate a connection test
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

  return {
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
  };
}
