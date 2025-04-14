
import { supabase } from "@/integrations/supabase/client";

export const initDB = async () => {
  try {
    console.log("Tentative de connexion à Supabase...");
    const { data, error } = await supabase.from('tours').select('count');
    
    if (error) {
      console.error("Erreur de connexion à Supabase:", error);
      if (error.message.includes("infinite recursion")) {
        console.error("Erreur de récursion infinie détectée - problème de politique RLS");
      }
      return false;
    }
    
    console.log("Connexion à Supabase réussie!");
    return true;
  } catch (error) {
    console.error("Erreur d'initialisation de la base de données:", error);
    return false;
  }
};

// Initialiser la base de données au démarrage de l'application
initDB().then(success => {
  if (success) {
    console.log("Base de données initialisée avec succès");
  } else {
    console.error("Échec de l'initialisation de la base de données");
  }
});
