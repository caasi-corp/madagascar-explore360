
import React, { useState } from 'react';
import { 
  PlusCircle, 
  Edit2, 
  Trash2, 
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  tourCount: number;
}

const AdminTourCategories = () => {
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: 'C001', 
      name: 'Nature', 
      slug: 'nature',
      description: 'Circuits axés sur la découverte de la nature et des paysages exceptionnels de Madagascar.',
      tourCount: 5
    },
    { 
      id: 'C002', 
      name: 'Aventure', 
      slug: 'aventure',
      description: 'Circuits offrant des expériences d\'aventure comme la randonnée, le trekking, etc.',
      tourCount: 3
    },
    { 
      id: 'C003', 
      name: 'Plage', 
      slug: 'plage',
      description: 'Séjours et circuits centrés sur les magnifiques plages de Madagascar.',
      tourCount: 2
    },
    { 
      id: 'C004', 
      name: 'Culture', 
      slug: 'culture',
      description: 'Découverte des traditions et de la culture malgache.',
      tourCount: 1
    },
    { 
      id: 'C005', 
      name: 'Faune', 
      slug: 'faune',
      description: 'Observation de la faune unique de Madagascar, notamment les lémuriens.',
      tourCount: 4
    },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });
  
  const { toast } = useToast();

  const openDialog = (category?: Category) => {
    if (category) {
      setCurrentCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description,
      });
    } else {
      setCurrentCategory(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
      });
    }
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (currentCategory) {
      setCategories(categories.filter(cat => cat.id !== currentCategory.id));
      
      toast({
        title: "Catégorie supprimée",
        description: `La catégorie "${currentCategory.name}" a été supprimée avec succès`,
        variant: "default",
      });
      
      setIsDeleteDialogOpen(false);
      setCurrentCategory(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug if name field changes and we're creating a new category
    if (name === 'name' && !currentCategory) {
      const generatedSlug = value.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      
      setFormData({
        ...formData,
        name: value,
        slug: generatedSlug
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === currentCategory.id ? { 
          ...cat, 
          name: formData.name, 
          slug: formData.slug, 
          description: formData.description 
        } : cat
      ));
      
      toast({
        title: "Catégorie mise à jour",
        description: `La catégorie "${formData.name}" a été mise à jour avec succès`,
        variant: "default",
      });
    } else {
      // Create new category
      const newId = `C${(categories.length + 1).toString().padStart(3, '0')}`;
      setCategories([...categories, { 
        id: newId, 
        name: formData.name, 
        slug: formData.slug, 
        description: formData.description,
        tourCount: 0
      }]);
      
      toast({
        title: "Catégorie créée",
        description: `La catégorie "${formData.name}" a été créée avec succès`,
        variant: "default",
      });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Catégories de Circuits</h1>
        <Button 
          onClick={() => openDialog()} 
          className="bg-madagascar-green hover:bg-madagascar-green/80 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une Catégorie
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Circuits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Aucune catégorie trouvée
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                    <TableCell className="text-center">{category.tourCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => openDialog(category)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openDialog(category)}>
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => openDeleteDialog(category)}
                              className="text-destructive focus:text-destructive"
                              disabled={category.tourCount > 0}
                            >
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog for adding/editing category */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}</DialogTitle>
            <DialogDescription>
              {currentCategory 
                ? 'Modifiez les informations de la catégorie ci-dessous.'
                : 'Créez une nouvelle catégorie pour vos circuits.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de la catégorie</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input 
                id="slug" 
                name="slug" 
                value={formData.slug} 
                onChange={handleInputChange} 
                required
                pattern="[a-z0-9-]+"
                title="Le slug ne doit contenir que des lettres minuscules, des chiffres et des tirets"
              />
              <p className="text-xs text-muted-foreground">
                Le slug est utilisé dans l'URL de la page de la catégorie.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                rows={3}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-madagascar-green hover:bg-madagascar-green/80">
                {currentCategory ? 'Mettre à jour' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for confirming deletion */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer la catégorie "{currentCategory?.name}" ?
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTourCategories;
