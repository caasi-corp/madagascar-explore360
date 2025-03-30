
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Sitemap = () => {
  const pageCategories = [
    {
      category: 'Pages Principales',
      pages: [
        { title: 'Accueil', path: '/', description: 'Page d\'accueil de North Gascar Tours' },
        { title: 'Circuits', path: '/tours', description: 'Tous nos circuits et excursions disponibles' },
        { title: 'À Propos', path: '/about', description: 'Notre histoire et nos valeurs' },
        { title: 'Contact', path: '/contact', description: 'Contactez-nous pour toute demande' }
      ]
    },
    {
      category: 'Services',
      pages: [
        { title: 'Location de Voiture', path: '/services/car-rental', description: 'Louez un véhicule pour explorer Madagascar' },
        { title: 'Réservation de Vol', path: '/services/flights', description: 'Trouvez et réservez vos vols' },
        { title: 'Réservation d\'Hôtel', path: '/services/hotels', description: 'Trouvez l\'hébergement idéal pour votre séjour' }
      ]
    },
    {
      category: 'Espaces Utilisateurs',
      pages: [
        { title: 'Connexion', path: '/login', description: 'Connectez-vous à votre compte' },
        { title: 'Inscription', path: '/register', description: 'Créez un nouveau compte utilisateur' },
        { title: 'Tableau de bord Utilisateur', path: '/user-dashboard', description: 'Gérez vos réservations et votre profil', isRestricted: true }
      ]
    },
    {
      category: 'Administration',
      pages: [
        { title: 'Tableau de bord Admin', path: '/admin', description: 'Administration du site', isRestricted: true }
      ]
    },
    {
      category: 'Légal',
      pages: [
        { title: 'Politique de Confidentialité', path: '/privacy-policy', description: 'Notre politique concernant vos données personnelles' },
        { title: 'Conditions d\'Utilisation', path: '/terms-of-service', description: 'Termes et conditions de nos services' },
        { title: 'Plan du Site', path: '/sitemap', description: 'Vue d\'ensemble de la structure du site' }
      ]
    }
  ];

  return (
    <div className="container mx-auto py-16 px-4 mt-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Plan du Site</h1>
      
      <div className="glass-card p-8 rounded-xl">
        <p className="text-lg mb-8">
          Bienvenue sur le plan du site de North Gascar Tours. Cette page vous aide à naviguer facilement à travers notre site web.
        </p>
        
        <div className="space-y-8">
          {pageCategories.map((category, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.pages.map((page, pageIndex) => (
                  <Link 
                    key={pageIndex} 
                    to={page.path}
                    className="p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold flex items-center">
                          {page.title} 
                          <ArrowRight size={14} className="ml-2 text-northgascar-teal" />
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{page.description}</p>
                      </div>
                      {page.isRestricted && (
                        <Badge variant="glass">Restreint</Badge>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
