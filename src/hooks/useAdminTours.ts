
import { useState } from 'react';

export interface Tour {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
  featured: boolean;
  active: boolean;
}

export const useAdminTours = () => {
  const [tours, setTours] = useState<Tour[]>([
    { id: '1', name: 'Avenue des Baobabs', duration: 3, price: 599, category: 'Nature', featured: true, active: true },
    { id: '2', name: 'Trekking aux Lémuriens', duration: 2, price: 349, category: 'Aventure', featured: false, active: true },
    { id: '3', name: 'Parc National d\'Isalo', duration: 4, price: 499, category: 'Nature', featured: true, active: true },
    { id: '4', name: 'Île de Nosy Be', duration: 5, price: 699, category: 'Plage', featured: false, active: true },
    { id: '5', name: 'Tsingy de Bemaraha', duration: 4, price: 549, category: 'Aventure', featured: false, active: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    // Simule la suppression d'un circuit
    setTours(tours.filter(tour => tour.id !== id));
    return true;
  };

  const handleToggleStatus = (id: string) => {
    // Simule la modification du statut d'un circuit
    setTours(tours.map(tour => 
      tour.id === id ? { ...tour, active: !tour.active } : tour
    ));
  };

  const handleToggleFeatured = (id: string) => {
    // Simule la modification du statut mis en avant
    setTours(tours.map(tour => 
      tour.id === id ? { ...tour, featured: !tour.featured } : tour
    ));
  };

  const filteredTours = tours.filter(tour => 
    tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    tours,
    filteredTours,
    searchTerm,
    setSearchTerm,
    handleDelete,
    handleToggleStatus,
    handleToggleFeatured
  };
};
