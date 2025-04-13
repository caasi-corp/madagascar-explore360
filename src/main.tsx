
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initDB } from './lib/DatabaseX/db'; // Nouvelle importation

// Initialiser la base de données au démarrage
initDB().catch(err => {
  console.error("Erreur lors de l'initialisation de la base de données:", err);
});

// Add Google Analytics script if needed
const addAnalytics = () => {
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
};

// Initialize analytics in production
if (import.meta.env.PROD) {
  addAnalytics();
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
