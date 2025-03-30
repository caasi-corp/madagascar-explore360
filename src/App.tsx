
import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initDB } from './lib/store';

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
  useEffect(() => {
    // Initialiser la base de données au chargement de l'application
    const initialize = async () => {
      try {
        await initDB();
        console.log("Base de données initialisée avec succès");
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données:", error);
      }
    };
    
    initialize();
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
