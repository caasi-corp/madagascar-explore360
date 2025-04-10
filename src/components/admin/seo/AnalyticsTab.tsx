
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AnalyticsTabProps {
  analytics: {
    googleAnalyticsId: string;
    googleTagManagerId: string;
    facebookPixelId: string;
    googleSearchConsoleVerification: string;
  };
  handleAnalyticsChange: (field: string, value: string) => void;
}

const AnalyticsTab = ({ analytics, handleAnalyticsChange }: AnalyticsTabProps) => {
  return (
    <div className="pt-4">
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
    </div>
  );
};

export default AnalyticsTab;
