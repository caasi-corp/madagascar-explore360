
import React from 'react';

interface TourDescriptionProps {
  description: string;
}

const TourDescription: React.FC<TourDescriptionProps> = ({ description }) => {
  const paragraphs = description.split('\n\n');
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Description</h2>
      <div className="text-muted-foreground space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default TourDescription;
