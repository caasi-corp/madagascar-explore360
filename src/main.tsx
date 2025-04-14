
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { initializeDatabase } from './lib/store';
import './index.css';

// Initialiser la base de données avant le rendu de l'application
initializeDatabase('auto').then((success) => {
  if (success) {
    console.log('Base de données initialisée avec succès');
  } else {
    console.error('Erreur lors de l\'initialisation de la base de données');
  }
  
  // Rendu de l'application
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
