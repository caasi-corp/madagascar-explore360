
import { useState, useEffect } from 'react';
import { bannerAPI } from '@/lib/store';
import { Banner } from '@/lib/db/schema';

export const useActiveBanner = (page: string) => {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      setIsLoading(true);
      try {
        const data = await bannerAPI.getActiveByPage(page);
        setBanner(data || null);
        setError(null);
      } catch (err) {
        console.error(`Erreur lors du chargement de la bannière pour ${page}:`, err);
        setError('Impossible de charger la bannière');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, [page]);

  return {
    banner,
    isLoading,
    error
  };
};
