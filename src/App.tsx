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

// Tracking function to log visits to Google Sheets
const logVisitToGoogleSheet = () => {
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
    
    // Build the form data
    const formData = new FormData();
    formData.append('entry.1621853391', formattedDate); // Date field
    formData.append('entry.1379611861', formattedTime); // Time field
    formData.append('entry.1283592347', path); // Page Path
    formData.append('entry.853046991', browserInfo); // Browser Info
    
    // Google Form submission URL - linked to your spreadsheet
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe4Ox5fDDUxh69VWQ22kBxhTp6WKQb_1m1X5aH3uU08b5IWtA/formResponse';
    
    // Create a hidden iframe for the form submission to avoid CORS issues
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden-iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Create the form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = googleFormUrl;
    form.target = 'hidden-iframe';
    
    // Append form data to the form
    for (const [key, value] of formData.entries()) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    }
    
    // Append form to body, submit it, and clean up
    document.body.appendChild(form);
    form.submit();
    
    // Detailed console logging for debugging
    console.log('Visit tracking details:', {
      date: formattedDate,
      time: formattedTime,
      path: path,
      browserInfo: browserInfo
    });
    
    // Clean up after submission (wait a bit to ensure submission completes)
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 1000);
    
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
