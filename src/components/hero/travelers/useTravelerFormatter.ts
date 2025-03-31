
import { TravelerCount } from './types';

export const useTravelerFormatter = () => {
  const formatTravelers = (travelers: TravelerCount): string => {
    const { adults, children, infants } = travelers;
    const totalTravelers = adults + children + infants;
    
    if (totalTravelers === 1) {
      return '1 voyageur';
    }
    
    let display = `${totalTravelers} voyageurs`;
    
    if (children > 0 || infants > 0) {
      display += ` (${adults} adulte${adults > 1 ? 's' : ''}`;
      if (children > 0) display += `, ${children} enfant${children > 1 ? 's' : ''}`;
      if (infants > 0) display += `, ${infants} bébé${infants > 1 ? 's' : ''}`;
      display += ')';
    }
    
    return display;
  };

  return { formatTravelers };
};
