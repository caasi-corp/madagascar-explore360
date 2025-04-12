
import { useState, useEffect } from 'react';
import { bannerAPI } from '@/lib/store';
import { Banner } from '@/lib/db/schema';
import { useToast } from '@/hooks/use-toast';

export const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const data = await bannerAPI.getAll();
      setBanners(data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des bannières:', err);
      setError('Impossible de charger les bannières');
      toast({
        title: "Erreur",
        description: "Impossible de charger les bannières",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addBanner = async (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await bannerAPI.add(banner);
      toast({
        title: "Succès",
        description: "Bannière ajoutée avec succès",
      });
      await fetchBanners();
      return true;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la bannière:', err);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la bannière",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateBanner = async (id: string, updates: Partial<Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      await bannerAPI.update(id, updates);
      toast({
        title: "Succès",
        description: "Bannière mise à jour avec succès",
      });
      await fetchBanners();
      return true;
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la bannière:', err);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la bannière",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteBanner = async (id: string) => {
    try {
      await bannerAPI.delete(id);
      toast({
        title: "Succès",
        description: "Bannière supprimée avec succès",
      });
      await fetchBanners();
      return true;
    } catch (err) {
      console.error('Erreur lors de la suppression de la bannière:', err);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la bannière",
        variant: "destructive"
      });
      return false;
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      await bannerAPI.update(id, { isActive });
      toast({
        title: "Succès",
        description: isActive ? "Bannière activée avec succès" : "Bannière désactivée avec succès",
      });
      await fetchBanners();
      return true;
    } catch (err) {
      console.error('Erreur lors de la modification du statut de la bannière:', err);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut de la bannière",
        variant: "destructive"
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
