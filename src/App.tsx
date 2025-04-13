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
import { logVisitorDataToSheet, logVisitorDataViaForm } from './lib/api/googleSheetsAPI';

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

// Tracking function to log visits to Google Sheets
const logVisitToGoogleSheet = async () => {
  try {
    // Create current timestamp in user's timezone
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    
    // Get user's browser and OS information
    const userAgent = navigator.userAgent;
    const browserInfo = getBrowserInfo(userAgent);
    
    // Get page path
    const path = window.location.pathname;
    
    // Prepare data for logging
    const visitData = {
      date: formattedDate,
      time: formattedTime,
      path: path,
      info: browserInfo
    };
    
    // Log detailed info to console for debugging
    console.log('Visit tracking details:', visitData);
    
    // Try API method first
    const apiSuccess = await logVisitorDataToSheet(visitData);
    
    // If API fails, use form submission as fallback
    if (!apiSuccess) {
      console.log('API logging failed, using form submission fallback...');
      logVisitorDataViaForm(visitData);
    }
    
    console.log('Visit logged successfully to Google Sheets');
  } catch (error) {
    console.error('Error logging visit to Google Sheets:', error);
  }
};

// Helper function to get browser and OS info
const getBrowserInfo = (userAgent: string) => {
  // Browser detection
  let browserName = "Unknown";
  if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browserName = "Opera";
  } else if (userAgent.indexOf("Edge") > -1) {
    browserName = "Edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
  }
  
  // OS detection
  let osName = "Unknown";
  if (userAgent.indexOf("Win") > -1) {
    osName = "Windows";
  } else if (userAgent.indexOf("Mac") > -1) {
    osName = "MacOS";
  } else if (userAgent.indexOf("Linux") > -1) {
    osName = "Linux";
  } else if (userAgent.indexOf("Android") > -1) {
    osName = "Android";
  } else if (userAgent.indexOf("iOS") > -1 || userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) {
    osName = "iOS";
  }
  
  return `${browserName} on ${osName}`;
};

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
    
    // Log this visit to Google Sheets
    logVisitToGoogleSheet();
    
    // Optional: Log page navigation changes
    const handleRouteChange = () => {
      logVisitToGoogleSheet();
    };
    
    // Add event listener for popstate (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);
    
    // Clean up
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
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
