
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any; // For rest props like type, onClick, etc.
}

const LoadingButton = ({
  isLoading,
  loadingText = "Chargement...",
  children,
  className = "",
  ...props
}: LoadingButtonProps) => {
  return (
    <Button 
      className={className}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
