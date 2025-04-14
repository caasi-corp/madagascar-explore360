
import { Tour } from '@/lib/db/schema';

export const tours: Tour[] = [
  {
    id: '1',
    title: 'Circuit Allée des Baobabs',
    description: 'Découvrez l\'emblématique Allée des Baobabs, l\'un des sites les plus célèbres de Madagascar.',
    location: 'Morondava',
    duration: '2 Jours',
    price: 299,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    featured: true,
    category: 'Nature',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Randonnée Lémuriens à Andasibe',
    description: 'Randonnez à travers le Parc National d\'Andasibe et rencontrez différentes espèces de lémuriens dans leur habitat naturel.',
    location: 'Andasibe',
    duration: '3 Jours',
    price: 349,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    featured: true,
    category: 'Faune',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Aventure au Parc National de l\'Isalo',
    description: 'Découvrez les paysages époustouflants du Parc National de l\'Isalo avec ses canyons, cascades et piscines naturelles.',
    location: 'Isalo',
    duration: '4 Jours',
    price: 499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
    featured: true,
    category: 'Aventure',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Paradis de l\'île de Nosy Be',
    description: 'Détendez-vous sur les magnifiques plages de Nosy Be, la principale destination balnéaire de Madagascar.',
    location: 'Nosy Be',
    duration: '5 Jours',
    price: 599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
    featured: false,
    category: 'Plage',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Expédition au Parc National de Ranomafana',
    description: 'Explorez les forêts luxuriantes de Ranomafana et observez des espèces rares de lémuriens, d\'oiseaux et de caméléons.',
    location: 'Ranomafana',
    duration: '3 Jours',
    price: 389,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a',
    featured: false,
    category: 'Faune',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Randonnée dans le Tsingy de Bemaraha',
    description: 'Parcourez les spectaculaires formations calcaires du Parc National du Tsingy de Bemaraha.',
    location: 'Bemaraha',
    duration: '4 Jours',
    price: 649,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1504623953583-4ae307ea839f',
    featured: false,
    category: 'Aventure',
    active: true,
    created_at: new Date().toISOString()
  },
];

export const categories = ['Nature', 'Faune', 'Aventure', 'Plage', 'Culture', 'Photographie'];
export const durations = ['1-2 Jours', '3-5 Jours', '6-10 Jours', '10+ Jours'];
