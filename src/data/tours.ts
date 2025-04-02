
import { TourProps } from "@/components/TourCard";

export const featuredTours: TourProps[] = [
  {
    id: "tour1",
    title: "Avenue des Baobabs",
    location: "Morondava",
    description: "Découvrez les majestueux baobabs de Madagascar au coucher du soleil",
    duration: "3 Jours",
    price: 299,
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    rating: 4.8,
    reviews: 124,
    featured: true,
    categories: ["Nature", "Photographie"]
  },
  {
    id: "tour2",
    title: "Trek dans l'Isalo",
    location: "Parc National de l'Isalo",
    description: "Une randonnée mémorable à travers des formations rocheuses spectaculaires",
    duration: "5 Jours",
    price: 499,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    rating: 4.9,
    reviews: 89,
    featured: true,
    categories: ["Aventure", "Randonnée"]
  },
  {
    id: "tour3",
    title: "Plages de Nosy Be",
    location: "Nosy Be",
    description: "Détendez-vous sur les plages paradisiaques de l'île aux parfums",
    duration: "7 Jours",
    price: 799,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    rating: 4.7,
    reviews: 156,
    featured: true,
    categories: ["Plage", "Détente"]
  },
  {
    id: "tour4",
    title: "Tsingy de Bemaraha",
    location: "Parc National de Bemaraha",
    description: "Explorez ce labyrinthe de formations karstiques unique au monde",
    duration: "6 Jours",
    price: 649,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    rating: 5.0,
    reviews: 72,
    featured: true,
    categories: ["Aventure", "UNESCO"]
  }
];
