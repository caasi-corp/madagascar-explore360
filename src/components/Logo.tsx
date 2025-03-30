
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', size = 'md' }) => {
  const textColor = variant === 'white' ? 'text-white' : 'text-madagascar-blue dark:text-white';
  
  const sizeClasses = {
    sm: 'text-lg md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
  };

  return (
    <Link to="/" className={`flex items-center gap-2 font-montserrat font-bold ${textColor} ${sizeClasses[size]}`}>
      <div className="relative w-8 h-8 md:w-10 md:h-10 bg-madagascar-green rounded-full overflow-hidden flex items-center justify-center">
        <div className="absolute w-full h-full bg-madagascar-yellow rounded-full transform translate-x-1/2"></div>
        <span className="relative z-10 font-bold text-white">N</span>
      </div>
      <span>North Gascar <span className="text-madagascar-green dark:text-madagascar-yellow">Tours</span></span>
    </Link>
  );
};

export default Logo;
