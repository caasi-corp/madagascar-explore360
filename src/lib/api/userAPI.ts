
import { supabase } from "@/integrations/supabase/client";
import { User } from "../db/schema";

export const userAPI = {
  // Get all users (admin)
  getAll: async (): Promise<User[]> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) {
      console.error("Error retrieving users:", error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get a user by ID
  getById: async (id: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error retrieving user ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Get the current user
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
      console.error("Error retrieving current user:", error);
      throw error;
    }
    
    return data;
  },
  
  // Update a user
  update: async (id: string, updates: Partial<User>): Promise<User> => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Register a new user (this is handled by Supabase Auth and a trigger)
  register: async (userData: { email: string; password: string; first_name: string; last_name: string }): Promise<User | null> => {
    // Registration is handled by Supabase Auth in AuthContext.tsx
    // This is just a placeholder in case we need to add additional profile setup
    return null;
  },
  
  // Change password (requires current password)
  changePassword: async (newPassword: string): Promise<void> => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  }
};
