
import { TravelerCount } from './types';

export const updateAdults = (
  travelers: TravelerCount, 
  increment: boolean
): TravelerCount => {
  if (increment) {
    if (travelers.adults >= 10) return travelers;
    return {
      ...travelers,
      adults: Math.min(10, travelers.adults + 1)
    };
  } else {
    if (travelers.adults <= 1) return travelers;
    return {
      ...travelers,
      adults: Math.max(1, travelers.adults - 1)
    };
  }
};

export const updateChildren = (
  travelers: TravelerCount, 
  increment: boolean
): TravelerCount => {
  if (increment) {
    if (travelers.children >= 6) return travelers;
    return {
      ...travelers,
      children: Math.min(6, travelers.children + 1)
    };
  } else {
    if (travelers.children <= 0) return travelers;
    return {
      ...travelers,
      children: Math.max(0, travelers.children - 1)
    };
  }
};

export const updateInfants = (
  travelers: TravelerCount, 
  increment: boolean
): TravelerCount => {
  if (increment) {
    if (travelers.infants >= 4) return travelers;
    return {
      ...travelers,
      infants: Math.min(4, travelers.infants + 1)
    };
  } else {
    if (travelers.infants <= 0) return travelers;
    return {
      ...travelers,
      infants: Math.max(0, travelers.infants - 1)
    };
  }
};
