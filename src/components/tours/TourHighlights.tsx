
import React from 'react';
import { Star } from 'lucide-react';

interface TourHighlightsProps {
  highlights: string[];
}

const TourHighlights: React.FC<TourHighlightsProps> = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Points forts</h2>
      <ul className="space-y-3 text-muted-foreground">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start">
            <Star className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourHighlights;
