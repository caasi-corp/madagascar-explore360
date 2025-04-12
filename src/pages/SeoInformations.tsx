
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSeoSettings } from '@/hooks/useSeoSettings';

const SeoInformations: React.FC = () => {
  const seoSettings = useSeoSettings();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Informations SEO</h1>

      <Card>
        <CardHeader>
          <CardTitle>Métadonnées Générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Titre du site :</strong> {seoSettings.generalSettings.siteTitle}</p>
          <p><strong>Description Meta :</strong> {seoSettings.generalSettings.metaDescription}</p>
          <p><strong>Mots-clés :</strong> {seoSettings.generalSettings.metaKeywords}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Open Graph</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Titre OG :</strong> {seoSettings.generalSettings.ogTitle}</p>
          <p><strong>Description OG :</strong> {seoSettings.generalSettings.ogDescription}</p>
          <p><strong>Image OG :</strong> {seoSettings.generalSettings.ogImage}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>ID Google Analytics :</strong> {seoSettings.analytics.googleAnalyticsId}</p>
          <p><strong>ID Google Tag Manager :</strong> {seoSettings.analytics.googleTagManagerId}</p>
          <p><strong>ID Facebook Pixel :</strong> {seoSettings.analytics.facebookPixelId}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fichier Robots</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
            {seoSettings.robots}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redirections</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Source</th>
                <th className="border p-2">Destination</th>
                <th className="border p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {seoSettings.redirects.map((redirect, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{redirect.source}</td>
                  <td className="border p-2">{redirect.destination}</td>
                  <td className="border p-2">{redirect.isPermanent ? '301 (Permanent)' : '302 (Temporaire)'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoInformations;
