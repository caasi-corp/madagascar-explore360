
import React from 'react';
import { Heading2, Lead } from '@/components/common/Typography';
import { Users } from 'lucide-react';
import Rating from '@/components/common/Rating';

const WelcomeSection: React.FC = () => {
  return (
    <section className="py-16 px-4 text-center">
      <div className="container mx-auto max-w-4xl">
        <Heading2 className="mb-6">Bienvenue chez North Gascar Tours</Heading2>
        <Lead className="mb-8 text-muted-foreground">
          Votre partenaire de confiance pour explorer les merveilles cachées de Madagascar, 
          de ses paysages spectaculaires à sa faune et flore uniques au monde.
        </Lead>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Rating value={4.9} showValue={true} reviews={230} />
          <div className="flex items-center gap-2">
            <Users className="text-northgascar-teal h-5 w-5" />
            <span>Plus de 5000 clients satisfaits</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
