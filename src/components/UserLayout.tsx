
import React from 'react';
import Navbar from './navbar';
import Footer from './Footer';  
import WhatsAppChat from './WhatsAppChat';
import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const UserLayout: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${isMobile ? 'pt-14 md:pt-16' : 'pt-16 md:pt-20'}`}>
        <div className="container mx-auto px-4 py-4 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
      <WhatsAppChat />
      <Footer />
    </div>
  );
};

export default UserLayout;
