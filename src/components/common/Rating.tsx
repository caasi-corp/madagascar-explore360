
import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  maxRating?: number;
  showValue?: boolean;
  reviews?: number;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  maxRating = 5,
  showValue = false,
  reviews,
  className,
  iconClassName,
  textClassName
}) => {
  // Calculate full stars, partial stars, and empty stars
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;
  const emptyStars = Math.floor(maxRating - value - (hasHalfStar ? 1 : 0));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star 
            key={`full-star-${i}`} 
            className={cn("text-northgascar-yellow h-5 w-5", iconClassName)} 
            fill="currentColor" 
          />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <StarHalf 
            className={cn("text-northgascar-yellow h-5 w-5", iconClassName)} 
            fill="currentColor" 
          />
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarOff 
            key={`empty-star-${i}`} 
            className={cn("text-muted-foreground h-5 w-5", iconClassName)} 
          />
        ))}
      </div>
      
      {showValue && (
        <span className={cn("font-bold", textClassName)}>
          {value.toFixed(1)}
          {reviews !== undefined && (
            <span className="text-muted-foreground font-normal ml-1">
              ({reviews > 1000 ? `${(reviews / 1000).toFixed(1)}k+` : `${reviews}+`} avis)
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default Rating;
