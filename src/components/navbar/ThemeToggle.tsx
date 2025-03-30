
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isScrolled?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme, isScrolled = false }) => {
  return (
    <Button 
      onClick={toggleTheme} 
      variant="ghost" 
      size="icon" 
      className={`rounded-full ${
        isScrolled || theme === 'dark'
          ? 'text-foreground hover:text-madagascar-green'
          : 'text-white hover:text-madagascar-yellow'
      }`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
};

export default ThemeToggle;
