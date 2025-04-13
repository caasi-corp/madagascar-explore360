
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

// Initialize the query client with better caching strategy
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize the database when the application loads
    const initialize = async () => {
      try {
        setIsInitializing(true);
        console.log("Starting database initialization...");
        
        const db = await initDB();
        console.log("Database successfully initialized");
        
        // Verify that users were created correctly
        const users = await db.getAll('users');
        console.log(`Database contains ${users.length} users:`, JSON.stringify(users));
        
      } catch (error) {
        console.error("Error initializing database:", error);
        setInitError((error as Error).message || "Error initializing database");
      } finally {
        setIsInitializing(false);
      }
    };
    
    initialize();
  }, []);

  const handleRetry = () => {
    setInitError(null);
    setIsInitializing(true);
    window.location.reload();
  };

  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-madagascar-green" />
        <p className="mt-4 text-foreground">Initializing application...</p>
      </div>
    );
  }

  if (initError) {
    return (
      <Dialog open={!!initError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Initialization Error</DialogTitle>
            <DialogDescription>
              An error occurred during database initialization: {initError}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => console.log("Error details:", initError)}>
              Show Details
            </Button>
            <Button onClick={handleRetry}>
              Retry
            </Button>
          </div>
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
