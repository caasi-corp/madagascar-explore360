
import React from 'react';
import { CircleCheck, CircleAlert, CircleX, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { icon: React.ReactNode; className: string }> = {
    'Confirmé': {
      icon: <CircleCheck className="h-4 w-4" />,
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    },
    'Confirmed': {
      icon: <CircleCheck className="h-4 w-4" />,
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    },
    'En attente': {
      icon: <Clock className="h-4 w-4" />,
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    },
    'Pending': {
      icon: <Clock className="h-4 w-4" />,
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    },
    'Annulé': {
      icon: <CircleX className="h-4 w-4" />,
      className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    },
    'Cancelled': {
      icon: <CircleX className="h-4 w-4" />,
      className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    },
    'Remboursé': {
      icon: <CircleAlert className="h-4 w-4" />,
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    },
    'Refunded': {
      icon: <CircleAlert className="h-4 w-4" />,
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    }
  };

  const config = statusConfig[status] || {
    icon: <Clock className="h-4 w-4" />,
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400'
  };

  return (
    <div className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1', config.className)}>
      {config.icon}
      <span>{status}</span>
    </div>
  );
};
