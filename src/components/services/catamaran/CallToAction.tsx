
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <div className="container mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à Embarquer ?</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
        Contactez-nous pour planifier votre croisière en catamaran personnalisée à Madagascar
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button className="bg-northgascar-teal hover:bg-northgascar-teal/80 text-white" size="lg">
          Réserver maintenant
        </Button>
        <Button variant="outline" size="lg">
          Demander un devis
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
