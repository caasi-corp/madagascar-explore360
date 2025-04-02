
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'North Gascar Tours',
    contactEmail: 'info@northgascartours.com',
    contactPhone: '+261 32 050 09 99',
    address: 'Antananarivo, Madagascar',
    currency: 'EUR'
  });
  
  const [bookingSettings, setBookingSettings] = useState({
    allowInstantBooking: true,
    requireDeposit: true,
    depositPercentage: 20,
    cancelationPeriod: 48,
    allowCancelation: true,
    confirmationAutomatic: false
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: 'user@example.com',
    smtpPassword: '**********',
    senderName: 'North Gascar Tours',
    senderEmail: 'noreply@northgascartours.com',
    emailFooter: 'North Gascar Tours © 2023. Tous droits réservés.'
  });
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };
  
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setBookingSettings({
      ...bookingSettings,
      [name]: type === 'number' ? Number(value) : value
    });
  };
  
  const handleBookingSwitchChange = (name: string, checked: boolean) => {
    setBookingSettings({
      ...bookingSettings,
      [name]: checked
    });
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    
    // Simulation de la sauvegarde
    toast({
      title: "Paramètres sauvegardés",
      description: `Les paramètres ${type === 'general' ? 'généraux' : type === 'booking' ? 'de réservation' : 'de messagerie'} ont été sauvegardés avec succès.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Paramètres</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="booking">Réservations</TabsTrigger>
          <TabsTrigger value="email">Messagerie</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>
                Configurez les informations générales de votre site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, 'general')} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Nom du site</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={generalSettings.siteName}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email de contact</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Téléphone de contact</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={generalSettings.contactPhone}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      name="address"
                      value={generalSettings.address}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Devise</Label>
                    <Input
                      id="currency"
                      name="currency"
                      value={generalSettings.currency}
                      onChange={handleGeneralChange}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-madagascar-green hover:bg-madagascar-green/80">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="booking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de réservation</CardTitle>
              <CardDescription>
                Configurez les options de réservation pour vos services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, 'booking')} className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowInstantBooking">Autoriser les réservations instantanées</Label>
                      <p className="text-sm text-muted-foreground">
                        Permet aux clients de réserver sans validation préalable.
                      </p>
                    </div>
                    <Switch
                      id="allowInstantBooking"
                      checked={bookingSettings.allowInstantBooking}
                      onCheckedChange={(checked) => handleBookingSwitchChange('allowInstantBooking', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="requireDeposit">Exiger un acompte</Label>
                      <p className="text-sm text-muted-foreground">
                        Les clients doivent payer un acompte pour confirmer leur réservation.
                      </p>
                    </div>
                    <Switch
                      id="requireDeposit"
                      checked={bookingSettings.requireDeposit}
                      onCheckedChange={(checked) => handleBookingSwitchChange('requireDeposit', checked)}
                    />
                  </div>
                  
                  {bookingSettings.requireDeposit && (
                    <div className="space-y-2 ml-6">
                      <Label htmlFor="depositPercentage">Pourcentage d'acompte</Label>
                      <div className="flex items-center">
                        <Input
                          id="depositPercentage"
                          name="depositPercentage"
                          type="number"
                          min="0"
                          max="100"
                          value={bookingSettings.depositPercentage}
                          onChange={handleBookingChange}
                          className="max-w-[100px]"
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowCancelation">Autoriser les annulations</Label>
                      <p className="text-sm text-muted-foreground">
                        Les clients peuvent annuler leur réservation.
                      </p>
                    </div>
                    <Switch
                      id="allowCancelation"
                      checked={bookingSettings.allowCancelation}
                      onCheckedChange={(checked) => handleBookingSwitchChange('allowCancelation', checked)}
                    />
                  </div>
                  
                  {bookingSettings.allowCancelation && (
                    <div className="space-y-2 ml-6">
                      <Label htmlFor="cancelationPeriod">Délai d'annulation (en heures)</Label>
                      <Input
                        id="cancelationPeriod"
                        name="cancelationPeriod"
                        type="number"
                        min="0"
                        value={bookingSettings.cancelationPeriod}
                        onChange={handleBookingChange}
                        className="max-w-[150px]"
                      />
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="confirmationAutomatic">Confirmation automatique</Label>
                      <p className="text-sm text-muted-foreground">
                        Confirmer automatiquement les réservations qui respectent les critères.
                      </p>
                    </div>
                    <Switch
                      id="confirmationAutomatic"
                      checked={bookingSettings.confirmationAutomatic}
                      onCheckedChange={(checked) => handleBookingSwitchChange('confirmationAutomatic', checked)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-madagascar-green hover:bg-madagascar-green/80">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de messagerie</CardTitle>
              <CardDescription>
                Configurez les paramètres pour l'envoi d'emails.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, 'email')} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">Serveur SMTP</Label>
                    <Input
                      id="smtpServer"
                      name="smtpServer"
                      value={emailSettings.smtpServer}
                      onChange={handleEmailChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">Port SMTP</Label>
                    <Input
                      id="smtpPort"
                      name="smtpPort"
                      type="number"
                      value={emailSettings.smtpPort}
                      onChange={handleEmailChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">Nom d'utilisateur SMTP</Label>
                    <Input
                      id="smtpUsername"
                      name="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={handleEmailChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Mot de passe SMTP</Label>
                    <Input
                      id="smtpPassword"
                      name="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={handleEmailChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Nom de l'expéditeur</Label>
                    <Input
                      id="senderName"
                      name="senderName"
                      value={emailSettings.senderName}
                      onChange={handleEmailChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Email de l'expéditeur</Label>
                    <Input
                      id="senderEmail"
                      name="senderEmail"
                      type="email"
                      value={emailSettings.senderEmail}
                      onChange={handleEmailChange}
                    />
                  </div>
                  
                  <div className="col-span-full space-y-2">
                    <Label htmlFor="emailFooter">Pied de page des emails</Label>
                    <Input
                      id="emailFooter"
                      name="emailFooter"
                      value={emailSettings.emailFooter}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-madagascar-green hover:bg-madagascar-green/80">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
