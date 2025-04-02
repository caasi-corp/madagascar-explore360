
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  UserPlus,
  MoreVertical,
  Mail,
  User,
  Lock
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
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'editor' | 'author';
  active: boolean;
  lastLogin: string;
}

const AdminUserManagement = () => {
  const [users, setUsers] = useState<UserData[]>([
    { 
      id: 'U001', 
      firstName: 'Admin', 
      lastName: 'User',
      email: 'admin@northgascartours.com',
      role: 'admin',
      active: true,
      lastLogin: '2023-09-15'
    },
    { 
      id: 'U002', 
      firstName: 'Marie', 
      lastName: 'Martin',
      email: 'marie.martin@northgascartours.com',
      role: 'manager',
      active: true,
      lastLogin: '2023-09-14'
    },
    { 
      id: 'U003', 
      firstName: 'Jean', 
      lastName: 'Dupont',
      email: 'jean.dupont@northgascartours.com',
      role: 'editor',
      active: true,
      lastLogin: '2023-09-10'
    },
    { 
      id: 'U004', 
      firstName: 'Sophie', 
      lastName: 'Lefebvre',
      email: 'sophie.lefebvre@northgascartours.com',
      role: 'author',
      active: false,
      lastLogin: '2023-08-27'
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'author',
    password: '',
    confirmPassword: '',
  });
  
  const { toast } = useToast();

  const openUserDialog = (user?: UserData) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        password: '',
        confirmPassword: '',
      });
    } else {
      setSelectedUser(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: 'author',
        password: '',
        confirmPassword: '',
      });
    }
    setIsUserDialogOpen(true);
  };

  const openDeleteDialog = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      
      toast({
        title: "Utilisateur supprimé",
        description: `L'utilisateur ${selectedUser.firstName} ${selectedUser.lastName} a été supprimé avec succès`,
        variant: "default",
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedUser) {
      // Mise à jour d'un utilisateur existant
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { 
          ...u, 
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          role: formData.role as 'admin' | 'manager' | 'editor' | 'author'
        } : u
      ));
      
      toast({
        title: "Utilisateur mis à jour",
        description: `L'utilisateur ${formData.firstName} ${formData.lastName} a été mis à jour avec succès`,
        variant: "default",
      });
    } else {
      // Création d'un nouvel utilisateur
      const newId = `U${(users.length + 1).toString().padStart(3, '0')}`;
      setUsers([...users, { 
        id: newId, 
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role as 'admin' | 'manager' | 'editor' | 'author',
        active: true,
        lastLogin: '-'
      }]);
      
      toast({
        title: "Utilisateur créé",
        description: `L'utilisateur ${formData.firstName} ${formData.lastName} a été créé avec succès`,
        variant: "default",
      });
    }
    
    setIsUserDialogOpen(false);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, active: !u.active } : u
    ));
    
    const user = users.find(u => u.id === id);
    if (user) {
      toast({
        title: user.active ? "Utilisateur désactivé" : "Utilisateur activé",
        description: `L'utilisateur ${user.firstName} ${user.lastName} a été ${user.active ? 'désactivé' : 'activé'} avec succès`,
        variant: "default",
      });
    }
  };

  const resetPassword = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user) {
      toast({
        title: "Réinitialisation du mot de passe",
        description: `Un e-mail de réinitialisation du mot de passe a été envoyé à ${user.email}`,
        variant: "default",
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-500">Administrateur</Badge>;
      case 'manager':
        return <Badge variant="default">Manager</Badge>;
      case 'editor':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Éditeur</Badge>;
      case 'author':
        return <Badge variant="secondary">Auteur</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
        <Button 
          className="bg-madagascar-green hover:bg-madagascar-green/80 text-white"
          onClick={() => openUserDialog()}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter un Utilisateur
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Rechercher un utilisateur..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Tous les utilisateurs</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Administrateurs</DropdownMenuItem>
                <DropdownMenuItem>Managers</DropdownMenuItem>
                <DropdownMenuItem>Éditeurs</DropdownMenuItem>
                <DropdownMenuItem>Auteurs</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Utilisateurs actifs</DropdownMenuItem>
                <DropdownMenuItem>Utilisateurs inactifs</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">
                        {user.firstName} {user.lastName}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <Badge variant={user.active ? "default" : "secondary"} className={user.active ? "bg-green-500" : ""}>
                        {user.active ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin === '-' ? 'Jamais' : new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => openUserDialog(user)}
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
                            <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                              {user.active ? 'Désactiver' : 'Activer'} le compte
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => resetPassword(user.id)}>
                              Réinitialiser le mot de passe
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openUserDialog(user)}>
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => openDeleteDialog(user)}
                              className="text-destructive focus:text-destructive"
                              disabled={user.id === 'U001'} // Empêche la suppression de l'utilisateur admin
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

      {/* Dialog for adding/editing users */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
            </DialogTitle>
            <DialogDescription>
              {selectedUser 
                ? 'Modifiez les informations de l\'utilisateur ci-dessous.' 
                : 'Créez un nouvel utilisateur pour le système d\'administration.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input 
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input 
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  className="pl-9"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({...formData, role: value as 'admin' | 'manager' | 'editor' | 'author'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="editor">Éditeur</SelectItem>
                  <SelectItem value="author">Auteur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {!selectedUser && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      id="password"
                      name="password"
                      type="password"
                      className="pl-9"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={!selectedUser}
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Au moins 8 caractères.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="pl-9"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!selectedUser}
                    />
                  </div>
                </div>
              </>
            )}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-madagascar-green hover:bg-madagascar-green/80">
                {selectedUser ? 'Mettre à jour' : 'Ajouter'}
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
              Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedUser?.firstName} {selectedUser?.lastName} ?
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
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUserManagement;
