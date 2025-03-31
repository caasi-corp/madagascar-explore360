
import React from 'react';
import Hero from '@/components/Hero';
import FlightSearchForm from '@/components/flights/FlightSearchForm';
import AirlinePartnersList from '@/components/flights/AirlinePartnersList';
import PopularDestinations from '@/components/flights/PopularDestinations';

const FlightBooking = () => {
  const airlines = [
    {
      id: 1,
      name: "Air Madagascar",
      logo: "/lovable-uploads/f8c8f079-7776-45ac-a077-6570cfbb7fcf.png",
      destinations: ["Antananarivo", "Nosy Be", "Toamasina", "Antsiranana"]
    },
    {
      id: 2,
      name: "Air France",
      logo: "/lovable-uploads/f8c8f079-7776-45ac-a077-6570cfbb7fcf.png",
      destinations: ["Paris", "Antananarivo", "Reunion"]
    },
    {
      id: 3,
      name: "Ethiopian Airlines",
      logo: "/lovable-uploads/f8c8f079-7776-45ac-a077-6570cfbb7fcf.png",
      destinations: ["Addis Ababa", "Antananarivo", "Nosy Be"]
    },
    {
      id: 4,
      name: "Kenya Airways",
      logo: "/lovable-uploads/f8c8f079-7776-45ac-a077-6570cfbb7fcf.png",
      destinations: ["Nairobi", "Antananarivo"]
    }
  ];
  
  const destinations = [
    {
      name: "Antananarivo",
      image: "https://images.unsplash.com/photo-1562523331-9ddcaeda6477",
      description: "La capitale dynamique et historique de Madagascar"
    },
    {
      name: "Nosy Be",
      image: "https://images.unsplash.com/photo-1590523278191-304df6c77268",
      description: "L'île parfumée avec ses plages paradisiaques"
    },
    {
      name: "Toamasina",
      image: "https://images.unsplash.com/photo-1465447142348-e9952c393450",
      description: "Le principal port maritime de Madagascar"
    },
    {
      name: "Antsiranana",
      image: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c",
      description: "L'extrême nord de Madagascar avec sa baie spectaculaire"
    }
  ];

  return (
    <>
      <Hero
        title="Réservation de Vols pour Madagascar"
        subtitle="Trouvez les meilleurs tarifs pour vos vols internationaux et domestiques"
        showSearch={false}
        height="h-[60vh]"
        backgroundImage="https://images.unsplash.com/photo-1494059980473-813e73ee784b"
      />

      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <FlightSearchForm />
          <AirlinePartnersList airlines={airlines} />
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <PopularDestinations destinations={destinations} />
        </div>
      </section>
    </>
  );
};

export default FlightBooking;
