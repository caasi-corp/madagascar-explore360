
import React, { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-madagascar-green" />
        <p className="mt-4">Initialisation de l'application...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Dialog open={!!error}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Erreur d'initialisation</DialogTitle>
            <DialogDescription>
              Une erreur est survenue lors de l'initialisation: {error}
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
