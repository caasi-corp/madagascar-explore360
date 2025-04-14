
import { Session } from '@supabase/supabase-js';
import { UserWithProfile } from '@/types/supabase';

export interface AuthContextType {
  session: Session | null;
  user: UserWithProfile | null;
  profile: any | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<any>;
}
