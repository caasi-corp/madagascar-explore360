
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-madagascar-green/10">
      <div className="container mx-auto text-center">
        <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt pour Votre Aventure à Madagascar ?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Commencez à planifier votre voyage dès aujourd'hui et découvrez les merveilles de Madagascar avec North Gascar Tours
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="glass" className="text-white">
              <a href="/tours">
                <Calendar className="mr-2 h-5 w-5" /> Réserver un Circuit
              </a>
            </Button>
            <Button asChild size="lg" variant="glass">
              <a href="/contact">
                <MapPin className="mr-2 h-5 w-5" /> Nous Contacter
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
