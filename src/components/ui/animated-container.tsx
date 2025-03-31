
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRandomEntryAnimation, EntryAnimationType } from "@/hooks/useRandomEntryAnimation";

export interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Délai avant le début de l'animation (ms) */
  delay?: number;
  /** Type d'animation spécifique (laissez vide pour aléatoire) */
  animationType?: EntryAnimationType;
  /** Si vrai, l'animation ne se déclenche que lorsque l'élément devient visible */
  onlyWhenVisible?: boolean;
  /** Seuil de visibilité pour déclencher l'animation */
  threshold?: number;
  /** Activer ou désactiver l'animation */
  disabled?: boolean;
}

const AnimatedContainer = React.forwardRef<
  HTMLDivElement,
  AnimatedContainerProps
>(({
  children,
  className,
  delay = 0,
  animationType,
  onlyWhenVisible = false,
  threshold = 0.1,
  disabled = false,
  ...props
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!onlyWhenVisible);
  
  const animation = useRandomEntryAnimation(isVisible, delay);

  useEffect(() => {
    if (!onlyWhenVisible || disabled) return;

    const currentRef = containerRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onlyWhenVisible, threshold, disabled]);

  return (
    <div
      ref={ref || containerRef}
      className={cn(
        disabled ? "" : animation.className,
        className
      )}
      style={disabled ? {} : animation.style}
      {...props}
    >
      {children}
    </div>
  );
});

AnimatedContainer.displayName = "AnimatedContainer";

export { AnimatedContainer };
