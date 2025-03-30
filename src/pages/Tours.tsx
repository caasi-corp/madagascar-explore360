import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import TourCard, { TourProps } from '@/components/TourCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Filter, Search, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';

const Tours = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [50, 800],
    duration: '',
    categories: [] as string[],
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Sample tour data
  const tours: TourProps[] = [
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
    },
  ];

  const categories = ['Nature', 'Faune', 'Aventure', 'Plage', 'Culture', 'Photographie'];
  const durations = ['1-2 Jours', '3-5 Jours', '6-10 Jours', '10+ Jours'];

  const handlePriceRangeChange = (values: number[]) => {
    setFilters({ ...filters, priceRange: values });
  };

  const handleDurationChange = (value: string) => {
    setFilters({ ...filters, duration: value });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, categories: [...filters.categories, category] });
    } else {
      setFilters({ ...filters, categories: filters.categories.filter(c => c !== category) });
    }
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [50, 800],
      duration: '',
      categories: [],
    });
    setSelectedDate(undefined);
  };

  const filteredTours = tours.filter(tour => {
    if (searchTerm && !tour.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !tour.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !tour.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (tour.price < filters.priceRange[0] || tour.price > filters.priceRange[1]) {
      return false;
    }
    
    if (filters.categories.length > 0 && !filters.categories.includes(tour.category || '')) {
      return false;
    }
    
    if (filters.duration) {
      const tourDays = parseInt(tour.duration.split(' ')[0]);
      
      if (filters.duration === '1-2 Jours' && tourDays > 2) return false;
      if (filters.duration === '3-5 Jours' && (tourDays < 3 || tourDays > 5)) return false;
      if (filters.duration === '6-10 Jours' && (tourDays < 6 || tourDays > 10)) return false;
      if (filters.duration === '10+ Jours' && tourDays <= 10) return false;
    }
    
    return true;
  });

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <Layout>
      <Hero 
        title="Découvrez Nos Circuits"
        subtitle="Explorez l'incroyable biodiversité, les paysages magnifiques et la culture unique de Madagascar"
        showSearch={false}
        height="min-h-[40vh]"
        backgroundImage="https://images.unsplash.com/photo-1504623953583-4ae307ea839f"
      />
      
      <div className="section-padding">
        <div className="container mx-auto">
          <div className="bg-card rounded-lg shadow-md p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Rechercher circuits, lieux..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-shrink-0">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Sélectionner une date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="p-3 pointer-events-auto"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Button 
                  variant={isFilterOpen ? "default" : "outline"} 
                  onClick={toggleFilters}
                  className="flex-shrink-0"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filtres
                </Button>
              </div>
            </div>
            
            {isFilterOpen && (
              <div className="mt-4 pt-4 border-t animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filtres</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
                    <X size={14} className="mr-1" /> Réinitialiser
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Fourchette de Prix</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={filters.priceRange}
                        min={50}
                        max={800}
                        step={10}
                        value={filters.priceRange}
                        onValueChange={handlePriceRangeChange}
                        className="my-6"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{filters.priceRange[0]} €</span>
                        <span>{filters.priceRange[1]} €</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Durée</h4>
                    <RadioGroup value={filters.duration} onValueChange={handleDurationChange}>
                      {durations.map((duration) => (
                        <div key={duration} className="flex items-center space-x-2">
                          <RadioGroupItem value={duration} id={duration} />
                          <Label htmlFor={duration} className="text-sm">{duration}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Catégories</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={category} 
                            checked={filters.categories.includes(category)}
                            onCheckedChange={(checked) => handleCategoryChange(category, checked === true)}
                          />
                          <label 
                            htmlFor={category}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredTours.length} {filteredTours.length === 1 ? 'Circuit' : 'Circuits'} Disponible{filteredTours.length > 1 ? 's' : ''}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
            
            {filteredTours.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">Aucun circuit trouvé</h3>
                <p className="text-muted-foreground mb-6">Essayez d'ajuster vos filtres ou critères de recherche.</p>
                <Button onClick={resetFilters} variant="outline">Réinitialiser les filtres</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tours;
