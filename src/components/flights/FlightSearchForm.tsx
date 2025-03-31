
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PlaneTakeoff, PlaneLanding, Calendar, Users, Search } from 'lucide-react';

const FlightSearchForm = () => {
  return (
    <Card className="glass-card p-8 rounded-xl mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="departure" variant="glass">Départ</Label>
              <div className="relative">
                <PlaneTakeoff className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  id="departure"
                  placeholder="Ville de départ"
                  className="glass-input pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrival" variant="glass">Arrivée</Label>
              <div className="relative">
                <PlaneLanding className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  id="arrival"
                  placeholder="Ville d'arrivée"
                  className="glass-input pl-10"
                />
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
              <Label htmlFor="return-date" variant="glass">Date de retour</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  id="return-date"
                  type="date"
                  className="glass-input pl-10"
                />
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
                  defaultValue="1"
                  className="glass-input pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class" variant="glass">Classe</Label>
              <select id="class" className="glass-input w-full h-10 px-3 rounded-md">
                <option value="economy">Économique</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">Première</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex items-end">
          <Button className="w-full bg-northgascar-teal hover:bg-northgascar-teal/80">
            <Search size={18} className="mr-2" /> Rechercher des vols
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FlightSearchForm;
