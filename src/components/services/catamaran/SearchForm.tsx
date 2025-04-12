
import React from 'react';
import { Ship, Navigation, Calendar, Anchor, Users, Wind, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchForm = () => {
  return (
    <div className="glass-card p-8 rounded-xl mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cruise" variant="glass">Type de Croisière</Label>
              <div className="relative">
                <Ship className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <select id="cruise" className="glass-input w-full h-10 pl-10 rounded-md">
                  <option value="">Sélectionnez une croisière</option>
                  <option value="day">Croisière à la journée</option>
                  <option value="weekend">Week-end en mer</option>
                  <option value="week">Expédition d'une semaine</option>
                  <option value="custom">Sur mesure</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination" variant="glass">Destination</Label>
              <div className="relative">
                <Navigation className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <select id="destination" className="glass-input w-full h-10 pl-10 rounded-md">
                  <option value="">Choisir une destination</option>
                  <option value="nosy-be">Nosy Be</option>
                  <option value="mitsio">Archipel de Mitsio</option>
                  <option value="nosy-komba">Nosy Komba</option>
                  <option value="radama">Îles Radama</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departure-date" variant="glass">Date de départ</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  id="departure-date"
                  type="date"
                  className="glass-input pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" variant="glass">Durée</Label>
              <div className="relative">
                <Anchor className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <select id="duration" className="glass-input w-full h-10 pl-10 rounded-md">
                  <option value="1">1 jour</option>
                  <option value="2">2 jours</option>
                  <option value="3">3 jours</option>
                  <option value="5">5 jours</option>
                  <option value="7">7 jours</option>
                  <option value="custom">Durée personnalisée</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passengers" variant="glass">Passagers</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  id="passengers"
                  type="number"
                  min="1"
                  defaultValue="2"
                  className="glass-input pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cabin" variant="glass">Cabines</Label>
              <div className="relative">
                <Wind className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <select id="cabin" className="glass-input w-full h-10 pl-10 rounded-md">
                  <option value="shared">Partagée</option>
                  <option value="private">Privée</option>
                  <option value="luxury">Luxe</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 flex items-end">
          <Button className="w-full bg-northgascar-teal hover:bg-northgascar-teal/80">
            <Search size={18} className="mr-2" /> Rechercher des croisières
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
