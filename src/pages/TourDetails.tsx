
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { optimizeImageUrl } from '@/lib/imageOptimizer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Star, Calendar, ArrowLeft, Users, Tag } from 'lucide-react';
import { useTourQuery } from '@/hooks/useTourQuery';

const TourDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const { tour, isLoading, error } = useTourQuery(id);

  // Fallback data pour démonstration / développement
  const fallbackTour = useMemo(() => {
    const tours = [
      {
        id: '1',
        title: 'Circuit Allée des Baobabs',
        description: 'Découvrez l\'emblématique Allée des Baobabs, l\'un des sites les plus célèbres de Madagascar. Ce lieu magique offre un paysage unique au monde, notamment au coucher du soleil lorsque les baobabs séculaires se découpent sur le ciel rougeoyant. Le circuit comprend également la visite des villages environnants et une introduction à la culture locale. Un guide expérimenté vous accompagnera pour vous expliquer l\'histoire de ces arbres majestueux et leur importance dans l\'écosystème malgache.',
        location: 'Morondava',
        duration: '2 Jours',
        price: 299,
        rating: 4.9,
        image: optimizeImageUrl('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb'),
        featured: true,
        category: 'Nature',
        groupSize: '2-10 personnes',
        startDates: ['12 juin 2024', '25 juin 2024', '8 juillet 2024'],
        includes: ['Transport en 4x4', 'Guide francophone', 'Hébergement', 'Petits-déjeuners'],
        highlights: [
          'Coucher de soleil sur l\'Allée des Baobabs',
          'Visite du village de Kirindy',
          'Observation de la faune endémique'
        ]
      },
      {
        id: '2',
        title: 'Randonnée Lémuriens à Andasibe',
        description: 'Randonnez à travers le Parc National d\'Andasibe et rencontrez différentes espèces de lémuriens dans leur habitat naturel. Ce parc abrite notamment le plus grand lémurien du monde : l\'Indri Indri, connu pour son cri caractéristique qui résonne dans toute la forêt. Au cours de cette excursion, vous découvrirez également une flore exceptionnelle avec des orchidées rares et des plantes médicinales utilisées par les communautés locales. Les sentiers bien aménagés vous permettront d\'explorer la forêt humide dans les meilleures conditions.',
        location: 'Andasibe',
        duration: '3 Jours',
        price: 349,
        rating: 4.8,
        image: optimizeImageUrl('https://images.unsplash.com/photo-1472396961693-142e6e269027'),
        featured: true,
        category: 'Faune',
        groupSize: '2-8 personnes',
        startDates: ['5 juin 2024', '19 juin 2024', '3 juillet 2024'],
        includes: ['Transfert depuis Antananarivo', 'Guide naturaliste', 'Hébergement', 'Tous les repas'],
        highlights: [
          'Observation des lémuriens Indri Indri',
          'Promenade nocturne pour voir les espèces nocturnes',
          'Visite du village d\'Andasibe'
        ]
      },
    ];
    
    return tours.find(t => t.id === id) || tours[0];
  }, [id]);
  
  const tourData = tour || fallbackTour;
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 pt-20">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-6 pt-20">
        <h2 className="text-xl font-bold mb-4">Une erreur est survenue</h2>
        <p className="mb-4">Impossible de charger les détails du circuit.</p>
        <Button asChild variant="outline">
          <Link to="/tours">
            <ArrowLeft className="mr-2" />
            Retour aux circuits
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Ajout de marge supérieure pour éviter le chevauchement avec le nav */}
      <div className="mt-16 md:mt-6">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/tours">
            <ArrowLeft className="mr-2" />
            Retour aux circuits
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image et informations principales */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{tourData.title}</h1>
            
            <div className="relative rounded-lg overflow-hidden h-80 mb-6">
              <img 
                src={tourData.image} 
                alt={tourData.title} 
                className="w-full h-full object-cover"
              />
              {tourData.featured && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-black font-semibold px-3 py-1 rounded-full">
                  Populaire
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-5 w-5 text-madagascar-green" />
                {tourData.location}
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-5 w-5 text-madagascar-green" />
                {tourData.duration}
              </div>
              <div className="flex items-center text-sm">
                <Star className="mr-2 h-5 w-5 text-yellow-500" />
                {tourData.rating}/5
              </div>
              <div className="flex items-center text-sm">
                <Users className="mr-2 h-5 w-5 text-madagascar-green" />
                {tourData.groupSize || '2-12 personnes'}
              </div>
              <div className="flex items-center text-sm">
                <Tag className="mr-2 h-5 w-5 text-madagascar-green" />
                {tourData.category}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground">{tourData.description}</p>
            </div>
            
            {tourData.highlights && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Points forts</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {tourData.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Réservation et informations complémentaires */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-6">€{tourData.price} <span className="text-base font-normal text-muted-foreground">/ personne</span></div>
                
                {tourData.startDates && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Calendar className="mr-2 h-5 w-5" /> Dates de départ
                    </h3>
                    <div className="space-y-2">
                      {tourData.startDates.map((date, index) => (
                        <div 
                          key={index}
                          className="border rounded-md p-3 cursor-pointer hover:border-madagascar-green transition-colors"
                        >
                          {date}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {tourData.includes && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Ce qui est inclus</h3>
                    <ul className="space-y-2">
                      {tourData.includes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Button className="w-full">Réserver maintenant</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
