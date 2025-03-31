
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TourErrorState: React.FC = () => {
  return (
    <div className="container mx-auto p-6 pt-20">
      <h2 className="text-xl font-bold mb-4">Une erreur est survenue</h2>
      <p className="mb-4">Impossible de charger les détails du circuit.</p>
      <Button asChild variant="outline">
        <Link to="/tours">
          <ArrowLeft className="mr-2" />
          Retour aux circuits
        </Link>
      </Button>
    </div>
  );
};

export default TourErrorState;
