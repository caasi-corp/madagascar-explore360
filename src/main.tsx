
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

// Ajouter un preload pour les polices principales
const fontPreload = document.createElement('link');
fontPreload.rel = 'preload';
fontPreload.as = 'style';
fontPreload.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&family=Cormorant:wght@400;500;600;700&display=swap';
document.head.appendChild(fontPreload);

// Détecter le support de JavaScript
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Mettre en place le chargement rapide
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Définir un message d'erreur global pour faciliter le débogage
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
