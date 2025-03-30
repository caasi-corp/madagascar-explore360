
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
      title: 'Avenue of the Baobabs Tour',
      description: 'Experience the iconic Avenue of the Baobabs, one of Madagascar\'s most famous landmarks.',
      location: 'Morondava',
      duration: '2 Days',
      price: 299,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      featured: true,
      category: 'Nature',
    },
    {
      id: '2',
      title: 'Lemur Trekking in Andasibe',
      description: 'Trek through the Andasibe National Park and encounter various species of lemurs in their natural habitat.',
      location: 'Andasibe',
      duration: '3 Days',
      price: 349,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      featured: true,
      category: 'Wildlife',
    },
    {
      id: '3',
      title: 'Isalo National Park Adventure',
      description: 'Discover the stunning landscapes of Isalo National Park with its canyons, waterfalls and natural pools.',
      location: 'Isalo',
      duration: '4 Days',
      price: 499,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
      featured: true,
      category: 'Adventure',
    },
    {
      id: '4',
      title: 'Nosy Be Island Paradise',
      description: 'Relax on the beautiful beaches of Nosy Be, Madagascar\'s premier beach destination.',
      location: 'Nosy Be',
      duration: '5 Days',
      price: 599,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
      featured: false,
      category: 'Beach',
    },
    {
      id: '5',
      title: 'Ranomafana National Park Expedition',
      description: 'Explore the lush rainforests of Ranomafana and spot rare species of lemurs, birds and chameleons.',
      location: 'Ranomafana',
      duration: '3 Days',
      price: 389,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a',
      featured: false,
      category: 'Wildlife',
    },
    {
      id: '6',
      title: 'Tsingy de Bemaraha Trek',
      description: 'Journey through the spectacular limestone formations of the Tsingy de Bemaraha National Park.',
      location: 'Bemaraha',
      duration: '4 Days',
      price: 649,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1504623953583-4ae307ea839f',
      featured: false,
      category: 'Adventure',
    },
  ];

  const categories = ['Nature', 'Wildlife', 'Adventure', 'Beach', 'Cultural', 'Photography'];
  const durations = ['1-2 Days', '3-5 Days', '6-10 Days', '10+ Days'];

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

  // Filter tours based on current filters
  const filteredTours = tours.filter(tour => {
    // Search term filter
    if (searchTerm && !tour.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !tour.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !tour.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Price range filter
    if (tour.price < filters.priceRange[0] || tour.price > filters.priceRange[1]) {
      return false;
    }
    
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(tour.category || '')) {
      return false;
    }
    
    // Duration filter
    if (filters.duration) {
      const tourDays = parseInt(tour.duration.split(' ')[0]);
      
      if (filters.duration === '1-2 Days' && tourDays > 2) return false;
      if (filters.duration === '3-5 Days' && (tourDays < 3 || tourDays > 5)) return false;
      if (filters.duration === '6-10 Days' && (tourDays < 6 || tourDays > 10)) return false;
      if (filters.duration === '10+ Days' && tourDays <= 10) return false;
    }
    
    return true;
  });

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <Layout>
      <Hero 
        title="Discover Our Tours"
        subtitle="Explore Madagascar's incredible biodiversity, stunning landscapes and unique culture"
        showSearch={false}
        height="min-h-[40vh]"
        backgroundImage="https://images.unsplash.com/photo-1504623953583-4ae307ea839f"
      />
      
      <div className="section-padding">
        <div className="container mx-auto">
          {/* Search and Filter Bar */}
          <div className="bg-card rounded-lg shadow-md p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Search tours, locations..."
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
                      {selectedDate ? format(selectedDate, 'PPP') : 'Select Date'}
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
                  Filters
                </Button>
              </div>
            </div>
            
            {isFilterOpen && (
              <div className="mt-4 pt-4 border-t animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
                    <X size={14} className="mr-1" /> Reset filters
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Price Range</h4>
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
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Duration</h4>
                    <RadioGroup value={filters.duration} onValueChange={handleDurationChange}>
                      {durations.map((duration) => (
                        <div key={duration} className="flex items-center space-x-2">
                          <RadioGroupItem value={duration} id={duration} />
                          <Label htmlFor={duration} className="text-sm">{duration}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  {/* Categories */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Categories</h4>
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
          
          {/* Tour Results */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredTours.length} {filteredTours.length === 1 ? 'Tour' : 'Tours'} Available
              </h2>
              {/* Sort dropdown can be added here */}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
            
            {filteredTours.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No tours found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria.</p>
                <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tours;
