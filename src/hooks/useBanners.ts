
import { useState, useEffect } from 'react';
import { bannerAPI } from '@/lib/api/bannerAPI';
import { toast } from 'sonner';
import { BANNER_UPDATED_EVENT } from './useActiveBanner';
import { initDB } from '@/lib/DatabaseX/db';
import { DBXBanner } from '@/lib/DatabaseX/types';

// Fonction d'aide pour déclencher l'événement de mise à jour
const triggerBannerUpdateEvent = () => {
  console.log('Déclenchement de l\'événement de mise à jour des bannières');
  window.dispatchEvent(new Event(BANNER_UPDATED_EVENT));
};

export const useBanners = () => {
  const [banners, setBanners] = useState<DBXBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      console.log('Récupération de toutes les bannières...');
      
      // Initialiser la base de données
      await initDB();
      
      const data = await bannerAPI.getAll();
      console.log(`${data.length} bannières récupérées:`, data);
      
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

  const addBanner = async (banner: Omit<DBXBanner, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Ajout d\'une nouvelle bannière:', banner);
      const newBannerId = await bannerAPI.add(banner);
      console.log(`Bannière ajoutée avec l'ID: ${newBannerId}`);
      await fetchBanners();
      // Déclencher l'événement de mise à jour
      triggerBannerUpdateEvent();
      return true;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la bannière:', err);
      toast.error("Erreur", {
        description: "Impossible d'ajouter la bannière"
      });
      return false;
    }
  };

  const updateBanner = async (id: string, updates: Partial<Omit<DBXBanner, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      console.log(`Mise à jour de la bannière ${id}:`, updates);
      const success = await bannerAPI.update(id, updates);
      console.log(`Résultat de la mise à jour: ${success ? 'réussi' : 'échoué'}`);
      await fetchBanners();
      // Déclencher l'événement de mise à jour
      triggerBannerUpdateEvent();
      return success;
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
      console.log(`Suppression de la bannière ${id}`);
      const success = await bannerAPI.delete(id);
      console.log(`Résultat de la suppression: ${success ? 'réussi' : 'échoué'}`);
      await fetchBanners();
      // Déclencher l'événement de mise à jour
      triggerBannerUpdateEvent();
      return success;
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
      console.log(`Modification du statut de la bannière ${id} à ${isActive ? 'active' : 'inactive'}`);
      const success = await bannerAPI.update(id, { isActive });
      console.log(`Résultat de la modification: ${success ? 'réussi' : 'échoué'}`);
      await fetchBanners();
      // Déclencher l'événement de mise à jour
      triggerBannerUpdateEvent();
      return success;
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
