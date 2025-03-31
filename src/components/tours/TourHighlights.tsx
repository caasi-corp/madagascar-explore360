
import React from 'react';

interface TourHighlightsProps {
  highlights: string[];
}

const TourHighlights: React.FC<TourHighlightsProps> = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Points forts</h2>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        {highlights.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
    </div>
  );
};

export default TourHighlights;
