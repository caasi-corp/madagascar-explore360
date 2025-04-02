
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Tableau de Bord</h1>
      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link to="/admin/bookings">
            <CalendarDays className="mr-2 h-4 w-4" />
            Voir les Réservations
          </Link>
        </Button>
        <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
          <Link to="/admin/tours/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau Circuit
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
