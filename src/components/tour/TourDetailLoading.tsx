
import React from 'react';

const TourDetailLoading = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-madagascar-green border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-madagascar-blue dark:text-madagascar-yellow">Chargement des détails du circuit...</p>
      </div>
    </div>
  );
};

export default TourDetailLoading;
