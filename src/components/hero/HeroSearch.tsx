
import React from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HeroSearch = () => {
  return (
    <div className="bg-northgascar-navy/80 backdrop-blur-md p-4 md:p-4 rounded-lg shadow-lg w-full max-w-4xl mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
          <Input 
            placeholder="Où aller?" 
            className="pl-10 bg-white border-none"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
          <Select>
            <SelectTrigger className="pl-10 bg-white border-none">
              <SelectValue placeholder="Sélectionner une..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coming-week">Semaine à venir</SelectItem>
              <SelectItem value="next-month">Mois prochain</SelectItem>
              <SelectItem value="custom">Date personnalisée</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-northgascar-teal" size={18} />
          <Select>
            <SelectTrigger className="pl-10 bg-white border-none">
              <SelectValue placeholder="Voyageurs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Personne</SelectItem>
              <SelectItem value="2">2 Personnes</SelectItem>
              <SelectItem value="3+">3+ Personnes</SelectItem>
              <SelectItem value="group">Groupe</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-northgascar-teal hover:bg-northgascar-teal/80 text-white h-10">
          <Search className="mr-2" size={18} />
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default HeroSearch;
