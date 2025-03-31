
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDateTime = (dateTimeString: string): string => {
  try {
    return format(new Date(dateTimeString), 'dd MMM yyyy à HH:mm', { locale: fr });
  } catch (error) {
    return dateTimeString;
  }
};
