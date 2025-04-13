
import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

  useEffect(() => {
    // Check if we're running in Electron or browser
    const isElectron = window.electronAPI !== undefined;
    
    // Initialize application
    const initialize = async () => {
      try {
        setIsInitializing(true);
        
        if (!isElectron) {
          setInitError("Cette application nécessite Electron pour fonctionner avec SQLite.");
          return;
        }
        
        // Small delay to simulate initialization time
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log("Application initialized successfully");
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'application:", error);
        setInitError((error as Error).message || "Erreur lors de l'initialisation de l'application");
      } finally {
        setIsInitializing(false);
      }
    };
    
    initialize();
  }, []);

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
              Une erreur est survenue lors de l'initialisation de l'application: {initError}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => window.location.reload()}>
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
