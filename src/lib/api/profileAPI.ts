
import { supabase } from '@/integrations/supabase/client';

/**
 * API pour gérer les opérations de profil utilisateur avec Supabase
 */
export const profileAPI = {
  /**
   * Récupère le profil actuel de l'utilisateur
   */
  getCurrentProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Aucun utilisateur connecté');
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  },
  
  /**
   * Récupère un profil utilisateur par son ID
   */
  getProfileById: async (id: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  },
  
  /**
   * Met à jour le profil de l'utilisateur actuel
   */
  updateProfile: async (profileData: {
    first_name?: string;
    last_name?: string;
    email?: string;
  }) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Aucun utilisateur connecté');
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  },
  
  /**
   * Met à jour le mot de passe de l'utilisateur
   */
  updatePassword: async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      throw error;
    }
    
    return true;
  }
};
