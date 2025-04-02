
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DropdownItem {
  title: string;
  path: string;
}

interface NavbarDropdownProps {
  title: string;
  items: DropdownItem[];
  isDark?: boolean;
  isScrolled?: boolean;
  onClick?: () => void;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ 
  title, 
  items, 
  isDark = false,
  isScrolled = false,
  onClick 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={`px-3 flex items-center text-base font-sans font-medium ${
            isScrolled || isDark
              ? 'text-foreground hover:text-madagascar-green'
              : 'text-white hover:text-madagascar-yellow'
          }`}
        >
          {title} <ChevronDown size={16} className="ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link to={item.path} onClick={onClick} className="font-sans">
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdown;
