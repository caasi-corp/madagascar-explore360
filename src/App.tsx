
import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initDB, resetDB } from './lib/store';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { getDB as getIDBDatabase, initDB as initIndexedDB } from './lib/db/db'; 
import { seedIDBDatabase } from './lib/db/idbSeed';

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
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    // Initialiser les bases de données au chargement de l'application
    const initialize = async () => {
      try {
        setIsInitializing(true);
        console.log("Démarrage de l'initialisation des bases de données...");
        
        // 1. First initialize SQLite
        await initDB();
        console.log("Base de données SQLite initialisée avec succès");
        
        // 2. Then initialize IndexedDB separately
        try {
          await initIndexedDB();
          const idbDatabase = await getIDBDatabase();
          console.log("Base de données IndexedDB initialisée avec succès");
          
          // 3. Seed IndexedDB with test data
          const seedResult = await seedIDBDatabase(idbDatabase);
          console.log("Initialisation des données IndexedDB terminée:", seedResult ? "Succès" : "Échec");
          
          setIsDbReady(true);
        } catch (idbError) {
          console.error("Erreur lors de l'initialisation de IndexedDB:", idbError);
          // We can still continue with SQLite only
          setIsDbReady(true);
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation des bases de données:", error);
        setInitError((error as Error).message || "Erreur lors de l'initialisation des bases de données");
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
              Une erreur est survenue lors de l'initialisation de la base de données: {initError}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button onClick={() => window.location.reload()}>
              Réessayer
            </Button>
            <Button 
              variant="outline" 
              onClick={async () => {
                try {
                  await resetDB();
                  window.location.reload();
                } catch (e) {
                  console.error("Erreur lors de la réinitialisation:", e);
                }
              }}
            >
              Réinitialiser la base de données
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Ne rendre l'application que lorsque la base de données est prête
  if (!isDbReady) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-madagascar-green" />
        <p className="mt-4">Préparation de l'application...</p>
      </div>
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
