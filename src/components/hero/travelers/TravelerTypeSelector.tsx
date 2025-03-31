
import React from 'react';
import TravelerCountButton from './TravelerCountButton';

interface TravelerTypeSelectorProps {
  type: string;
  label: string;
  ageInfo: string;
  count: number;
  onDecrease: () => void;
  onIncrease: () => void;
  minCount: number;
  maxCount: number;
}

const TravelerTypeSelector: React.FC<TravelerTypeSelectorProps> = ({
  type,
  label,
  ageInfo,
  count,
  onDecrease,
  onIncrease,
  minCount,
  maxCount
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{ageInfo}</p>
      </div>
      <div className="flex items-center">
        <TravelerCountButton 
          onClick={onDecrease}
          disabled={count <= minCount}
          isIncrement={false}
        />
        <span className="w-10 text-center">{count}</span>
        <TravelerCountButton 
          onClick={onIncrease}
          disabled={count >= maxCount}
          isIncrement={true}
        />
      </div>
    </div>
  );
};

export default TravelerTypeSelector;
