
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BannersList from '@/components/admin/banners/BannersList';
import AddBannerCard from '@/components/admin/banners/AddBannerCard';
import BannerGuide from '@/components/admin/banners/BannerGuide';
import BannerExamples from '@/components/admin/banners/BannerExamples';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useBanners } from '@/hooks/useBanners';

const Banners: React.FC = () => {
  const { fetchBanners } = useBanners();
  
  const handleRefresh = () => {
    fetchBanners();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des bannières</h1>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          className="flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
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
