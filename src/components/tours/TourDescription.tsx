
import React from 'react';

interface TourDescriptionProps {
  description: string;
}

const TourDescription: React.FC<TourDescriptionProps> = ({ description }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Description</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default TourDescription;
