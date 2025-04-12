
import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initDB } from './lib/store';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';

// Initialize the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [initRetries, setInitRetries] = useState(0);

  useEffect(() => {
    // Initialiser la base de données au chargement de l'application
    const initialize = async () => {
      try {
        setIsInitializing(true);
        console.log("Démarrage de l'initialisation de la base de données...");
        
        // Ajouter un timeout pour éviter un blocage infini
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("L'initialisation a pris trop de temps")), 10000);
        });
        
        // Race entre l'initialisation et le timeout
        const db = await Promise.race([
          initDB(),
          timeoutPromise
        ]) as any;
        
        console.log("Base de données initialisée avec succès");
        
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données:", error);
        setInitError((error as Error).message || "Erreur lors de l'initialisation de la base de données");
      } finally {
        setIsInitializing(false);
      }
    };
    
    initialize();
  }, [initRetries]);

  const handleRetry = () => {
    setInitError(null);
    setIsInitializing(true);
    setInitRetries(prev => prev + 1);
  };

  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-madagascar-green" />
        <p className="mt-4">Initialisation de l'application...</p>
      </div>
    );
  }

  if (initError) {
    return (
      <Dialog open={!!initError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Erreur d'initialisation</DialogTitle>
            <DialogDescription>
              Une erreur est survenue lors de l'initialisation de la base de données: {initError}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleRetry}>
            Réessayer
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
