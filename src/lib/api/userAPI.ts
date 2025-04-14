
import { supabase } from '@/integrations/supabase/client';

export const userAPI = {
  // Récupérer tous les utilisateurs (pour l'admin)
  async getAll() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer un utilisateur par ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
      return null;
    }
    
    return data;
  },
  
  // Créer un utilisateur (inscription)
  async register({ email, password, firstName, lastName }: { email: string; password: string; firstName: string; lastName: string }) {
    try {
      // Inscription avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
      
      if (authError) throw authError;
      if (!authData.user) throw new Error("Échec de l'inscription");
      
      return {
        id: authData.user.id,
        email: authData.user.email,
        firstName,
        lastName,
        role: 'user',
      };
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  },
  
  // Authentifier un utilisateur
  async authenticate(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      if (!data.user) throw new Error("Échec de l'authentification");
      
      // Récupérer les informations de profil
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      return {
        id: data.user.id,
        email: data.user.email,
        firstName: profile?.first_name || '',
        lastName: profile?.last_name || '',
        role: profile?.role || 'user',
      };
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      throw error;
    }
  },
  
  // Mettre à jour un utilisateur
  async update(id: string, userData: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        // Ici, nous ne mettons pas à jour le mot de passe directement car il est géré par Auth
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
      throw error;
    }
    
    // Si on veut aussi mettre à jour le mot de passe
    if (userData.password) {
      // Mettre à jour le mot de passe via l'API Auth
      const { error: passwordError } = await supabase.auth.updateUser({
        password: userData.password,
      });
      
      if (passwordError) {
        console.error(`Erreur lors de la mise à jour du mot de passe pour l'utilisateur ${id}:`, passwordError);
        throw passwordError;
      }
    }
    
    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      role: data.role,
    };
  },
  
  // Supprimer un utilisateur
  async delete(id: string) {
    // Pour supprimer un utilisateur, nous devons supprimer le compte auth
    // Supabase supprimera automatiquement le profil associé grâce à la contrainte ON DELETE CASCADE
    const { error } = await supabase.auth.admin.deleteUser(id);
    
    if (error) {
      console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
      throw error;
    }
    
    return true;
  }
};
