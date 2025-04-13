
import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initDB, resetDB } from './lib/db/db'; // Importer directement depuis le fichier source
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
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    // Initialiser la base de données au chargement de l'application
    const initialize = async () => {
      try {
        setIsInitializing(true);
        
        // Tenter d'abord de vérifier la base de données
        try {
          const db = await initDB();
          
          // Vérifier explicitement que le store banners existe
          if (!db.objectStoreNames.contains('banners')) {
            console.warn("Le store 'banners' n'existe pas, réinitialisation de la base de données...");
            await resetDB();
          }
        } catch (checkError) {
          console.warn("Erreur lors de la vérification de la base de données, tentative de réinitialisation...", checkError);
          await resetDB();
        }
        
        // Initialiser la base de données (après une éventuelle réinitialisation)
        const db = await initDB();
        console.log("Base de données initialisée avec succès");
        
        // Vérifier que les utilisateurs ont bien été créés
        const users = await db.getAll('users');
        console.log(`La base contient ${users.length} utilisateurs:`, JSON.stringify(users));
        
        // Vérifier aussi le store banners
        if (db.objectStoreNames.contains('banners')) {
          const banners = await db.getAll('banners');
          console.log(`La base contient ${banners.length} bannières`);
        } else {
          console.error("Le store 'banners' n'existe toujours pas après initialisation!");
        }
        
        setIsDbReady(true);
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données:", error);
        setInitError((error as Error).message || "Erreur lors de l'initialisation de la base de données");
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
          <Button onClick={() => window.location.reload()}>
            Réessayer
          </Button>
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
