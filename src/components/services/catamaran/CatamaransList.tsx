
import React from 'react';
import CatamaranCard, { Catamaran } from './CatamaranCard';

interface CatamaransListProps {
  catamarans: Catamaran[];
}

const CatamaransList: React.FC<CatamaransListProps> = ({ catamarans }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {catamarans.map((catamaran) => (
        <CatamaranCard key={catamaran.id} catamaran={catamaran} />
      ))}
    </div>
  );
};

export default CatamaransList;
