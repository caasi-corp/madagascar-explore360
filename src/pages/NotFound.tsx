
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Home, Map, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Erreur: L'utilisateur a tenté d'accéder à une route inexistante:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="relative mb-8">
          <div className="relative z-10 text-northgascar-navy dark:text-northgascar-yellow text-9xl font-bold opacity-20">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search size={120} className="text-northgascar-teal" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Non Trouvée</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          La page que vous recherchez semble s'être perdue dans la nature malgache.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="default" className="bg-northgascar-teal hover:bg-northgascar-teal/80 text-white">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Accueil
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/tours">
              <Map className="mr-2 h-4 w-4" /> Explorer les Circuits
            </Link>
          </Button>
          <Button asChild variant="ghost" onClick={() => window.history.back()}>
            <div>
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour
            </div>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
