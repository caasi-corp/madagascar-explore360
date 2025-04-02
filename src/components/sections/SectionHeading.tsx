
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <div className={cn(
      "mb-10", 
      centered ? "text-center" : "", 
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl font-sans leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
