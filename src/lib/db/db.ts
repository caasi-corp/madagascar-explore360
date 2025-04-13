
import { supabase } from "@/integrations/supabase/client";

export const initDB = async () => {
  try {
    const { data, error } = await supabase.from('tours').select('count');
    if (error) {
      console.error("Erreur de connexion à Supabase:", error);
      return false;
    }
    console.log("Connexion à Supabase réussie!");
    return true;
  } catch (error) {
    console.error("Erreur d'initialisation de la base de données:", error);
    return false;
  }
};
