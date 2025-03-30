
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Home, Map, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="relative mb-8">
          <div className="relative z-10 text-madagascar-blue dark:text-madagascar-yellow text-9xl font-bold opacity-20">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search size={120} className="text-madagascar-green" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          The page you're looking for seems to be lost in the Madagascar wilderness.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="default" className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Go Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/tours">
              <Map className="mr-2 h-4 w-4" /> Explore Tours
            </Link>
          </Button>
          <Button asChild variant="ghost" onClick={() => window.history.back()}>
            <div>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </div>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
