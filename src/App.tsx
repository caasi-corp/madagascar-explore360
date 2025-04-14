
import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initDB, initDBX, migrateToDBX } from './lib/store';
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
    // Initialiser les bases de données au chargement de l'application
    const initialize = async () => {
      try {
        setIsInitializing(true);
        
        // Première étape : initialiser IndexedDB pour la migration
        const db = await initDB();
        console.log("Base de données IndexedDB initialisée avec succès");
        
        // Deuxième étape : initialiser la nouvelle base DBX
        await initDBX();
        console.log("Base de données DBX initialisée avec succès");
        
        // Troisième étape : migrer les données de IndexedDB vers DBX
        await migrateToDBX(db);
        console.log("Migration des données vers DBX terminée");
        
        // Vérifier que les utilisateurs ont bien été créés (via DBX maintenant)
        console.log("Base de données prête à l'emploi");
        
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
