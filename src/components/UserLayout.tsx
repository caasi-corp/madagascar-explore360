
import React from 'react';
import Navbar from './navbar';
import Footer from './Footer';  
import WhatsAppChat from './WhatsAppChat';
import { Outlet } from 'react-router-dom';

const UserLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
      <WhatsAppChat />
      <Footer />
    </div>
  );
};

export default UserLayout;
