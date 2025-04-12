
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const BannerGuide: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Guide des bannières</CardTitle>
        <CardDescription>
          Conseils pour créer des bannières efficaces
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Formats recommandés</h3>
          <p className="text-sm text-muted-foreground">
            Pour une apparence optimale, utilisez des images au format 1920x600 pixels.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Conseils pour les images</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Utilisez des images de haute qualité mais optimisées pour le web</li>
            <li>Préférez les images avec un bon contraste pour la lisibilité du texte</li>
            <li>Évitez les images trop chargées ou avec trop de détails</li>
            <li>Assurez-vous que l'image correspond au contenu de la page</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Gestion des bannières actives</h3>
          <p className="text-sm text-muted-foreground">
            Une seule bannière peut être active par page. Activer une bannière désactivera automatiquement les autres bannières sur la même page.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BannerGuide;
