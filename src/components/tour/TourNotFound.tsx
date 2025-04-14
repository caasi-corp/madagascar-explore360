
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TourNotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Circuit non trouvé</h2>
        <p className="mb-8 text-muted-foreground">Le circuit que vous recherchez n'existe pas ou a été supprimé.</p>
        <Button asChild>
          <Link to="/tours">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux circuits
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TourNotFound;
