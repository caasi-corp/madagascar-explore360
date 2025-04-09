
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { syncWithGoogleCalendar } from '@/hooks/booking/bookingUtils';

export function useGoogleApiConfig() {
  const [apiKey, setApiKey] = useState('AIzaSyC-yED_EoHW-LtNTdLgCwavTdRiikQ1K_0');
  const [clientId, setClientId] = useState('543266334034-mecmfq4h1jgi0rnqnbc0k9biobp4ecge.apps.googleusercontent.com');
  const [clientSecret, setClientSecret] = useState('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');
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

  const handleTestConnection = async () => {
    setIsTesting(true);
    
    if (!apiKey || !clientId || !clientSecret) {
      setIsTesting(false);
      toast({
        title: "Échec de la connexion",
        description: "Veuillez compléter tous les champs requis.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Sauvegarde temporaire des identifiants pour le test
      localStorage.setItem('google_api_key', apiKey);
      localStorage.setItem('google_client_id', clientId);
      localStorage.setItem('google_client_secret', clientSecret);
      localStorage.setItem('google_api_configured', 'true');
      
      // Utiliser la fonction réelle de synchronisation pour tester la connexion
      await syncWithGoogleCalendar();
      
      toast({
        title: "Connexion réussie",
        description: "La connexion à l'API Google a été testée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Échec de la connexion",
        description: error instanceof Error ? error.message : "Erreur lors du test de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
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
