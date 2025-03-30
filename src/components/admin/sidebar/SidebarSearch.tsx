
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SidebarSearch: React.FC = () => {
  return (
    <div className="px-3 pb-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input 
          placeholder="Search..." 
          className="pl-9 text-sm glass-input bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10"
        />
      </div>
    </div>
  );
};

export default SidebarSearch;
