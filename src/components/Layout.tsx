
import React from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import WhatsAppChat from './WhatsAppChat';
import { Outlet, useLocation } from 'react-router-dom';
import { usePageTracking } from '@/hooks/usePageTracking';

// Tracking function to log visits to Google Sheet
const logPageVisit = () => {
  try {
    // Create current timestamp in user's timezone
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    
    // Get page path and other details
    const path = window.location.pathname;
    const referrer = document.referrer || 'Direct';
    
    // Build form data
    const formData = new FormData();
    formData.append('entry.1621853391', formattedDate); // Date field
    formData.append('entry.1379611861', formattedTime); // Time field
    formData.append('entry.1283592347', path); // Page Path
    formData.append('entry.853046991', referrer); // Referrer info
    
    // Google Form submission URL - linked to your spreadsheet
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe4Ox5fDDUxh69VWQ22kBxhTp6WKQb_1m1X5aH3uU08b5IWtA/formResponse';
    
    // Create hidden iframe for submission (avoids CORS issues)
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden-iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Create form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = googleFormUrl;
    form.target = 'hidden-iframe';
    
    // Add form fields
    for (const [key, value] of formData.entries()) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    }
    
    // Submit form and clean up
    document.body.appendChild(form);
    form.submit();
    
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 1000);
    
    console.log('Page visit logged:', path);
  } catch (error) {
    console.error('Error logging page visit:', error);
  }
};

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Use the tracking hook to log page visits on route changes
  usePageTracking(logPageVisit);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children || <Outlet />}
      </main>
      <WhatsAppChat />
      <Footer />
    </div>
  );
};

export default Layout;
