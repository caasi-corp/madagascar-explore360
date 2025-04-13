
import { useState, useEffect } from 'react';
import { bannerAPI } from '@/lib/store';
import { Banner } from '@/lib/db/schema';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

export const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const data = await bannerAPI.getAll();
      // Trier les bannières par date de création (plus récentes en premier)
      const sortedData = [...data].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setBanners(sortedData);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des bannières:', err);
      setError('Impossible de charger les bannières');
      toast.error("Erreur", {
        description: "Impossible de charger les bannières"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addBanner = async (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await bannerAPI.add(banner);
      await fetchBanners();
      return true;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la bannière:', err);
      toast.error("Erreur", {
        description: "Impossible d'ajouter la bannière"
      });
      return false;
    }
  };

  const updateBanner = async (id: string, updates: Partial<Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      await bannerAPI.update(id, updates);
      await fetchBanners();
      return true;
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la bannière:', err);
      toast.error("Erreur", {
        description: "Impossible de mettre à jour la bannière"
      });
      return false;
    }
  };

  const deleteBanner = async (id: string) => {
    try {
      await bannerAPI.delete(id);
      await fetchBanners();
      return true;
    } catch (err) {
      console.error('Erreur lors de la suppression de la bannière:', err);
      toast.error("Erreur", {
        description: "Impossible de supprimer la bannière"
      });
      return false;
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      await bannerAPI.update(id, { isActive });
      await fetchBanners();
      return true;
    } catch (err) {
      console.error('Erreur lors de la modification du statut de la bannière:', err);
      toast.error("Erreur", {
        description: "Impossible de modifier le statut de la bannière"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return {
    banners,
    isLoading,
    error,
    fetchBanners,
    addBanner,
    updateBanner,
    deleteBanner,
    toggleActive,
  };
};
