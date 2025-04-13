
import { supabase } from "@/integrations/supabase/client";
import { User } from "../db/schema";

export const userAPI = {
  // Récupérer tous les utilisateurs (admin)
  getAll: async (): Promise<User[]> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      throw error;
    }
    
    return data || [];
  },
  
  // Récupérer un utilisateur par son ID
  getById: async (id: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Récupérer l'utilisateur actuel
  getCurrent: async (): Promise<User | null> => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (error) {
      console.error("Erreur lors de la récupération de l'utilisateur courant:", error);
      throw error;
    }
    
    return data;
  },
  
  // Mettre à jour un utilisateur
  update: async (id: string, updates: Partial<User>): Promise<User> => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
      throw error;
    }
    
    return data;
  }
};
