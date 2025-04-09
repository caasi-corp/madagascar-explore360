
import React from 'react';
import Navbar from './navbar';
import Footer from './Footer';  
import WhatsAppChat from './WhatsAppChat';
import UserSidebar from './user/UserSidebar';
import UserMobileNav from './user/UserMobileNav';
import { Outlet } from 'react-router-dom';

const UserLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <aside className="hidden md:block w-64 border-r">
          <UserSidebar />
        </aside>
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="md:hidden mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Espace Utilisateur</h1>
              <UserMobileNav />
            </div>
            <Outlet />
          </div>
        </main>
      </div>
      <WhatsAppChat />
      <Footer />
    </div>
  );
};

export default UserLayout;
