
import { useState, useEffect } from 'react';
import { bannerAPI } from '@/lib/api/bannerAPI';
import { toast } from 'sonner';
import { initDB } from '@/lib/DatabaseX/db';
import { DBXBanner } from '@/lib/DatabaseX/types';

// Événement personnalisé pour signaler les changements de bannières
export const BANNER_UPDATED_EVENT = 'banner-updated';

export const useActiveBanner = (page: string) => {
  const [banner, setBanner] = useState<DBXBanner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanner = async () => {
    setIsLoading(true);
    try {
      console.log(`Fetching banner for page: ${page}`);
      // Initialiser la base de données
      await initDB();
      
      const data = await bannerAPI.getActiveByPage(page);
      console.log(`Banner data retrieved:`, data);
      setBanner(data || null);
      setError(null);
    } catch (err) {
      console.error(`Erreur lors du chargement de la bannière pour ${page}:`, err);
      setError('Impossible de charger la bannière');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();

    // Écouter l'événement de mise à jour des bannières
    const handleBannerUpdate = () => {
      console.log(`Mise à jour de la bannière pour la page ${page} détectée`);
      fetchBanner();
    };

    // S'abonner à l'événement de mise à jour
    window.addEventListener(BANNER_UPDATED_EVENT, handleBannerUpdate);

    // Nettoyage de l'écouteur d'événement
    return () => {
      window.removeEventListener(BANNER_UPDATED_EVENT, handleBannerUpdate);
    };
  }, [page]);

  return {
    banner,
    isLoading,
    error,
    refresh: fetchBanner
  };
};
