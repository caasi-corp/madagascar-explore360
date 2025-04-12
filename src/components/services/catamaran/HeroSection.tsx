
import React from 'react';
import Hero from '@/components/hero/Hero';

interface HeroSectionProps {
  backgroundImage?: string;
  heroImages?: string[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ backgroundImage, heroImages }) => {
  return (
    <Hero
      title="Croisières en Catamaran à Madagascar"
      subtitle="Explorez les îles paradisiaques de Madagascar à bord de nos catamarans de luxe"
      showSearch={false}
      height="h-[60vh]"
      backgroundImage={backgroundImage}
      customImages={heroImages}
    />
  );
};

export default HeroSection;
