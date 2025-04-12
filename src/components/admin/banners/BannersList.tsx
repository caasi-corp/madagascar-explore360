
import React from 'react';
import { useBanners } from '@/hooks/useBanners';
import { Banner } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Eye, Trash, Edit, Plus, Image } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BannerForm } from './BannerForm';
import { AddBannerDialog } from './AddBannerDialog';

const TableSkeleton = () => (
  <div className="w-full rounded-md border">
    <div className="border-b px-4 py-3">
      <div className="flex items-center">
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-[100px] ml-4" />
        <Skeleton className="h-6 w-[100px] ml-4" />
        <Skeleton className="h-6 w-[100px] ml-4" />
      </div>
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="px-4 py-4 border-b last:border-0">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-24 rounded" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[160px]" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-9 w-9 rounded" />
            <Skeleton className="h-9 w-9 rounded" />
            <Skeleton className="h-9 w-9 rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Page types for reuse
export const pageTypes = [
  { value: "home", label: "Accueil" },
  { value: "tours", label: "Circuits" },
  { value: "vehicules", label: "Véhicules" },
  { value: "hotels", label: "Hôtels" },
  { value: "contact", label: "Contact" },
  { value: "about", label: "À propos" }
];

export const BannersList: React.FC = () => {
  const { banners, isLoading, error, toggleActive, deleteBanner } = useBanners();
  
  const getPageLabel = (pageValue: string) => {
    const page = pageTypes.find(p => p.value === pageValue);
    return page ? page.label : pageValue;
  };

  if (isLoading) return (
    <div className="space-y-4">
      <TableSkeleton />
    </div>
  );
  
  if (error) return (
    <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md">
      <h3 className="text-lg font-medium text-red-800 dark:text-red-300">Erreur</h3>
      <p className="mt-1 text-red-700 dark:text-red-300">{error}</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Aperçu</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Page</TableHead>
            <TableHead>État</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Image className="h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">Aucune bannière disponible</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une bannière
                      </Button>
                    </DialogTrigger>
                    <AddBannerDialog />
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <div className="w-24 h-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    {banner.imagePath ? (
                      <img 
                        src={banner.imagePath} 
                        alt={banner.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Erreur';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Image className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{banner.name}</div>
                </TableCell>
                <TableCell>{getPageLabel(banner.page)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={banner.isActive} 
                      onCheckedChange={(checked) => toggleActive(banner.id, checked)}
                    />
                    <span className={banner.isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                      {banner.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(banner.createdAt), 'Pp', { locale: fr })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Aperçu</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Aperçu de la bannière</DialogTitle>
                          <DialogDescription>
                            {banner.name} - {getPageLabel(banner.page)}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="w-full h-64 overflow-hidden rounded-md bg-muted">
                          <img 
                            src={banner.imagePath}
                            alt={banner.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+non+disponible';
                            }}
                          />
                        </div>
                        <div className="mt-4">
                          <h3 className="font-medium">Informations</h3>
                          <dl className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Page</dt>
                              <dd>{getPageLabel(banner.page)}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Statut</dt>
                              <dd className={banner.isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                                {banner.isActive ? 'Active' : 'Inactive'}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Créée le</dt>
                              <dd>{format(new Date(banner.createdAt), 'Pp', { locale: fr })}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Dernière mise à jour</dt>
                              <dd>{format(new Date(banner.updatedAt), 'Pp', { locale: fr })}</dd>
                            </div>
                          </dl>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Modifier</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Modifier la bannière</DialogTitle>
                          <DialogDescription>
                            Modifiez les détails de la bannière
                          </DialogDescription>
                        </DialogHeader>
                        <BannerForm 
                          initialData={banner} 
                          mode="edit"
                        />
                      </DialogContent>
                    </Dialog>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Supprimer</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer cette bannière ? Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => {
                              deleteBanner(banner.id);
                              toast("Bannière supprimée", {
                                description: "La bannière a été supprimée avec succès."
                              });
                            }}
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BannersList;
