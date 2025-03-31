
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

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
        <h4 className="font-medium text-white">{label}</h4>
        <p className="text-xs text-white/70">{ageInfo}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-white/30 text-white hover:bg-white/10"
          onClick={onDecrease}
          disabled={count <= minCount}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">Diminuer {label}</span>
        </Button>
        <span className="w-6 text-center text-white">{count}</span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-white/30 text-white hover:bg-white/10"
          onClick={onIncrease}
          disabled={count >= maxCount}
        >
          <Plus className="h-3 w-3" />
          <span className="sr-only">Augmenter {label}</span>
        </Button>
      </div>
    </div>
  );
};

export default TravelerTypeSelector;
