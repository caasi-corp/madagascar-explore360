
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SidebarSearch: React.FC = () => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
      <Input 
        placeholder="Search..." 
        className="pl-9 text-sm"
      />
    </div>
  );
};

export default SidebarSearch;
