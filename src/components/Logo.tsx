
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', size = 'md' }) => {
  const textColor = variant === 'white' ? 'text-white' : 'text-northgascar-navy dark:text-white';
  
  const sizeClasses = {
    sm: 'text-xl md:text-2xl h-9',
    md: 'text-2xl md:text-3xl h-12',
    lg: 'text-3xl md:text-4xl h-14',
  };

  return (
    <Link to="/" className={`flex items-center gap-2 font-display font-bold ${textColor} ${sizeClasses[size]}`}>
      <img 
        src="/lovable-uploads/f8c8f079-7776-45ac-a077-6570cfbb7fcf.png" 
        alt="North Gascar Tours Logo" 
        className={sizeClasses[size]}
      />
      <span className="hidden md:inline">North Gascar <span className="text-northgascar-teal dark:text-northgascar-orange">Tours</span></span>
    </Link>
  );
};

export default Logo;
