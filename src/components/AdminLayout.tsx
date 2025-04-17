
import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex flex-col flex-1 md:ml-64"> {/* Ajout d'une marge à gauche qui correspond à la largeur de la sidebar */}
        <AdminHeader toggleTheme={toggleTheme} theme={theme} />
        <main className="flex-grow p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
