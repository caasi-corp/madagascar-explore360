
import React from 'react';
import CruiseCard, { CruiseOption } from './CruiseCard';

interface CruisesListProps {
  cruises: CruiseOption[];
}

const CruisesList: React.FC<CruisesListProps> = ({ cruises }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cruises.map((cruise) => (
        <CruiseCard key={cruise.id} cruise={cruise} />
      ))}
    </div>
  );
};

export default CruisesList;
