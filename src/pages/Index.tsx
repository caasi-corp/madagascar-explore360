
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import FeaturedToursSection from '@/components/sections/FeaturedToursSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import CallToAction from '@/components/sections/CallToAction';
import { useHotels } from '@/hooks/useHotels';
import { useFlights } from '@/hooks/useFlights';
import HotelCard from '@/components/hotels/HotelCard';
import FlightCard from '@/components/flights/FlightCard';
import { Hotel, Flight } from '@/lib/db/schema';

const Index: React.FC = () => {
  const { hotels } = useHotels();
  const { flights } = useFlights();

  // Filtrer les hôtels recommandés (par exemple, ceux avec 4 ou 5 étoiles)
  const recommendedHotels = hotels
    .filter(hotel => hotel.stars >= 4)
    .slice(0, 3);

  // Obtenir les vols les plus proches
  const upcomingFlights = flights
    .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())
    .slice(0, 2);

  return (
    <>
      <Hero />
      <FeaturedToursSection />
      <ServicesSection />
      
      {/* Section Hôtels Recommandés */}
      {recommendedHotels.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Hôtels recommandés</h2>
                <p className="text-muted-foreground">
                  Découvrez nos hôtels partenaires pour un séjour confortable à Madagascar
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4 md:mt-0">
                <Link to="/hotels">Voir tous les hôtels</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedHotels.map((hotel: Hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Section Vols */}
      {upcomingFlights.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Prochains vols disponibles</h2>
                <p className="text-muted-foreground">
                  Réservez votre vol pour Madagascar ou entre les villes malgaches
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4 md:mt-0">
                <Link to="/flights">Voir tous les vols</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingFlights.map((flight: Flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      <AdvantagesSection />
      <CallToAction />
    </>
  );
};

export default Index;
