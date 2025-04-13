
import { useState, useEffect } from 'react';
import { bannerAPI } from '@/lib/api/bannerAPI'; // Import direct
import { Banner } from '@/lib/db/schema';
import { toast } from 'sonner';
import { initDB, resetDB } from '@/lib/db/db'; // Import direct

// Événement personnalisé pour signaler les changements de bannières
export const BANNER_UPDATED_EVENT = 'banner-updated';

export const useActiveBanner = (page: string) => {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedReset, setHasAttemptedReset] = useState(false);

  const fetchBanner = async () => {
    setIsLoading(true);
    try {
      console.log(`Fetching banner for page: ${page}`);
      // Vérifier explicitement que la base de données est initialisée
      await initDB();
      
      const data = await bannerAPI.getActiveByPage(page);
      console.log(`Banner data retrieved:`, data);
      setBanner(data || null);
      setError(null);
    } catch (err) {
      console.error(`Erreur lors du chargement de la bannière pour ${page}:`, err);
      setError('Impossible de charger la bannière');
      
      // Si nous n'avons pas encore essayé de réinitialiser la base de données, essayons une fois
      if (!hasAttemptedReset) {
        setHasAttemptedReset(true);
        try {
          console.log("Tentative de réinitialisation de la base de données...");
          await resetDB();
          console.log("Réinitialisation réussie, nouvelle tentative de récupération de la bannière");
          // Réessayer après réinitialisation
          fetchBanner();
        } catch (resetError) {
          console.error('Échec de la réinitialisation de la base de données:', resetError);
        }
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
