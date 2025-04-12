
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const BannerExamples: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exemples de bannières</CardTitle>
        <CardDescription>
          Inspirez-vous de ces exemples
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="rounded-md overflow-hidden border">
            <img 
              src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
              alt="Exemple de bannière" 
              className="w-full h-32 object-cover"
            />
          </div>
          <p className="text-sm text-center">Bannière avec paysage naturel</p>
        </div>
        
        <div className="space-y-2">
          <div className="rounded-md overflow-hidden border">
            <img 
              src="https://images.unsplash.com/photo-1518877593221-1f28583780b4" 
              alt="Exemple de bannière" 
              className="w-full h-32 object-cover"
            />
          </div>
          <p className="text-sm text-center">Bannière avec faune marine</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BannerExamples;
