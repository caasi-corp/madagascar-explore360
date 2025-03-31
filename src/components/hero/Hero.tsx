
import React from 'react';
import HeroCarousel from './HeroCarousel';
import HeroSearch from './HeroSearch';
import { HeroProps } from './HeroProps';
import { useBreakpoint } from '@/hooks/use-mobile';

const Hero: React.FC<HeroProps> = ({
  title = "Excursions personnalisées dans le nord de Madagascar",
  subtitle = "Vivez l'expérience d'une biodiversité unique et de paysages à couper le souffle avec nos guides locaux experts",
  showSearch = true,
  backgroundImage,
  height = "h-screen"
}) => {
  const { isMobile } = useBreakpoint();
  
  const natureImages = [
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21", // plage, vagues
    "https://images.unsplash.com/photo-1518877593221-1f28583780b4", // baleine
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb", // rivière et forêt
    "https://images.unsplash.com/photo-1500673922987-e212871fec22", // forêt et lac
    "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151", // dunes de sable
  ];

  return (
    <div 
      className={`relative ${height} w-full flex items-center overflow-hidden`}
    >
      <HeroCarousel images={natureImages} backgroundImage={backgroundImage} />
      
      <div className="container mx-auto px-4 z-10 text-center md:text-left relative">
        <h1 
          className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 max-w-3xl animate-fade-in"
        >
          {title}
        </h1>
        <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mb-6 md:mb-8 animation-delay-300 animate-fade-in">
          {subtitle}
        </p>
        
        {showSearch && (
          <div className={`${isMobile ? 'mt-4' : 'mt-0'} w-full md:max-w-3xl`}>
            <HeroSearch />
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
