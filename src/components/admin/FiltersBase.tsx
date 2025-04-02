
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FiltersBaseProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
  children?: React.ReactNode;
  className?: string;
}

const FiltersBase: React.FC<FiltersBaseProps> = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder,
  children,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-4 mb-6 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input 
          placeholder={placeholder} 
          className="font-sans pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {children}
    </div>
  );
};

export default FiltersBase;
