
import React, { useEffect, useState } from 'react';
import HeroCarousel from './HeroCarousel';
import HeroSearch from './HeroSearch';
import { HeroProps } from './HeroProps';
import { usePhotos } from '@/hooks/usePhotos';

const Hero: React.FC<HeroProps> = ({
  title = "Excursions personnalisées dans le nord de Madagascar",
  subtitle = "Vivez l'expérience d'une biodiversité unique et de paysages à couper le souffle avec nos guides locaux experts",
  showSearch = true,
  backgroundImage,
  height = "h-screen"
}) => {
  const { photos, loading } = usePhotos('banner');
  const [bannerImages, setBannerImages] = useState<string[]>([]);

  // Images par défaut si aucune photo n'est disponible dans la base de données
  const defaultImages = [
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21", // plage, vagues
    "https://images.unsplash.com/photo-1518877593221-1f28583780b4", // baleine
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb", // rivière et forêt
    "https://images.unsplash.com/photo-1500673922987-e212871fec22", // forêt et lac
    "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151", // dunes de sable
  ];

  useEffect(() => {
    // Si des photos bannières sont disponibles depuis la BDD, les utiliser
    if (photos && photos.length > 0) {
      const activePhotos = photos.filter(photo => photo.active);
      if (activePhotos.length > 0) {
        setBannerImages(activePhotos.map(photo => photo.url));
      } else {
        setBannerImages(defaultImages);
      }
    } else {
      setBannerImages(defaultImages);
    }
  }, [photos]);

  return (
    <div 
      className={`relative ${height} flex items-center overflow-hidden`}
    >
      <HeroCarousel images={bannerImages} backgroundImage={backgroundImage} />
      
      <div className="container mx-auto px-4 z-10 text-center md:text-left">
        <h1 
          className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 max-w-3xl animate-fade-in"
        >
          {title}
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8 animation-delay-300 animate-fade-in">
          {subtitle}
        </p>
        
        {showSearch && <HeroSearch />}
      </div>
    </div>
  );
};

export default Hero;
