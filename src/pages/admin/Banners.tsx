
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BannersList from '@/components/admin/banners/BannersList';
import AddBannerCard from '@/components/admin/banners/AddBannerCard';
import BannerGuide from '@/components/admin/banners/BannerGuide';
import BannerExamples from '@/components/admin/banners/BannerExamples';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';
import { initDB } from '@/lib/DatabaseX/db';

const Banners: React.FC = () => {
  useEffect(() => {
    // S'assurer que la base de données est initialisée
    const initDatabase = async () => {
      try {
        await initDB();
        console.log('Base de données initialisée avec succès depuis la page Banners');
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
      }
    };

    initDatabase();
  }, []);

  const handleResetDatabase = async () => {
    try {
      const { resetDB } = await import('@/lib/DatabaseX/db');
      await resetDB();
      console.log('Base de données réinitialisée avec succès');
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la réinitialisation de la base de données:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des bannières</h1>
        <Button variant="outline" size="sm" onClick={handleResetDatabase}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Réinitialiser la base de données
        </Button>
      </div>

      <Tabs defaultValue="banners">
        <TabsList>
          <TabsTrigger value="banners">Bannières</TabsTrigger>
          <TabsTrigger value="add">Ajouter</TabsTrigger>
          <TabsTrigger value="guide">Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="banners" className="mt-6">
          <BannersList />
        </TabsContent>
        
        <TabsContent value="add" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <AddBannerCard />
            <BannerGuide />
          </div>
        </TabsContent>
        
        <TabsContent value="guide" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <BannerGuide />
            <BannerExamples />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Banners;
