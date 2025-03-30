
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Button className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
        <CalendarDays className="mr-2 h-4 w-4" />
        View Calendar
      </Button>
    </div>
  );
};

export default DashboardHeader;
