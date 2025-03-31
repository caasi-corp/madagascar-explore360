
import React from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import WhatsAppChat from './WhatsAppChat';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        {children || <Outlet />}
      </main>
      <WhatsAppChat />
      <Footer />
    </div>
  );
};

export default Layout;
