
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BannersList from '@/components/admin/banners/BannersList';
import AddBannerCard from '@/components/admin/banners/AddBannerCard';
import BannerGuide from '@/components/admin/banners/BannerGuide';
import BannerExamples from '@/components/admin/banners/BannerExamples';

const Banners: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des bannières</h1>
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
