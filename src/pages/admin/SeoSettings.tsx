
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

const AdminSeoSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    siteTitle: 'North Gasikara Tours - Agence de voyage à Madagascar',
    metaDescription: 'Découvrez Madagascar avec North Gasikara Tours. Circuits sur mesure, locations de voitures et guides francophones pour explorer la Grande Île.',
    metaKeywords: 'Madagascar, circuit, voyage, location voiture, guide, Antananarivo, Nosy Be, tourisme',
    ogTitle: 'North Gasikara Tours | Voyages à Madagascar',
    ogDescription: 'Votre partenaire de confiance pour découvrir toutes les merveilles de Madagascar',
    ogImage: '/images/og-image.jpg',
  });
  
  const [analytics, setAnalytics] = useState({
    googleAnalyticsId: 'UA-123456789-1',
    googleTagManagerId: 'GTM-ABCDEF',
    facebookPixelId: '123456789012345',
  });
  
  const [robots, setRobots] = useState(
    `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /user/
Sitemap: https://northgasikaratours.com/sitemap.xml`
  );

  const handleGeneralSettingChange = (field: string, value: string) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };
  
  const handleAnalyticsChange = (field: string, value: string) => {
    setAnalytics(prev => ({ ...prev, [field]: value }));
  };
  
  const handleRobotsChange = (value: string) => {
    setRobots(value);
  };
  
  const handleSave = () => {
    toast({
      title: "Paramètres SEO sauvegardés",
      description: "Les paramètres SEO ont été mis à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Paramètres SEO</h1>
        <Button onClick={handleSave} className="bg-madagascar-green hover:bg-madagascar-green/90 text-white">
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none px-0">
          <TabsTrigger value="general" className="py-2 px-4">
            Métadonnées générales
          </TabsTrigger>
          <TabsTrigger value="analytics" className="py-2 px-4">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="robots" className="py-2 px-4">
            Fichier robots.txt
          </TabsTrigger>
          <TabsTrigger value="redirects" className="py-2 px-4">
            Redirections
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métadonnées HTML</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteTitle">Titre du site</Label>
                <Input
                  id="siteTitle"
                  value={generalSettings.siteTitle}
                  onChange={(e) => handleGeneralSettingChange('siteTitle', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Ce qui apparaît dans l'onglet du navigateur</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={generalSettings.metaDescription}
                  onChange={(e) => handleGeneralSettingChange('metaDescription', e.target.value)}
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">Limité à environ 160 caractères pour de meilleurs résultats dans les moteurs de recherche</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={generalSettings.metaKeywords}
                  onChange={(e) => handleGeneralSettingChange('metaKeywords', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Séparés par des virgules</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Métadonnées Open Graph</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ogTitle">Titre OG</Label>
                <Input
                  id="ogTitle"
                  value={generalSettings.ogTitle}
                  onChange={(e) => handleGeneralSettingChange('ogTitle', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ogDescription">Description OG</Label>
                <Textarea
                  id="ogDescription"
                  value={generalSettings.ogDescription}
                  onChange={(e) => handleGeneralSettingChange('ogDescription', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ogImage">Image OG (URL)</Label>
                <Input
                  id="ogImage"
                  value={generalSettings.ogImage}
                  onChange={(e) => handleGeneralSettingChange('ogImage', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Taille recommandée : 1200 x 630 pixels</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Services d'analyse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">ID Google Analytics</Label>
                <Input
                  id="googleAnalyticsId"
                  value={analytics.googleAnalyticsId}
                  onChange={(e) => handleAnalyticsChange('googleAnalyticsId', e.target.value)}
                  placeholder="UA-XXXXXXXXX-X ou G-XXXXXXXXXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="googleTagManagerId">ID Google Tag Manager</Label>
                <Input
                  id="googleTagManagerId"
                  value={analytics.googleTagManagerId}
                  onChange={(e) => handleAnalyticsChange('googleTagManagerId', e.target.value)}
                  placeholder="GTM-XXXXXXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facebookPixelId">ID Facebook Pixel</Label>
                <Input
                  id="facebookPixelId"
                  value={analytics.facebookPixelId}
                  onChange={(e) => handleAnalyticsChange('facebookPixelId', e.target.value)}
                  placeholder="XXXXXXXXXXXXXXX"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="robots" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Fichier robots.txt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="robots">Contenu du fichier robots.txt</Label>
                <Textarea
                  id="robots"
                  value={robots}
                  onChange={(e) => handleRobotsChange(e.target.value)}
                  rows={10}
                  className="font-mono"
                />
                <p className="text-sm text-muted-foreground">
                  Ce fichier indique aux moteurs de recherche quelles pages ils peuvent ou ne peuvent pas indexer.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="redirects" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Redirections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Fonctionnalité de redirections en cours de développement.</p>
                <p className="text-sm text-muted-foreground mt-2">Cette section sera bientôt disponible.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSeoSettings;
