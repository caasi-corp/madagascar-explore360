
import { useState, useEffect } from 'react';
import { bannerAPI } from '@/lib/store';
import { Banner } from '@/lib/db/schema';
import { toast } from 'sonner';

// Événement personnalisé pour signaler les changements de bannières
export const BANNER_UPDATED_EVENT = 'banner-updated';

export const useActiveBanner = (page: string) => {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanner = async () => {
    setIsLoading(true);
    try {
      console.log(`Fetching banner for page: ${page}`);
      const data = await bannerAPI.getActiveByPage(page);
      console.log(`Banner data retrieved:`, data);
      setBanner(data || null);
      setError(null);
    } catch (err) {
      console.error(`Erreur lors du chargement de la bannière pour ${page}:`, err);
      setError('Impossible de charger la bannière');
      
      // Initialiser la base de données si elle n'existe pas encore
      try {
        const { initDB } = await import('@/lib/db/db');
        await initDB();
        console.log('Tentative de réinitialisation de la base de données réussie');
      } catch (dbError) {
        console.error('Échec de la réinitialisation de la base de données:', dbError);
      }
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
