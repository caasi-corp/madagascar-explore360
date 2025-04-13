
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTracking = (trackFunction: () => void) => {
  const location = useLocation();
  
  useEffect(() => {
    // Call tracking function when location changes
    trackFunction();
  }, [location, trackFunction]);
};
