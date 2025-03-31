
import React from "react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { AnimatedContainer } from "@/components/ui/animated-container";

interface AnimatedBadgeProps extends BadgeProps {
  delay?: number;
}

export const AnimatedBadge = React.forwardRef<
  HTMLDivElement,
  AnimatedBadgeProps
>(({ children, delay = 0, className, ...props }, ref) => {
  return (
    <AnimatedContainer
      ref={ref}
      delay={delay}
      className="inline-block"
    >
      <Badge className={className} {...props}>
        {children}
      </Badge>
    </AnimatedContainer>
  );
});

AnimatedBadge.displayName = "AnimatedBadge";
