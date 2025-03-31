
import React from 'react';
import { Button } from '@/components/ui/button';

interface TourFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

const TourFormActions: React.FC<TourFormActionsProps> = ({ isSubmitting, onCancel }) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Tour'}
      </Button>
    </div>
  );
};

export default TourFormActions;
