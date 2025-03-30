
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeroProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  backgroundImage?: string;
  height?: string;
}

// Les différents effets de transition possibles
const transitionEffects = [
  "fade", // fondu simple
  "zoom", // zoom avant
  "slide-left", // glissement de gauche à droite
  "slide-right", // glissement de droite à gauche
  "slide-up", // glissement de bas en haut
  "zoom-fade" // combinaison de zoom et fondu
];

const Hero: React.FC<HeroProps> = ({
  title = "Excursions personnalisées dans le nord de Madagascar",
  subtitle = "Vivez l'expérience d'une biodiversité unique et de paysages à couper le souffle avec nos guides locaux experts",
  showSearch = true,
  backgroundImage,
  height = "h-screen"
}) => {
  const natureImages = [
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21", // plage, vagues
    "https://images.unsplash.com/photo-1518877593221-1f28583780b4", // baleine
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb", // rivière et forêt
    "https://images.unsplash.com/photo-1500673922987-e212871fec22", // forêt et lac
    "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151", // dunes de sable
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(-1);
  const [currentEffect, setCurrentEffect] = useState("fade");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dronePosition, setDronePosition] = useState({ x: 0, y: 0, scale: 1.05 });

  // Effet de drone caméra - mouvement plus rapide
  useEffect(() => {
    const droneMoveInterval = setInterval(() => {
      setDronePosition({
        x: Math.sin(Date.now() / 7000) * 2.2, // Mouvement horizontal plus rapide (était 10000 * 1.5)
        y: Math.cos(Date.now() / 8000) * 2.2, // Mouvement vertical plus rapide (était 12000 * 1.5)
        scale: 1.05 + (Math.sin(Date.now() / 6000) * 0.015), // Zoom légèrement plus prononcé (était 8000 * 0.01)
      });
    }, 40); // Mise à jour plus fréquente pour un mouvement plus fluide (était 50)

    return () => clearInterval(droneMoveInterval);
  }, []);

  // Effet de transition d'image
  useEffect(() => {
    const interval = setInterval(() => {
      // Choisir un nouvel effet de transition aléatoire
      const newEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
      setCurrentEffect(newEffect);
      
      // Mettre à jour les indices d'image et déclencher la transition
      setPreviousImageIndex(currentImageIndex);
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % natureImages.length);
        setIsTransitioning(false);
      }, 1200); // Durée de transition reste la même pour permettre une transition complète
      
    }, 10000); // Changement d'image toutes les 10 secondes

    return () => clearInterval(interval);
  }, [currentImageIndex, natureImages.length]);

  const currentImage = backgroundImage || natureImages[currentImageIndex];
  const previousImage = previousImageIndex >= 0 ? natureImages[previousImageIndex] : currentImage;

  // Classes CSS pour les différents effets de transition
  const getTransitionClasses = () => {
    switch (currentEffect) {
      case "zoom":
        return "transform-origin-center transition-transform duration-1800 scale-110"; // Un peu plus rapide
      case "slide-left":
        return "translate-x-full transition-transform duration-1200"; // Un peu plus rapide
      case "slide-right":
        return "-translate-x-full transition-transform duration-1200"; // Un peu plus rapide
      case "slide-up":
        return "translate-y-full transition-transform duration-1200"; // Un peu plus rapide
      case "zoom-fade":
        return "scale-110 opacity-0 transition-all duration-1800"; // Un peu plus rapide
      case "fade":
      default:
        return "opacity-0 transition-opacity duration-1200"; // Un peu plus rapide
    }
  };

  return (
    <div 
      className={`relative ${height} flex items-center overflow-hidden`}
    >
      {/* Couche d'image précédente avec effet drone */}
      <div 
        className={`absolute inset-0 w-full h-full transition-all duration-1500 ${isTransitioning ? getTransitionClasses() : ''}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${previousImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${dronePosition.scale}) translate(${dronePosition.x}%, ${dronePosition.y}%)`,
          transition: 'transform 2s ease-out',
        }}
      />
      
      {/* Couche d'image actuelle avec effet drone */}
      <div 
        className={`absolute inset-0 w-full h-full ${isTransitioning ? 'opacity-100' : 'opacity-100'} transition-all duration-1500`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${currentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${dronePosition.scale}) translate(${dronePosition.x}%, ${dronePosition.y}%)`,
          transition: 'transform 2s ease-out',
          zIndex: isTransitioning ? 0 : 1,
        }}
      />
      
      <div className="absolute bottom-4 right-4 z-20">
        <div className="flex gap-2">
          {natureImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-northgascar-teal' : 'bg-white/50'
              } transition-all duration-300`}
              onClick={() => {
                setPreviousImageIndex(currentImageIndex);
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentImageIndex(index);
                  setIsTransitioning(false);
                }, 1200);
                setCurrentEffect(transitionEffects[Math.floor(Math.random() * transitionEffects.length)]);
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center md:text-left">
        <h1 
          className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 max-w-3xl animate-fade-in"
        >
          {title}
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8 animation-delay-300 animate-fade-in">
          {subtitle}
        </p>
        
        {showSearch && (
          <div className="bg-white/90 dark:bg-northgascar-navy/90 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg max-w-4xl mx-auto md:mx-0 animation-delay-600 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
                <Input 
                  placeholder="Où aller?" 
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
                <Select>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Sélectionner une date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coming-week">Semaine à venir</SelectItem>
                    <SelectItem value="next-month">Mois prochain</SelectItem>
                    <SelectItem value="custom">Date personnalisée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
                <Select>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Voyageurs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Personne</SelectItem>
                    <SelectItem value="2">2 Personnes</SelectItem>
                    <SelectItem value="3+">3+ Personnes</SelectItem>
                    <SelectItem value="group">Groupe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-northgascar-teal hover:bg-northgascar-teal/80 text-white h-10">
                <Search className="mr-2" size={18} />
                Rechercher
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
