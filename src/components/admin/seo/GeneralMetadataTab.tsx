
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface GeneralMetadataTabProps {
  generalSettings: {
    siteTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
  handleGeneralSettingChange: (field: string, value: string) => void;
}

const GeneralMetadataTab = ({ generalSettings, handleGeneralSettingChange }: GeneralMetadataTabProps) => {
  return (
    <div className="pt-4 space-y-4">
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
    </div>
  );
};

export default GeneralMetadataTab;
