
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <Button 
      className="bg-northgascar-teal hover:bg-northgascar-teal/80 text-white h-10 lg:h-full"
      onClick={onClick}
    >
      <Search className="mr-2" size={18} />
      Rechercher
    </Button>
  );
};

export default SearchButton;
