
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const LogoutButton: React.FC = () => {
  return (
    <div className="border-t border-border p-3 absolute bottom-0 left-0 right-0 bg-card">
      <Link
        to="/logout"
        className="flex items-center justify-center p-3 rounded-md text-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
      >
        <LogOut size={18} className="mr-2" />
        <span className="font-medium">Logout</span>
      </Link>
    </div>
  );
};

export default LogoutButton;
