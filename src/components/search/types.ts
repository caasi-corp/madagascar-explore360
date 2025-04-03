
import { DateRange } from 'react-day-picker';

export interface Travelers {
  adults: number;
  children: number;
  infants: number;
}

export interface SearchParams {
  destination: string;
  dateRange: DateRange;
  travelers: Travelers;
}
