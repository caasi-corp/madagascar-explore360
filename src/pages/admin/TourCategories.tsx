
import React, { useState } from 'react';
import { 
  PlusCircle, 
  Edit2, 
  Trash2, 
  ArrowDown,
  ArrowUp,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  order: number;
}

const AdminTourCategories = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Nature', slug: 'nature', count: 8, order: 1 },
    { id: '2', name: 'Aventure', slug: 'aventure', count: 5, order: 2 },
    { id: '3', name: 'Plage', slug: 'plage', count: 3, order: 3 },
    { id: '4', name: 'Culture', slug: 'culture', count: 6, order: 4 },
    { id: '5', name: 'Gastronomie', slug: 'gastronomie', count: 2, order: 5 },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const { toast } = useToast();

  const handleAdd = () => {
    if (!newCategoryName.trim()) return;
    
    const slug = newCategoryName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
      
    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      slug,
      count: 0,
      order: categories.length + 1
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setIsAddDialogOpen(false);
    
    toast({
      title: "Catégorie ajoutée",
      description: `La catégorie "${newCategoryName}" a été ajoutée avec succès`,
    });
  };

  const handleEdit = () => {
    if (!editingCategory || !editingCategory.name.trim()) return;
    
    const slug = editingCategory.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
    
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...editingCategory, slug } 
        : cat
    ));
    
    setEditingCategory(null);
    
    toast({
      title: "Catégorie mise à jour",
      description: "La catégorie a été modifiée avec succès",
    });
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    
    toast({
      title: "Catégorie supprimée",
      description: "La catégorie a été supprimée avec succès",
    });
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    
    const newCategories = [...categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[index - 1];
    newCategories[index - 1] = temp;
    
    // Update order values
    newCategories.forEach((cat, idx) => {
      cat.order = idx + 1;
    });
    
    setCategories(newCategories);
  };

  const handleMoveDown = (index: number) => {
    if (index >= categories.length - 1) return;
    
    const newCategories = [...categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[index + 1];
    newCategories[index + 1] = temp;
    
    // Update order values
    newCategories.forEach((cat, idx) => {
      cat.order = idx + 1;
    });
    
    setCategories(newCategories);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Catégories de Circuits</h1>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-madagascar-green hover:bg-madagascar-green/80 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une Catégorie
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestion des Catégories</CardTitle>
          <CardDescription>
            Organisez vos circuits en catégories pour faciliter la navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ordre</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-center">Circuits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell className="w-[100px]">
                    <div className="flex items-center gap-2">
                      <span>{category.order}</span>
                      <div className="flex flex-col gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-5 w-5"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-5 w-5"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === categories.length - 1}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {editingCategory?.id === category.id ? (
                      <Input 
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                        className="w-full max-w-[200px]"
                      />
                    ) : (
                      <span className="font-medium">{category.name}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {editingCategory?.id === category.id ? (
                      editingCategory.name
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w-]+/g, '')
                    ) : (
                      category.slug
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{category.count}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {editingCategory?.id === category.id ? (
                        <>
                          <Button variant="outline" size="icon" onClick={handleEdit}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setEditingCategory(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setEditingCategory(category)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(category.id)}
                        disabled={category.count > 0}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal for adding a new category */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une catégorie</DialogTitle>
            <DialogDescription>
              Créez une nouvelle catégorie pour organiser vos circuits
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Nom de la catégorie"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            {newCategoryName && (
              <p className="mt-2 text-sm text-muted-foreground">
                Slug: <span className="font-mono">{newCategoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button onClick={handleAdd} disabled={!newCategoryName.trim()}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTourCategories;
