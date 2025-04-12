
import React from 'react';
import HeroSection from '@/components/services/catamaran/HeroSection';
import SearchForm from '@/components/services/catamaran/SearchForm';
import CruisesList from '@/components/services/catamaran/CruisesList';
import CatamaransList from '@/components/services/catamaran/CatamaransList';
import InfoTabs from '@/components/services/catamaran/InfoTabs';
import CallToAction from '@/components/services/catamaran/CallToAction';
import { useCatamaranData } from '@/hooks/useCatamaranData';

const CatamaranCruise = () => {
  const { cruiseOptions, destinations, catamarans, experiences, heroImages } = useCatamaranData();

  return (
    <>
      <HeroSection heroImages={heroImages} />

      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <SearchForm />
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Croisières en Catamaran</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez Madagascar autrement avec nos croisières exclusives en catamaran
            </p>
          </div>
          
          <CruisesList cruises={cruiseOptions} />
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Catamarans</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des embarcations de luxe pour une expérience inoubliable
            </p>
          </div>
          
          <CatamaransList catamarans={catamarans} />
        </div>
      </section>
      
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <InfoTabs destinations={destinations} experiences={experiences} />
        </div>
      </section>
      
      <section className="py-16 px-4">
        <CallToAction />
      </section>
    </>
  );
};

export default CatamaranCruise;
