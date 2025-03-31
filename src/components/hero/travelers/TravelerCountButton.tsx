
import React from 'react';
import { Button } from '@/components/ui/button';

interface TravelerCountButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isIncrement: boolean;
}

const TravelerCountButton: React.FC<TravelerCountButtonProps> = ({ 
  onClick, 
  disabled = false,
  isIncrement
}) => {
  return (
    <Button 
      variant="outline" 
      size="icon" 
      className="h-8 w-8 rounded-full"
      onClick={onClick}
      disabled={disabled}
    >
      {isIncrement ? '+' : '-'}
    </Button>
  );
};

export default TravelerCountButton;
