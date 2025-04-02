
import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading1 = ({ children, className }: TypographyProps) => (
  <h1 className={cn("text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight", className)}>
    {children}
  </h1>
);

export const Heading2 = ({ children, className }: TypographyProps) => (
  <h2 className={cn("text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight", className)}>
    {children}
  </h2>
);

export const Heading3 = ({ children, className }: TypographyProps) => (
  <h3 className={cn("text-xl md:text-2xl font-display font-semibold tracking-tight", className)}>
    {children}
  </h3>
);

export const Heading4 = ({ children, className }: TypographyProps) => (
  <h4 className={cn("text-lg md:text-xl font-display font-semibold", className)}>
    {children}
  </h4>
);

export const Paragraph = ({ children, className }: TypographyProps) => (
  <p className={cn("text-base font-sans leading-relaxed", className)}>
    {children}
  </p>
);

export const Lead = ({ children, className }: TypographyProps) => (
  <p className={cn("text-lg md:text-xl font-sans leading-relaxed", className)}>
    {children}
  </p>
);

export const Subtle = ({ children, className }: TypographyProps) => (
  <p className={cn("text-sm text-muted-foreground font-sans", className)}>
    {children}
  </p>
);

export const FormLabel = ({ children, className }: TypographyProps) => (
  <span className={cn("text-sm font-sans font-medium", className)}>
    {children}
  </span>
);

export const Quote = ({ children, className }: TypographyProps) => (
  <blockquote className={cn("text-lg font-display italic border-l-4 border-primary pl-4 py-2", className)}>
    {children}
  </blockquote>
);

export const Code = ({ children, className }: TypographyProps) => (
  <code className={cn("bg-muted px-1.5 py-0.5 rounded text-sm font-mono", className)}>
    {children}
  </code>
);
