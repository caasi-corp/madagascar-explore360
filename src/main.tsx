
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Check if running in Electron
const isElectron = window.electronAPI !== undefined;

// Ajouter un log pour vérifier la détection d'Electron
console.log("Application démarrée, Electron détecté:", isElectron);

// Initialize the app
const initApp = async () => {
  // Add Google Analytics script if needed (only in production and not in Electron)
  if (import.meta.env.PROD && !isElectron) {
    const gaId = 'G-XXXXXXXXXX'; // Replace with your actual GA ID
    if (gaId && typeof window !== 'undefined') {
      // Add Google Analytics script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      
      document.head.appendChild(script1);
      document.head.appendChild(script2);
    }
  }

  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Start the application
initApp();
