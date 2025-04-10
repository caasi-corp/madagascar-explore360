
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Save, RefreshCw, FileCode, Upload, Download } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminSeoSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isGeneratingSitemap, setIsGeneratingSitemap] = useState(false);
  const [generalSettings, setGeneralSettings] = useState({
    siteTitle: 'North Gasikara Tours - Agence de voyage à Madagascar',
    metaDescription: 'Découvrez Madagascar avec North Gasikara Tours. Circuits sur mesure, locations de voitures, croisières en catamaran et guides francophones pour explorer la Grande Île.',
    metaKeywords: 'Madagascar, circuit, voyage, location voiture, catamaran, guide, Antananarivo, Nosy Be, tourisme, excursion',
    ogTitle: 'North Gasikara Tours | Voyages à Madagascar',
    ogDescription: 'Votre partenaire de confiance pour découvrir toutes les merveilles de Madagascar',
    ogImage: '/images/og-image.jpg',
  });
  
  const [analytics, setAnalytics] = useState({
    googleAnalyticsId: 'G-XXXXXXXXXX', // Updated to GA4 format
    googleTagManagerId: 'GTM-ABCDEF',
    facebookPixelId: '123456789012345',
    googleSearchConsoleVerification: '',
  });
  
  const [robots, setRobots] = useState(
    `# robots.txt for North Gasikara Tours
# https://northgasikaratours.com

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin/*
Disallow: /login
Disallow: /register
Disallow: /user-dashboard/
Disallow: /user-dashboard/*

# Allow Google to index everything
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /admin/*

# Allow Bing to index everything
User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /admin/*

# Allow social media crawlers
User-agent: Twitterbot
Allow: /
User-agent: facebookexternalhit
Allow: /

# Sitemap location
Sitemap: https://northgasikaratours.com/sitemap.xml`
  );

  const [redirects, setRedirects] = useState([
    { source: '/circuits', destination: '/tours', isPermanent: true },
    { source: '/about-us', destination: '/about', isPermanent: true },
  ]);
  
  const [newRedirect, setNewRedirect] = useState({
    source: '',
    destination: '',
    isPermanent: true
  });

  const handleGeneralSettingChange = (field: string, value: string) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };
  
  const handleAnalyticsChange = (field: string, value: string) => {
    setAnalytics(prev => ({ ...prev, [field]: value }));
  };
  
  const handleRobotsChange = (value: string) => {
    setRobots(value);
  };

  const handleAddRedirect = () => {
    if (newRedirect.source && newRedirect.destination) {
      setRedirects([...redirects, newRedirect]);
      setNewRedirect({ source: '', destination: '', isPermanent: true });
      toast({
        title: "Redirection ajoutée",
        description: `${newRedirect.source} → ${newRedirect.destination}`,
      });
    } else {
      toast({
        title: "Erreur",
        description: "Les champs source et destination sont requis.",
        variant: "destructive"
      });
    }
  };

  const handleRemoveRedirect = (index: number) => {
    const newRedirects = [...redirects];
    newRedirects.splice(index, 1);
    setRedirects(newRedirects);
  };
  
  const handleSave = () => {
    toast({
      title: "Paramètres SEO sauvegardés",
      description: "Les paramètres SEO ont été mis à jour avec succès.",
    });
  };

  const handleGenerateSitemap = () => {
    setIsGeneratingSitemap(true);
    
    // Simulation of sitemap generation
    setTimeout(() => {
      setIsGeneratingSitemap(false);
      toast({
        title: "Sitemap généré",
        description: "Le fichier sitemap.xml a été mis à jour avec succès.",
      });
    }, 2000);
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
          <TabsTrigger value="sitemap" className="py-2 px-4">
            Sitemap
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
                <p className="text-sm text-muted-foreground">Ce qui apparaît dans l'onglet du navigateur (50-60 caractères recommandés)</p>
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
                <Label htmlFor="googleAnalyticsId">ID Google Analytics (GA4)</Label>
                <Input
                  id="googleAnalyticsId"
                  value={analytics.googleAnalyticsId}
                  onChange={(e) => handleAnalyticsChange('googleAnalyticsId', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
                <p className="text-sm text-muted-foreground">Utilisez le format GA4 pour une meilleure analyse des données</p>
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

              <div className="space-y-2">
                <Label htmlFor="googleSearchConsoleVerification">Code de vérification Google Search Console</Label>
                <Input
                  id="googleSearchConsoleVerification"
                  value={analytics.googleSearchConsoleVerification}
                  onChange={(e) => handleAnalyticsChange('googleSearchConsoleVerification', e.target.value)}
                  placeholder="Entrez le code de vérification meta"
                />
                <p className="text-sm text-muted-foreground">Pour vérifier la propriété de votre site sur Google Search Console</p>
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
              <CardDescription>
                Configurez les redirections d'URLs pour améliorer l'expérience utilisateur et le SEO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                  <div className="md:col-span-5 space-y-2">
                    <Label htmlFor="redirectSource">URL source</Label>
                    <Input
                      id="redirectSource"
                      placeholder="/ancienne-page"
                      value={newRedirect.source}
                      onChange={(e) => setNewRedirect({...newRedirect, source: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-5 space-y-2">
                    <Label htmlFor="redirectDestination">URL destination</Label>
                    <Input
                      id="redirectDestination"
                      placeholder="/nouvelle-page"
                      value={newRedirect.destination}
                      onChange={(e) => setNewRedirect({...newRedirect, destination: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 flex items-end">
                    <Button className="w-full" onClick={handleAddRedirect}>
                      Ajouter
                    </Button>
                  </div>
                </div>

                {redirects.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-accent">
                        <tr>
                          <th className="text-left p-2">Source</th>
                          <th className="text-left p-2">Destination</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-right p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {redirects.map((redirect, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-2">{redirect.source}</td>
                            <td className="p-2">{redirect.destination}</td>
                            <td className="p-2">{redirect.isPermanent ? '301 (Permanent)' : '302 (Temporaire)'}</td>
                            <td className="p-2 text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRemoveRedirect(index)}
                              >
                                Supprimer
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-6 border rounded-md">
                    <p className="text-muted-foreground">Aucune redirection configurée</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sitemap" className="pt-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSeoSettings;
