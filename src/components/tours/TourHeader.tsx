
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TourHeaderProps {
  title: string;
}

const TourHeader: React.FC<TourHeaderProps> = ({ title }) => {
  return (
    <>
      <Button asChild variant="outline" className="mb-6">
        <Link to="/tours">
          <ArrowLeft className="mr-2" />
          Retour aux circuits
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
    </>
  );
};

export default TourHeader;
