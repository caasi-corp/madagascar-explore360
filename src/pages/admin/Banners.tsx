
import React, { useState, useRef } from 'react';
import { useBanners } from '@/hooks/useBanners';
import { Banner } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Trash, Edit, Plus, Upload, Image } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const pageTypes = [
  { value: "home", label: "Accueil" },
  { value: "tours", label: "Circuits" },
  { value: "vehicules", label: "Véhicules" },
  { value: "hotels", label: "Hôtels" },
  { value: "contact", label: "Contact" },
  { value: "about", label: "À propos" }
];

const BannersList: React.FC = () => {
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

interface BannerFormProps {
  initialData?: Banner;
  mode: 'add' | 'edit';
  onClose?: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ initialData, mode, onClose }) => {
  const { addBanner, updateBanner } = useBanners();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialData?.imagePath || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    page: initialData?.page || 'home',
    description: initialData?.description || '',
    isActive: initialData?.isActive || true,
    imagePath: initialData?.imagePath || ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérification du type de fichier
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.error("Format de fichier non supporté", {
          description: "Formats acceptés: JPG, PNG, WebP"
        });
        return;
      }
      
      // Vérifier la taille du fichier (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Fichier trop volumineux", {
          description: "La taille maximum est de 5MB"
        });
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let imagePath = formData.imagePath;
      
      // Si un nouveau fichier a été sélectionné, nous simulons un upload
      // Dans un environnement réel, on enverrait le fichier à un serveur ou service de stockage
      if (imageFile) {
        // Simuler le délai d'upload
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Ici, dans un cas réel, on récupérerait l'URL depuis le serveur
        // Pour la démo, on utilise un Data URL
        const reader = new FileReader();
        const dataUrlPromise = new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
        });
        
        reader.readAsDataURL(imageFile);
        imagePath = await dataUrlPromise;
      }
      
      const bannerData = {
        ...formData,
        imagePath,
      };
      
      let success = false;
      
      if (mode === 'add') {
        success = await addBanner(bannerData);
        if (success) {
          toast.success("Bannière ajoutée", {
            description: "La bannière a été ajoutée avec succès."
          });
        }
      } else {
        if (initialData) {
          success = await updateBanner(initialData.id, bannerData);
          if (success) {
            toast.success("Bannière mise à jour", {
              description: "La bannière a été mise à jour avec succès."
            });
          }
        }
      }
      
      if (success && onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Une erreur est survenue", {
        description: "Impossible de traiter votre demande."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom de la bannière</Label>
          <Input 
            id="name" 
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ex: Bannière Accueil Principal"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="page">Page</Label>
          <Select 
            value={formData.page}
            onValueChange={(value) => handleChange('page', value)}
          >
            <SelectTrigger id="page">
              <SelectValue placeholder="Choisir une page" />
            </SelectTrigger>
            <SelectContent>
              {pageTypes.map(page => (
                <SelectItem key={page.value} value={page.value}>
                  {page.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description (optionnelle)</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Description de la bannière..."
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="image">Image de bannière</Label>
            <span className="text-xs text-muted-foreground">Formats: JPG, PNG, WebP (Max: 5MB)</span>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            {preview ? (
              <div className="relative">
                <img 
                  src={preview} 
                  alt="Aperçu" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={handleImageButtonClick}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Changer l'image
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="w-full h-40 bg-muted flex flex-col items-center justify-center cursor-pointer"
                onClick={handleImageButtonClick}
              >
                <Image className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Cliquez pour ajouter une image</p>
              </div>
            )}
          </div>
          
          <Input 
            ref={fileInputRef}
            id="image" 
            type="file" 
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {/* Alternative de saisie d'URL */}
          <div className="mt-2">
            <Label htmlFor="imagePath">Ou entrez une URL d'image</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="imagePath"
                value={imageFile ? '' : formData.imagePath}
                onChange={(e) => {
                  handleChange('imagePath', e.target.value);
                  if (e.target.value) {
                    setPreview(e.target.value);
                    setImageFile(null);
                  } else {
                    setPreview(null);
                  }
                }}
                placeholder="https://example.com/image.jpg"
                disabled={!!imageFile}
              />
              {formData.imagePath && !imageFile && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setPreview(formData.imagePath);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Switch 
            id="isActive" 
            checked={formData.isActive}
            onCheckedChange={(checked) => handleChange('isActive', checked)}
          />
          <Label htmlFor="isActive">Activer cette bannière</Label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
        )}
        <Button 
          type="submit" 
          className="bg-madagascar-green hover:bg-madagascar-green/80 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {mode === 'add' ? 'Ajouter' : 'Mettre à jour'}
        </Button>
      </div>
    </form>
  );
};

const AddBannerDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <DialogContent className="sm:max-w-[650px]">
      <DialogHeader>
        <DialogTitle>Ajouter une nouvelle bannière</DialogTitle>
        <DialogDescription>
          Complétez les informations pour créer une nouvelle bannière
        </DialogDescription>
      </DialogHeader>
      <BannerForm 
        mode="add" 
        onClose={() => setOpen(false)}
      />
    </DialogContent>
  );
};

const AddBannerCard: React.FC = () => {
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

const BannerGuide: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Guide des bannières</CardTitle>
        <CardDescription>
          Conseils pour créer des bannières efficaces
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Formats recommandés</h3>
          <p className="text-sm text-muted-foreground">
            Pour une apparence optimale, utilisez des images au format 1920x600 pixels.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Conseils pour les images</h3>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Utilisez des images de haute qualité mais optimisées pour le web</li>
            <li>Préférez les images avec un bon contraste pour la lisibilité du texte</li>
            <li>Évitez les images trop chargées ou avec trop de détails</li>
            <li>Assurez-vous que l'image correspond au contenu de la page</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Gestion des bannières actives</h3>
          <p className="text-sm text-muted-foreground">
            Une seule bannière peut être active par page. Activer une bannière désactivera automatiquement les autres bannières sur la même page.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

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
            <Card>
              <CardHeader>
                <CardTitle>Exemples de bannières</CardTitle>
                <CardDescription>
                  Inspirez-vous de ces exemples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="rounded-md overflow-hidden border">
                    <img 
                      src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
                      alt="Exemple de bannière" 
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <p className="text-sm text-center">Bannière avec paysage naturel</p>
                </div>
                
                <div className="space-y-2">
                  <div className="rounded-md overflow-hidden border">
                    <img 
                      src="https://images.unsplash.com/photo-1518877593221-1f28583780b4" 
                      alt="Exemple de bannière" 
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <p className="text-sm text-center">Bannière avec faune marine</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Banners;
