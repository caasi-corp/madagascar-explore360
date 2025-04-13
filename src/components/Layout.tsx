
import React, { useEffect } from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import WhatsAppChat from './WhatsAppChat';
import { Outlet, useLocation } from 'react-router-dom';
import { usePageTracking } from '@/hooks/usePageTracking';
import { logVisitorDataToSheet, logVisitorDataViaForm, writeTestDataToSheet } from '@/lib/api/googleSheetsAPI';

// Tracking function to log visits to Google Sheet
const logPageVisit = async () => {
  try {
    // Create current timestamp in user's timezone
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    
    // Get page path and other details
    const path = window.location.pathname;
    const referrer = document.referrer || 'Direct';
    
    // Prepare data for logging
    const visitData = {
      date: formattedDate,
      time: formattedTime,
      path: path,
      info: referrer
    };
    
    // Log detailed info to console for debugging
    console.log('Page visit tracking details:', visitData);
    
    // Try API method first
    const apiSuccess = await logVisitorDataToSheet(visitData);
    
    // If API fails, use form submission as fallback
    if (!apiSuccess) {
      console.log('API logging failed, using form submission fallback...');
      logVisitorDataViaForm(visitData);
    }
    
    console.log('Page visit logged successfully via API');
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
  
  // Write test data to the sheet immediately on component mount
  useEffect(() => {
    // Write a test entry to the sheet
    const writeTestEntry = async () => {
      console.log('Writing test entry to Google Sheet...');
      await writeTestDataToSheet();
      console.log('Test entry sent successfully');
    };
    
    writeTestEntry();
  }, []);
  
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
