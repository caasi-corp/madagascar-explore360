
import { supabase } from '@/integrations/supabase/client';
import { Banner } from '@/lib/db/schema';

/**
 * API pour les opérations sur les bannières via Supabase
 */
export const bannerSupabaseAPI = {
  getAll: async (): Promise<Banner[]> => {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erreur lors de la récupération des bannières:', error);
      throw error;
    }
    
    return data.map(banner => ({
      id: banner.id,
      name: banner.name,
      imagePath: banner.image_path,
      page: banner.page,
      description: banner.description || '',
      isActive: banner.is_active,
      createdAt: banner.created_at,
      updatedAt: banner.updated_at || banner.created_at
    }));
  },
  
  getActiveByPage: async (page: string): Promise<Banner | undefined> => {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('page', page)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Erreur lors de la récupération de la bannière active pour ${page}:`, error);
      throw error;
    }
    
    if (data.length === 0) {
      return undefined;
    }
    
    const banner = data[0];
    return {
      id: banner.id,
      name: banner.name,
      imagePath: banner.image_path,
      page: banner.page,
      description: banner.description || '',
      isActive: banner.is_active,
      createdAt: banner.created_at,
      updatedAt: banner.updated_at || banner.created_at
    };
  },
  
  getById: async (id: string): Promise<Banner | undefined> => {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return undefined; // Bannière non trouvée
      }
      console.error(`Erreur lors de la récupération de la bannière ${id}:`, error);
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      imagePath: data.image_path,
      page: data.page,
      description: data.description || '',
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at || data.created_at
    };
  },
  
  add: async (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const now = new Date().toISOString();
    
    // Si cette bannière est active, désactiver les autres de la même page
    if (banner.isActive) {
      await bannerSupabaseAPI.deactivateOtherBanners(banner.page);
    }
    
    const { data, error } = await supabase
      .from('banners')
      .insert([{
        name: banner.name,
        image_path: banner.imagePath,
        page: banner.page,
        description: banner.description,
        is_active: banner.isActive,
        created_at: now,
        updated_at: now
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de l\'ajout de la bannière:', error);
      throw error;
    }
    
    return data.id;
  },
  
  deactivateOtherBanners: async (page: string): Promise<void> => {
    const { error } = await supabase
      .from('banners')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('page', page)
      .eq('is_active', true);
    
    if (error) {
      console.error(`Erreur lors de la désactivation des autres bannières pour la page ${page}:`, error);
      throw error;
    }
  },
  
  update: async (id: string, updates: Partial<Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> => {
    // Si on active cette bannière, désactiver les autres de la même page
    if (updates.isActive) {
      const banner = await bannerSupabaseAPI.getById(id);
      if (banner && !banner.isActive) {
        const page = updates.page || banner.page;
        await bannerSupabaseAPI.deactivateOtherBanners(page);
      }
    }
    
    const { error } = await supabase
      .from('banners')
      .update({
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.imagePath !== undefined && { image_path: updates.imagePath }),
        ...(updates.page !== undefined && { page: updates.page }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.isActive !== undefined && { is_active: updates.isActive }),
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) {
      console.error(`Erreur lors de la mise à jour de la bannière ${id}:`, error);
      return false;
    }
    
    return true;
  },
  
  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('banners')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Erreur lors de la suppression de la bannière ${id}:`, error);
      return false;
    }
    
    return true;
  }
};
