
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileCode, RefreshCw, Download } from 'lucide-react';

interface SitemapTabProps {
  isGeneratingSitemap: boolean;
  handleGenerateSitemap: () => void;
}

const SitemapTab = ({ isGeneratingSitemap, handleGenerateSitemap }: SitemapTabProps) => {
  return (
    <div className="pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Gestion du Sitemap</CardTitle>
          <CardDescription>
            Le sitemap aide les moteurs de recherche à indexer votre site plus efficacement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleGenerateSitemap} 
              disabled={isGeneratingSitemap}
              className="flex-1"
            >
              {isGeneratingSitemap ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <FileCode className="mr-2 h-4 w-4" />
                  Générer le sitemap.xml
                </>
              )}
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Télécharger le sitemap
            </Button>
          </div>

          <Alert>
            <AlertDescription>
              Le sitemap sera généré à l'adresse: <strong>https://northgasikaratours.com/sitemap.xml</strong> 
              <br />N'oubliez pas de soumettre votre sitemap à Google Search Console pour améliorer l'indexation.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Pages incluses dans le sitemap</Label>
            <div className="border rounded-md p-4 space-y-2">
              <p className="text-sm">✅ Page d'accueil</p>
              <p className="text-sm">✅ Pages de circuits</p>
              <p className="text-sm">✅ Pages de services</p>
              <p className="text-sm">✅ Pages à propos et contact</p>
              <p className="text-sm">✅ Pages légales (sauf mentions contraires)</p>
              <p className="text-sm">❌ Pages administrateur</p>
              <p className="text-sm">❌ Pages de connexion/inscription</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SitemapTab;
