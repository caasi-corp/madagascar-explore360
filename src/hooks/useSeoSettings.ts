
import { useState } from 'react';

export interface SeoSettings {
  generalSettings: {
    siteTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
  analytics: {
    googleAnalyticsId: string;
    googleTagManagerId: string;
    facebookPixelId: string;
    googleSearchConsoleVerification: string;
  };
  robots: string;
  redirects: Array<{
    source: string;
    destination: string;
    isPermanent: boolean;
  }>;
}

export const useSeoSettings = () => {
  const [seoSettings] = useState<SeoSettings>({
    generalSettings: {
      siteTitle: 'North Gasikara Tours - Agence de voyage à Madagascar',
      metaDescription: 'Découvrez Madagascar avec North Gasikara Tours. Circuits sur mesure, locations de voitures, croisières en catamaran et guides francophones pour explorer la Grande Île.',
      metaKeywords: 'Madagascar, circuit, voyage, location voiture, catamaran, guide, Antananarivo, Nosy Be, tourisme, excursion',
      ogTitle: 'North Gasikara Tours | Voyages à Madagascar',
      ogDescription: 'Votre partenaire de confiance pour découvrir toutes les merveilles de Madagascar',
      ogImage: '/images/og-image.jpg',
    },
    analytics: {
      googleAnalyticsId: 'G-XXXXXXXXXX',
      googleTagManagerId: 'GTM-ABCDEF',
      facebookPixelId: '123456789012345',
      googleSearchConsoleVerification: '',
    },
    robots: `# robots.txt for North Gasikara Tours
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /login
Disallow: /register
Sitemap: https://northgasikaratours.com/sitemap.xml`,
    redirects: [
      { source: '/circuits', destination: '/tours', isPermanent: true },
      { source: '/about-us', destination: '/about', isPermanent: true },
    ],
  });

  return seoSettings;
};
