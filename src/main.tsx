
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/animations.css';

// Ajout de la précharge DNS pour améliorer la vitesse de chargement des images externes
const linkDns = document.createElement('link');
linkDns.rel = 'dns-prefetch';
linkDns.href = 'https://images.unsplash.com';
document.head.appendChild(linkDns);

// Préconnect pour établir une connexion anticipée
const linkPreconnect = document.createElement('link');
linkPreconnect.rel = 'preconnect';
linkPreconnect.href = 'https://images.unsplash.com';
document.head.appendChild(linkPreconnect);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
