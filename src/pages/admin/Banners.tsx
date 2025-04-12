
import React, { useState } from 'react';
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
import { Eye, Trash, Edit, Plus, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const BannersList: React.FC = () => {
  const { banners, isLoading, error, toggleActive, deleteBanner } = useBanners();
  
  const pageTypes = [
    { value: "home", label: "Accueil" },
    { value: "tours", label: "Circuits" },
    { value: "vehicules", label: "Véhicules" },
    { value: "hotels", label: "Hôtels" },
    { value: "contact", label: "Contact" },
    { value: "about", label: "À propos" }
  ];

  const getPageLabel = (pageValue: string) => {
    const page = pageTypes.find(p => p.value === pageValue);
    return page ? page.label : pageValue;
  };

  if (isLoading) return <div className="py-10 text-center">Chargement des bannières...</div>;
  if (error) return <div className="py-10 text-center text-red-500">Erreur: {error}</div>;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aperçu</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Page</TableHead>
            <TableHead>État</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banners.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                Aucune bannière disponible
              </TableCell>
            </TableRow>
          ) : (
            banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={banner.imagePath} 
                      alt={banner.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>{banner.name}</TableCell>
                <TableCell>{getPageLabel(banner.page)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={banner.isActive} 
                      onCheckedChange={(checked) => toggleActive(banner.id, checked)}
                    />
                    <span>{banner.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(banner.createdAt), 'Pp', { locale: fr })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Aperçu
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Aperçu de la bannière</DialogTitle>
                          <DialogDescription>
                            {banner.name} - {getPageLabel(banner.page)}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="w-full h-64 overflow-hidden rounded-md">
                          <img 
                            src={banner.imagePath}
                            alt={banner.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <BannerEditDialog banner={banner} />
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash className="h-4 w-4 mr-1" />
                          Supprimer
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
                          <AlertDialogAction onClick={() => deleteBanner(banner.id)}>
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

interface BannerFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Banner;
  closeDialog?: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ onSubmit, initialData, closeDialog }) => {
  const [preview, setPreview] = useState<string | null>(initialData?.imagePath || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    page: initialData?.page || 'home',
    isActive: initialData?.isActive || true,
    imagePath: initialData?.imagePath || ''
  });

  const pageTypes = [
    { value: "home", label: "Accueil" },
    { value: "tours", label: "Circuits" },
    { value: "vehicules", label: "Véhicules" },
    { value: "hotels", label: "Hôtels" },
    { value: "contact", label: "Contact" },
    { value: "about", label: "À propos" }
  ];

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérification du type de fichier
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('Formats acceptés: JPG, PNG, WebP');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    
    // Si une image est fournie
    if (imageFile) {
      data.append('image', imageFile);
    } else if (formData.imagePath) {
      // Sinon, utiliser l'URL existante
      data.append('imagePath', formData.imagePath);
    } else {
      alert('Veuillez sélectionner une image');
      return;
    }
    
    // Ajouter les autres données du formulaire
    data.append('name', formData.name);
    data.append('page', formData.page);
    data.append('isActive', formData.isActive.toString());
    
    onSubmit(data);
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
          <div className="flex items-center justify-between">
            <Label htmlFor="image">Image de bannière</Label>
            <span className="text-xs text-muted-foreground">Formats: JPG, PNG, WebP</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Input 
              id="image" 
              type="file" 
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="border rounded-md p-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {imageFile ? imageFile.name : formData.imagePath ? 'Image existante' : 'Aucun fichier sélectionné'}
                </span>
                <label htmlFor="image" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Parcourir
                  </Button>
                </label>
              </div>
            </div>
          </div>
          
          {/* Aperçu de l'image */}
          {preview && (
            <div className="mt-4 border rounded-md overflow-hidden">
              <img
                src={preview}
                alt="Aperçu de la bannière"
                className="w-full h-40 object-cover"
              />
            </div>
          )}
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
        {closeDialog && (
          <Button type="button" variant="outline" onClick={closeDialog}>
            Annuler
          </Button>
        )}
        <Button type="submit" className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
          {initialData ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};

interface BannerEditDialogProps {
  banner: Banner;
}

const BannerEditDialog: React.FC<BannerEditDialogProps> = ({ banner }) => {
  const { updateBanner } = useBanners();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    // Dans un cas réel, il faudrait gérer l'upload d'image ici
    // et obtenir l'URL après upload
    
    const updates = {
      name: formData.get('name') as string,
      page: formData.get('page') as string,
      isActive: formData.get('isActive') === 'true',
      ...(formData.has('imagePath') ? { imagePath: formData.get('imagePath') as string } : {})
    };
    
    const success = await updateBanner(banner.id, updates);
    if (success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Edit className="h-4 w-4 mr-1" />
          Modifier
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
          onSubmit={handleSubmit}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

const AddBannerCard: React.FC = () => {
  const { addBanner } = useBanners();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    // Dans un cas réel, il faudrait gérer l'upload d'image ici
    // Pour le moment, utilisons des URLs existantes
    
    const bannerData = {
      name: formData.get('name') as string,
      page: formData.get('page') as string,
      imagePath: formData.get('imagePath') as string || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      isActive: formData.get('isActive') === 'true'
    };
    
    const success = await addBanner(bannerData);
    if (success) {
      setOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une nouvelle bannière</CardTitle>
        <CardDescription>
          Créez une nouvelle bannière pour vos pages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-madagascar-green hover:bg-madagascar-green/80 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle bannière
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle bannière</DialogTitle>
              <DialogDescription>
                Complétez les informations pour créer une nouvelle bannière
              </DialogDescription>
            </DialogHeader>
            <BannerForm 
              onSubmit={handleSubmit} 
              closeDialog={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
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
        </TabsList>
        
        <TabsContent value="banners" className="mt-6">
          <BannersList />
        </TabsContent>
        
        <TabsContent value="add" className="mt-6">
          <AddBannerCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Banners;
