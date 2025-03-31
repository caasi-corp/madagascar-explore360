
export interface TravelerCount {
  adults: number;
  children: number;
  infants: number;
}

export interface TravelersSelectorProps {
  travelers: TravelerCount;
  setTravelers: (travelers: TravelerCount) => void;
}
