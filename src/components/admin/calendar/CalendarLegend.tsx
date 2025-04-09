
import React from 'react';

export const CalendarLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center">
        <div className="w-4 h-4 rounded mr-2 bg-green-100 dark:bg-green-800/20 border border-green-400"></div>
        <span>Disponible</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 rounded mr-2 bg-amber-100 dark:bg-amber-800/20 border border-amber-400"></div>
        <span>Partiellement réservé</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 rounded mr-2 bg-red-100 dark:bg-red-800/20 border border-red-400"></div>
        <span>Complet</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 rounded mr-2 bg-muted opacity-50 line-through"></div>
        <span>Non disponible</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 rounded mr-2 border border-primary"></div>
        <span>Aujourd'hui</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 rounded mr-2 relative">
          <span className="absolute -top-1 -right-1 h-3 w-3 text-blue-500">ℹ</span>
        </div>
        <span>Détails disponibles</span>
      </div>
    </div>
  );
};
