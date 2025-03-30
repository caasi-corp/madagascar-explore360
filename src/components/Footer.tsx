
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-northgascar-navy text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Logo variant="white" />
            <p className="text-gray-300 mt-4">
              Découvrez les merveilles de Madagascar avec North Gascar Tours. Guides experts, aventures inoubliables et pratiques de tourisme durable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-northgascar-yellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-northgascar-yellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-northgascar-yellow transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-northgascar-yellow transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              {[
                { name: 'Accueil', path: '/' },
                { name: 'Circuits & Excursions', path: '/tours' },
                { name: 'Location de Voiture', path: '/services/car-rental' },
                { name: 'Réservation de Vol', path: '/services/flights' },
                { name: 'Réservation d\'Hôtel', path: '/services/hotels' },
                { name: 'À Propos', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-northgascar-yellow transition-colors flex items-center"
                  >
                    <ArrowRight size={14} className="mr-1" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Informations de Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-northgascar-yellow" />
                <span className="text-gray-300">
                  Bureau North Gascar Tours, Antananarivo, Madagascar
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-northgascar-yellow" />
                <a href="tel:+261320500999" className="text-gray-300 hover:text-northgascar-yellow transition-colors">
                  +261 32 050 09 99
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-northgascar-yellow" />
                <a href="mailto:info@northgascartours.com" className="text-gray-300 hover:text-northgascar-yellow transition-colors">
                  info@northgascartours.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">S'abonner à la Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Restez informé de nos dernières offres et circuits
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Votre adresse email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-northgascar-yellow hover:bg-northgascar-yellow/80 text-northgascar-navy font-medium">
                S'abonner
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} North Gascar Tours. Tous droits réservés.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-northgascar-yellow text-sm">
                Politique de Confidentialité
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-northgascar-yellow text-sm">
                Conditions d'Utilisation
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-northgascar-yellow text-sm">
                Plan du Site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
