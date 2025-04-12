
import { useState, useEffect } from 'react';
import { usePhotos } from './usePhotos';

export const useCatamaranData = () => {
  // Récupérer les photos de catamaran depuis la base de données
  const { photos: catamaranPhotos } = usePhotos('catamaran');
  const { photos: bannerPhotos } = usePhotos('banner');

  // État pour les données
  const [cruiseOptions, setCruiseOptions] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [catamarans, setCatamarans] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Exemple de données
  useEffect(() => {
    // Simulation d'un appel API avec délai
    const fetchData = async () => {
      setLoading(true);
      try {
        // Attendre pour simuler un appel à une API
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Données des croisières
        setCruiseOptions([
          {
            id: 'cruise-1',
            title: 'Croisière aux Îles Mitsio',
            location: 'Nosy Be',
            duration: '5 jours',
            description: 'Explorez les magnifiques îles Mitsio en catamaran de luxe.',
            price: 1200,
            image: catamaranPhotos.length > 0 ? catamaranPhotos[0].url : 'https://images.unsplash.com/photo-1548574505-12caf0050b5b',
            rating: 4.8,
          },
          {
            id: 'cruise-2',
            title: 'Excursion à Nosy Iranja',
            location: 'Nosy Be',
            duration: '3 jours',
            description: 'Découvrez l\'île paradisiaque de Nosy Iranja et ses plages de sable blanc.',
            price: 850,
            image: catamaranPhotos.length > 1 ? catamaranPhotos[1].url : 'https://images.unsplash.com/photo-1576778391425-7a5e9eea4ea3',
            rating: 4.6,
          },
          {
            id: 'cruise-3',
            title: 'L\'Archipel des Radama',
            location: 'Nosy Be',
            duration: '7 jours',
            description: 'Une semaine complète à explorer l\'archipel des Radama, avec snorkeling et plongée.',
            price: 1600,
            image: catamaranPhotos.length > 2 ? catamaranPhotos[2].url : 'https://images.unsplash.com/photo-1543744418-29fce95b2c3e',
            rating: 4.9,
          },
          {
            id: 'cruise-4',
            title: 'Croisière autour de Sainte-Marie',
            location: 'Sainte-Marie',
            duration: '6 jours',
            description: 'Explorez l\'île de Sainte-Marie, connue pour l\'observation des baleines.',
            price: 1350,
            image: catamaranPhotos.length > 3 ? catamaranPhotos[3].url : 'https://images.unsplash.com/photo-1545168599-847ebaee1414',
            rating: 4.7,
          },
        ]);
        
        // Destinations
        setDestinations([
          {
            id: 'dest-1',
            name: 'Nosy Be',
            description: 'L\'île aux parfums, connue pour ses plages et sa biodiversité marine.',
            image: bannerPhotos.length > 0 ? bannerPhotos[0].url : 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c',
          },
          {
            id: 'dest-2',
            name: 'Nosy Iranja',
            description: 'Surnommée l\'île aux tortues, avec une langue de sable qui apparaît à marée basse.',
            image: bannerPhotos.length > 1 ? bannerPhotos[1].url : 'https://images.unsplash.com/photo-1526786220381-1d21eedf92bf',
          },
          {
            id: 'dest-3',
            name: 'Archipel des Mitsio',
            description: 'Un groupe d\'îles offrant des plages vierges et des sites de plongée exceptionnels.',
            image: bannerPhotos.length > 2 ? bannerPhotos[2].url : 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d',
          },
          {
            id: 'dest-4',
            name: 'Sainte-Marie',
            description: 'Une île paradisiaque où observer les baleines à bosse.',
            image: bannerPhotos.length > 3 ? bannerPhotos[3].url : 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a',
          },
        ]);
        
        // Catamarans
        setCatamarans([
          {
            id: 'cat-1',
            name: 'Lagoon 42',
            capacity: 8,
            cabins: 4,
            description: 'Un catamaran spacieux et confortable pour des croisières en groupe.',
            features: ['Cuisine équipée', 'Climatisation', 'Générateur', 'Équipement de snorkeling'],
            image: catamaranPhotos.length > 0 ? catamaranPhotos[0].url : 'https://images.unsplash.com/photo-1575132736995-9b00aa27a507',
          },
          {
            id: 'cat-2',
            name: 'Fountain Pajot 45',
            capacity: 10,
            cabins: 5,
            description: 'Notre catamaran le plus luxueux, idéal pour les familles ou groupes.',
            features: ['Plateforme de baignade', 'Kayaks', 'Paddle boards', 'Wi-Fi'],
            image: catamaranPhotos.length > 1 ? catamaranPhotos[1].url : 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166',
          },
          {
            id: 'cat-3',
            name: 'Bali 4.1',
            capacity: 8,
            cabins: 4,
            description: 'Un catamaran moderne avec un flybridge spacieux pour des vues panoramiques.',
            features: ['Flybridge', 'Salon extérieur', 'Douche extérieure', 'Bimini'],
            image: catamaranPhotos.length > 2 ? catamaranPhotos[2].url : 'https://images.unsplash.com/photo-1548574505-5e239809ee19',
          },
        ]);
        
        // Expériences
        setExperiences([
          {
            id: 'exp-1',
            title: 'Plongée & Snorkeling',
            description: 'Découvrez des récifs coralliens préservés et une vie marine abondante.',
            image: catamaranPhotos.length > 3 ? catamaranPhotos[3].url : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
          },
          {
            id: 'exp-2',
            title: 'Pêche Sportive',
            description: 'Essayez-vous à la pêche au gros dans les eaux riches de Madagascar.',
            image: catamaranPhotos.length > 4 ? catamaranPhotos[4].url : 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
          },
          {
            id: 'exp-3',
            title: 'Observation des Baleines',
            description: 'De juin à septembre, observez les baleines à bosse lors de leur migration.',
            image: bannerPhotos.length > 1 ? bannerPhotos[1].url : 'https://images.unsplash.com/photo-1518877593221-1f28583780b4',
          },
          {
            id: 'exp-4',
            title: 'Excursion sur les Îles',
            description: 'Visitez des villages de pêcheurs traditionnels et explorez des îles sauvages.',
            image: bannerPhotos.length > 2 ? bannerPhotos[2].url : 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef',
          },
        ]);
        
      } catch (error) {
        console.error('Error fetching catamaran data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [catamaranPhotos, bannerPhotos]);

  return {
    cruiseOptions,
    destinations,
    catamarans,
    experiences,
    loading,
    // Ajouter les photos pour être réutilisées
    bannerPhotos
  };
};
