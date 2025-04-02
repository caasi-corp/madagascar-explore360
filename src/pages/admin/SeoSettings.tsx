
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

const AdminSeoSettings = () => {
  const { toast } = useToast();
  
  const [seoSettings, setSeoSettings] = useState({
    siteTitle: 'North Gascar Tours | Découvrez Madagascar Autrement',
    metaDescription: 'North Gascar Tours vous propose des circuits, excursions et location de véhicules pour découvrir les merveilles de Madagascar de manière authentique et responsable.',
    metaKeywords: 'Madagascar, tourisme, circuits, baobabs, lémuriens, voyages, aventure, écotourisme',
    ogTitle: 'North Gascar Tours | Aventures à Madagascar',
    ogDescription: 'Explorez les merveilles naturelles et culturelles de Madagascar avec nos circuits personnalisés et nos guides experts locaux.',
    ogImage: 'https://northgascartours.com/images/og-image.jpg',
    enableTwitterCards: true,
    twitterHandle: '@northgascartours',
    enableSitemap: true,
    enableRobotsTxt: true,
    enableSchema: true,
    googleAnalyticsId: 'UA-123456789-1',
    googleVerification: '',
    bingVerification: '',
    facebookPixelId: '',
    enableCanonical: true,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeoSettings({
      ...seoSettings,
      [name]: value
    });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setSeoSettings({
      ...seoSettings,
      [name]: checked
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de la sauvegarde
    setTimeout(() => {
      toast({
        title: "Paramètres SEO sauvegardés",
        description: "Les paramètres SEO ont été mis à jour avec succès",
        variant: "default",
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Paramètres SEO</h1>
        <Button type="submit" form="seo-form" className="bg-madagascar-green hover:bg-madagascar-green/80">
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
      </div>

      <form id="seo-form" onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Balises Meta</CardTitle>
            <CardDescription>
              Configurez les balises meta pour améliorer le référencement de votre site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteTitle">Titre du site</Label>
              <Input
                id="siteTitle"
                name="siteTitle"
                value={seoSettings.siteTitle}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                Idéalement entre 50 et 60 caractères.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta description</Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                value={seoSettings.metaDescription}
                onChange={handleChange}
                rows={3}
              />
              <p className="text-sm text-muted-foreground">
                Idéalement entre 150 et 160 caractères.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaKeywords">Mots-clés</Label>
              <Input
                id="metaKeywords"
                name="metaKeywords"
                value={seoSettings.metaKeywords}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                Séparés par des virgules.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Graph</CardTitle>
            <CardDescription>
              Les balises Open Graph permettent de contrôler l'apparence de votre site lorsqu'il est partagé sur les réseaux sociaux.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ogTitle">Titre OG</Label>
              <Input
                id="ogTitle"
                name="ogTitle"
                value={seoSettings.ogTitle}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ogDescription">Description OG</Label>
              <Textarea
                id="ogDescription"
                name="ogDescription"
                value={seoSettings.ogDescription}
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ogImage">Image OG (URL)</Label>
              <Input
                id="ogImage"
                name="ogImage"
                value={seoSettings.ogImage}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                Une image de haute qualité d'au moins 1200x630 pixels.
              </p>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="enableTwitterCards">Cartes Twitter</Label>
                <p className="text-sm text-muted-foreground">
                  Activer les cartes Twitter pour améliorer le partage sur Twitter.
                </p>
              </div>
              <Switch
                id="enableTwitterCards"
                checked={seoSettings.enableTwitterCards}
                onCheckedChange={(checked) => handleSwitchChange('enableTwitterCards', checked)}
              />
            </div>
            
            {seoSettings.enableTwitterCards && (
              <div className="space-y-2 pl-6">
                <Label htmlFor="twitterHandle">Compte Twitter</Label>
                <Input
                  id="twitterHandle"
                  name="twitterHandle"
                  value={seoSettings.twitterHandle}
                  onChange={handleChange}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimisation technique</CardTitle>
            <CardDescription>
              Paramètres techniques pour améliorer l'indexation et le référencement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="enableSitemap">Sitemap XML</Label>
                  <p className="text-sm text-muted-foreground">
                    Générer automatiquement un sitemap XML.
                  </p>
                </div>
                <Switch
                  id="enableSitemap"
                  checked={seoSettings.enableSitemap}
                  onCheckedChange={(checked) => handleSwitchChange('enableSitemap', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="enableRobotsTxt">Fichier robots.txt</Label>
                  <p className="text-sm text-muted-foreground">
                    Générer automatiquement un fichier robots.txt.
                  </p>
                </div>
                <Switch
                  id="enableRobotsTxt"
                  checked={seoSettings.enableRobotsTxt}
                  onCheckedChange={(checked) => handleSwitchChange('enableRobotsTxt', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="enableCanonical">URLs canoniques</Label>
                  <p className="text-sm text-muted-foreground">
                    Ajouter automatiquement des URLs canoniques.
                  </p>
                </div>
                <Switch
                  id="enableCanonical"
                  checked={seoSettings.enableCanonical}
                  onCheckedChange={(checked) => handleSwitchChange('enableCanonical', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="enableSchema">Schema.org</Label>
                  <p className="text-sm text-muted-foreground">
                    Ajouter les données structurées Schema.org.
                  </p>
                </div>
                <Switch
                  id="enableSchema"
                  checked={seoSettings.enableSchema}
                  onCheckedChange={(checked) => handleSwitchChange('enableSchema', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outils d'analyse</CardTitle>
            <CardDescription>
              Configurations pour les services d'analyse et de suivi.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="googleAnalyticsId">ID Google Analytics</Label>
              <Input
                id="googleAnalyticsId"
                name="googleAnalyticsId"
                value={seoSettings.googleAnalyticsId}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="googleVerification">Code de vérification Google Search Console</Label>
              <Input
                id="googleVerification"
                name="googleVerification"
                value={seoSettings.googleVerification}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bingVerification">Code de vérification Bing Webmaster Tools</Label>
              <Input
                id="bingVerification"
                name="bingVerification"
                value={seoSettings.bingVerification}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="facebookPixelId">ID Facebook Pixel</Label>
              <Input
                id="facebookPixelId"
                name="facebookPixelId"
                value={seoSettings.facebookPixelId}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              L'installation de ces outils d'analyse vous permet de suivre le trafic et le comportement des utilisateurs sur votre site.
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AdminSeoSettings;
