
import React from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import WhatsAppChat from './WhatsAppChat';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  console.log("Layout rendering, children:", !!children);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-16">
        <div className="container mx-auto px-4 py-8">
          {children || <Outlet />}
        </div>
      </main>
      <WhatsAppChat />
      <Footer />
    </div>
  );
};

export default Layout;
