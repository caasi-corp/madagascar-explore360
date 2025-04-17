
import React from 'react';

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;
  
  return (
    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
      {message}
    </div>
  );
};

export default ErrorMessage;
