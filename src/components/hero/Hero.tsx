
import React from 'react';
import HeroCarousel from './HeroCarousel';
import HeroSearch from './HeroSearch';
import { HeroProps } from './HeroProps';

const Hero: React.FC<HeroProps> = ({
  title = "Excursions personnalisées dans le nord de Madagascar",
  subtitle = "Vivez l'expérience d'une biodiversité unique et de paysages à couper le souffle avec nos guides locaux experts",
  showSearch = true,
  backgroundImage = "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
  height = "h-screen"
}) => {
  return (
    <div 
      className={`relative ${height} flex items-center overflow-hidden`}
    >
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <h1 
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Excursions personnalisées dans le nord de Madagascar
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8">
            Vivez l'expérience d'une biodiversité unique et de paysages à couper le souffle avec nos guides locaux experts
          </p>
        </div>
        
        {showSearch && <HeroSearch />}
      </div>
    </div>
  );
};

export default Hero;
