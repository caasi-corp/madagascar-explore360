
import { useMemo } from 'react';
import { optimizeImageUrl } from '@/lib/imageOptimizer';

export const useTourData = (id: string | undefined, tour: any) => {
  // Fallback data for demonstration/development purposes
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
  
  return tour || fallbackTour;
};
