
import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SidebarProvider } from '@/components/ui/sidebar';

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
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background to-muted/50 dark:from-background dark:to-muted/20">
        <AdminSidebar />
        <div className="flex flex-col flex-1 md:ml-64 transition-all duration-300 ease-in-out">
          <AdminHeader toggleTheme={toggleTheme} theme={theme} />
          <main className="flex-grow p-6 animate-fade-in">
            <Card variant="glass" className="shadow-xl rounded-xl backdrop-blur-sm bg-background/60 dark:bg-background/30 border-white/10 dark:border-white/5 overflow-hidden transform hover:translate-y-[-2px] transition-all duration-300">
              <div className="p-6">
                <Outlet />
              </div>
            </Card>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
