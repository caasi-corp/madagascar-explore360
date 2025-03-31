
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
  height?: string;
  bgColor?: string;
  fillColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  height = "h-1",
  bgColor = "bg-white/20",
  fillColor = "bg-northgascar-teal"
}) => {
  return (
    <div className={cn("w-full overflow-hidden rounded-full", height, bgColor, className)}>
      <div 
        className={cn("h-full transition-all duration-300 ease-out", fillColor)}
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

export default ProgressBar;
