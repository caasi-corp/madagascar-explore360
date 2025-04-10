
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

// Import the individual tab components
import GeneralMetadataTab from '@/components/admin/seo/GeneralMetadataTab';
import AnalyticsTab from '@/components/admin/seo/AnalyticsTab';
import RobotsTab from '@/components/admin/seo/RobotsTab';
import RedirectsTab from '@/components/admin/seo/RedirectsTab';
import SitemapTab from '@/components/admin/seo/SitemapTab';

const AdminSeoSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isGeneratingSitemap, setIsGeneratingSitemap] = useState(false);
  
  // State management
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

  // Handlers
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
        
        <TabsContent value="general">
          <GeneralMetadataTab 
            generalSettings={generalSettings} 
            handleGeneralSettingChange={handleGeneralSettingChange} 
          />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AnalyticsTab 
            analytics={analytics} 
            handleAnalyticsChange={handleAnalyticsChange} 
          />
        </TabsContent>
        
        <TabsContent value="robots">
          <RobotsTab 
            robots={robots} 
            handleRobotsChange={handleRobotsChange} 
          />
        </TabsContent>
        
        <TabsContent value="redirects">
          <RedirectsTab 
            redirects={redirects}
            newRedirect={newRedirect}
            setNewRedirect={setNewRedirect}
            handleAddRedirect={handleAddRedirect}
            handleRemoveRedirect={handleRemoveRedirect}
          />
        </TabsContent>

        <TabsContent value="sitemap">
          <SitemapTab 
            isGeneratingSitemap={isGeneratingSitemap}
            handleGenerateSitemap={handleGenerateSitemap}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSeoSettings;
