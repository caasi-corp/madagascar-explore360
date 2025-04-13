
import { useState, useEffect } from 'react';
import { bannerSupabaseAPI } from '@/lib/api/supabase/bannerAPI';
import { Banner } from '@/lib/db/schema';
import { toast } from 'sonner';
import { BANNER_UPDATED_EVENT } from './useActiveBanner';

// Sample fallback data for banners
const fallbackBanners: Banner[] = [
  {
    id: '1',
    name: 'Bannière Accueil',
    imagePath: 'https://images.unsplash.com/photo-1617360547704-3da8b5ad2e44',
    page: 'home',
    description: 'Bannière principale pour la page d\'accueil',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Bannière Tours',
    imagePath: 'https://images.unsplash.com/photo-1523592121529-f6dde35f079e',
    page: 'tours',
    description: 'Bannière pour la page des circuits',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Fonction d'aide pour déclencher l'événement de mise à jour
const triggerBannerUpdateEvent = () => {
  console.log('Déclenchement de l\'événement de mise à jour des bannières');
  window.dispatchEvent(new Event(BANNER_UPDATED_EVENT));
};

export const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      console.log('Récupération de toutes les bannières...');
      const data = await bannerSupabaseAPI.getAll();
      console.log(`${data.length} bannières récupérées:`, data);
      
      if (data && data.length > 0) {
        setBanners(data);
        setError(null);
      } else {
        console.log('Aucune bannière trouvée, utilisation des données de secours');
        setBanners(fallbackBanners);
        toast.info("Information", {
          description: "Les données de démonstration sont affichées car aucune bannière n'a été trouvée"
        });
      }
    } catch (err) {
      console.error('Erreur lors du chargement des bannières:', err);
      setError('Impossible de charger les bannières');
      setBanners(fallbackBanners);
      toast.error("Erreur", {
        description: "Impossible de charger les bannières. Données de démonstration affichées."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addBanner = async (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Ajout d\'une nouvelle bannière:', banner);
      const newBannerId = await bannerSupabaseAPI.add(banner);
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

  const updateBanner = async (id: string, updates: Partial<Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      console.log(`Mise à jour de la bannière ${id}:`, updates);
      const success = await bannerSupabaseAPI.update(id, updates);
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
      const success = await bannerSupabaseAPI.delete(id);
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
      const success = await bannerSupabaseAPI.update(id, { isActive });
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
