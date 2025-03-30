
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
    <footer className="bg-madagascar-blue text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Logo variant="white" />
            <p className="text-gray-300 mt-4">
              Discover the wonders of Madagascar with North Gascar Tours. Expert guides, unforgettable adventures, and sustainable tourism practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-madagascar-yellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-madagascar-yellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-madagascar-yellow transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-madagascar-yellow transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Tours & Excursions', path: '/tours' },
                { name: 'Car Rental', path: '/services/car-rental' },
                { name: 'Flight Booking', path: '/services/flights' },
                { name: 'Hotel Booking', path: '/services/hotels' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-madagascar-yellow transition-colors flex items-center"
                  >
                    <ArrowRight size={14} className="mr-1" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-madagascar-yellow" />
                <span className="text-gray-300">
                  North Gascar Tours Office, Antananarivo, Madagascar
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-madagascar-yellow" />
                <a href="tel:+261320500999" className="text-gray-300 hover:text-madagascar-yellow transition-colors">
                  +261 32 050 09 99
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-madagascar-yellow" />
                <a href="mailto:info@northgascartours.com" className="text-gray-300 hover:text-madagascar-yellow transition-colors">
                  info@northgascartours.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Subscribe to Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest offers and tours
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-madagascar-yellow hover:bg-madagascar-yellow/80 text-madagascar-blue font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} North Gascar Tours. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-madagascar-yellow text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-madagascar-yellow text-sm">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-madagascar-yellow text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
