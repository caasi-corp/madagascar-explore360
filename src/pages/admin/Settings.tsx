
import React, { useState } from 'react';
import { 
  Save, 
  Loader2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  FileText,
  Image,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const AdminSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Madagascar Car Tour',
      siteDescription: 'Découvrez les merveilles de Madagascar avec notre agence de voyage locale.',
      emailContact: 'contact@madagascarcartours.com',
      phoneNumber: '+261 34 56 789 01',
      address: '15 Avenue de l\'Indépendance, Antananarivo, Madagascar',
      logo: '/placeholder.svg',
      favicon: '/favicon.ico',
      currencySymbol: '€',
      currencyCode: 'EUR',
      defaultLanguage: 'fr',
      enableRegistration: true,
      enableBookingSystem: true,
      enableReviews: true,
      enableNewsletter: true
    },
    social: {
      facebook: 'https://facebook.com/madagascarcartours',
      instagram: 'https://instagram.com/madagascarcartours',
      twitter: 'https://twitter.com/madagascartours',
      youtube: 'https://youtube.com/madagascarcartours'
    }
  });

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulation d'une action de sauvegarde
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Paramètres enregistrés",
        description: "Vos modifications ont été enregistrées avec succès.",
      });
    }, 1500);
  };

  const handleChange = (section: 'general' | 'social', field: string, value: any) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  const handleToggleChange = (section: 'general' | 'social', field: string) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: !settings[section][field as keyof typeof settings[typeof section]]
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Paramètres du site</h1>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-madagascar-green hover:bg-madagascar-green/80 text-white"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les modifications
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="contact">Contact & Social</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>
                Configurez les informations de base de votre site web
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nom du site</Label>
                  <Input 
                    id="siteName" 
                    value={settings.general.siteName} 
                    onChange={(e) => handleChange('general', 'siteName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Langue par défaut</Label>
                  <Input 
                    id="defaultLanguage" 
                    value={settings.general.defaultLanguage} 
                    onChange={(e) => handleChange('general', 'defaultLanguage', e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="siteDescription">Description du site</Label>
                  <Textarea 
                    id="siteDescription" 
                    value={settings.general.siteDescription} 
                    onChange={(e) => handleChange('general', 'siteDescription', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currencySymbol">Symbole de la monnaie</Label>
                  <Input 
                    id="currencySymbol" 
                    value={settings.general.currencySymbol} 
                    onChange={(e) => handleChange('general', 'currencySymbol', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currencyCode">Code de la monnaie</Label>
                  <Input 
                    id="currencyCode" 
                    value={settings.general.currencyCode} 
                    onChange={(e) => handleChange('general', 'currencyCode', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
                <CardDescription>
                  Configurez les coordonnées affichées sur votre site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="emailContact">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>Email de contact</span>
                    </div>
                  </Label>
                  <Input 
                    id="emailContact" 
                    value={settings.general.emailContact} 
                    onChange={(e) => handleChange('general', 'emailContact', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>Numéro de téléphone</span>
                    </div>
                  </Label>
                  <Input 
                    id="phoneNumber" 
                    value={settings.general.phoneNumber} 
                    onChange={(e) => handleChange('general', 'phoneNumber', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Adresse</span>
                    </div>
                  </Label>
                  <Textarea 
                    id="address" 
                    value={settings.general.address} 
                    onChange={(e) => handleChange('general', 'address', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Réseaux sociaux</CardTitle>
                <CardDescription>
                  Configurez les liens vers vos profils de médias sociaux
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="facebook">
                    <div className="flex items-center gap-2">
                      <Facebook className="h-4 w-4" />
                      <span>Facebook</span>
                    </div>
                  </Label>
                  <Input 
                    id="facebook" 
                    value={settings.social.facebook} 
                    onChange={(e) => handleChange('social', 'facebook', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagram">
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" />
                      <span>Instagram</span>
                    </div>
                  </Label>
                  <Input 
                    id="instagram" 
                    value={settings.social.instagram} 
                    onChange={(e) => handleChange('social', 'instagram', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </div>
                  </Label>
                  <Input 
                    id="twitter" 
                    value={settings.social.twitter} 
                    onChange={(e) => handleChange('social', 'twitter', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube">
                    <div className="flex items-center gap-2">
                      <Youtube className="h-4 w-4" />
                      <span>YouTube</span>
                    </div>
                  </Label>
                  <Input 
                    id="youtube" 
                    value={settings.social.youtube} 
                    onChange={(e) => handleChange('social', 'youtube', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Personnalisation de l'apparence</CardTitle>
              <CardDescription>
                Configurez l'apparence visuelle de votre site web
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Logo du site</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                      <img 
                        src={settings.general.logo} 
                        alt="Logo" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <Button variant="outline" className="flex gap-2">
                      <Upload className="h-4 w-4" />
                      Télécharger
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded p-2 flex items-center justify-center">
                      <img 
                        src={settings.general.favicon} 
                        alt="Favicon" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <Button variant="outline" className="flex gap-2">
                      <Image className="h-4 w-4" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Image du héros</Label>
                <div className="w-full h-52 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                  <div className="text-muted-foreground flex flex-col items-center">
                    <FileText className="h-8 w-8 mb-2" />
                    <span>Aucune image sélectionnée</span>
                  </div>
                </div>
                <Button variant="outline" className="flex gap-2">
                  <Upload className="h-4 w-4" />
                  Télécharger une image
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Fonctionnalités du site</CardTitle>
              <CardDescription>
                Activez ou désactivez des fonctionnalités spécifiques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between space-y-0">
                  <div>
                    <p className="font-medium">Système d'inscription</p>
                    <p className="text-sm text-muted-foreground">
                      Permet aux utilisateurs de créer un compte
                    </p>
                  </div>
                  <Switch 
                    checked={settings.general.enableRegistration} 
                    onCheckedChange={() => handleToggleChange('general', 'enableRegistration')}
                  />
                </div>
                
                <div className="flex items-center justify-between space-y-0">
                  <div>
                    <p className="font-medium">Système de réservation</p>
                    <p className="text-sm text-muted-foreground">
                      Permet aux utilisateurs de réserver des services
                    </p>
                  </div>
                  <Switch 
                    checked={settings.general.enableBookingSystem} 
                    onCheckedChange={() => handleToggleChange('general', 'enableBookingSystem')}
                  />
                </div>
                
                <div className="flex items-center justify-between space-y-0">
                  <div>
                    <p className="font-medium">Avis des clients</p>
                    <p className="text-sm text-muted-foreground">
                      Permet aux utilisateurs de laisser des avis
                    </p>
                  </div>
                  <Switch 
                    checked={settings.general.enableReviews} 
                    onCheckedChange={() => handleToggleChange('general', 'enableReviews')}
                  />
                </div>
                
                <div className="flex items-center justify-between space-y-0">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">
                      Permet l'inscription à la newsletter
                    </p>
                  </div>
                  <Switch 
                    checked={settings.general.enableNewsletter} 
                    onCheckedChange={() => handleToggleChange('general', 'enableNewsletter')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
