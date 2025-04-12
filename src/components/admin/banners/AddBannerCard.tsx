
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { AddBannerDialog } from './AddBannerDialog';

export const AddBannerCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une nouvelle bannière</CardTitle>
        <CardDescription>
          Créez une nouvelle bannière personnalisée pour vos pages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-madagascar-green hover:bg-madagascar-green/80 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle bannière
            </Button>
          </DialogTrigger>
          <AddBannerDialog />
        </Dialog>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <div className="text-sm text-muted-foreground">
          Les bannières apparaissent en haut de vos pages et sont un excellent moyen d'attirer l'attention sur des offres spéciales.
        </div>
      </CardFooter>
    </Card>
  );
};

export default AddBannerCard;
