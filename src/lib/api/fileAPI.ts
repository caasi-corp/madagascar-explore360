
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export const fileAPI = {
  // Télécharger une image dans le bucket Supabase
  async uploadImage(file: File, bucket: string = 'images') {
    try {
      // Vérifier que le fichier est une image
      if (!file.type.startsWith('image/')) {
        throw new Error('Le fichier doit être une image');
      }
      
      // Créer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Télécharger l'image
      const { data, error } = await supabase
        .storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        throw error;
      }
      
      // Récupérer l'URL publique de l'image
      const { data: publicURLData } = supabase
        .storage
        .from(bucket)
        .getPublicUrl(filePath);
      
      return {
        path: data.path,
        url: publicURLData.publicUrl
      };
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image:", error);
      throw error;
    }
  },
  
  // Supprimer une image du bucket Supabase
  async deleteImage(filePath: string, bucket: string = 'images') {
    try {
      // Extraire le nom du fichier de l'URL ou du chemin complet
      const fileName = filePath.includes('/')
        ? filePath.split('/').pop()
        : filePath;
      
      if (!fileName) {
        throw new Error('Nom de fichier invalide');
      }
      
      const { error } = await supabase
        .storage
        .from(bucket)
        .remove([fileName]);
      
      if (error) {
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image:", error);
      throw error;
    }
  },
  
  // Télécharger plusieurs images et retourner leurs URLs
  async uploadMultipleImages(files: File[], bucket: string = 'images') {
    try {
      const uploadPromises = files.map(file => this.uploadImage(file, bucket));
      const results = await Promise.all(uploadPromises);
      
      return results;
    } catch (error) {
      console.error("Erreur lors de l'upload de plusieurs images:", error);
      throw error;
    }
  }
};
