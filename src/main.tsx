
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initDB } from './lib/store';

// Initialiser la base de données au démarrage
initDB()
  .then(success => {
    if (success) {
      console.log("✅ Connexion à la base de données établie");
    } else {
      console.warn("⚠️ Problème de connexion à la base de données. L'application utilisera des données de secours.");
    }
  })
  .catch(error => {
    console.error("❌ Erreur lors de l'initialisation de la base de données:", error);
  });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
