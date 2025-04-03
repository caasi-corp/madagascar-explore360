
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  Edit2, 
  Trash2, 
  Filter, 
  ArrowDownAZ,
  Shield,
  MoreVertical,
  User,
  Mail,
  CalendarDays,
  Eye,
  UserPlus,
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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string | null;
  createdAt: string;
}

const AdminUserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    { 
      id: 'U001', 
      firstName: 'Admin', 
      lastName: 'User', 
      email: 'admin@northgascartours.com', 
      role: 'admin', 
      status: 'active',
      lastLogin: '2023-08-10T12:30:00',
      createdAt: '2023-01-15T08:00:00'
    },
    { 
      id: 'U002', 
      firstName: 'Pierre', 
      lastName: 'Martin', 
      email: 'user@northgascartours.com', 
      role: 'user', 
      status: 'active',
      lastLogin: '2023-08-12T09:45:00',
      createdAt: '2023-02-20T14:30:00'
    },
    { 
      id: 'U003', 
      firstName: 'Marie', 
      lastName: 'Dubois', 
      email: 'marie@example.com', 
      role: 'user', 
      status: 'active',
      lastLogin: '2023-08-05T16:20:00',
      createdAt: '2023-03-10T11:15:00'
    },
    { 
      id: 'U004', 
      firstName: 'Jean', 
      lastName: 'Dupont', 
      email: 'jean@example.com', 
      role: 'user', 
      status: 'inactive',
      lastLogin: '2023-07-15T10:10:00',
      createdAt: '2023-04-05T09:00:00'
    },
    { 
      id: 'U005', 
      firstName: 'Sophie', 
      lastName: 'Leroy', 
      email: 'sophie@example.com', 
      role: 'user', 
      status: 'pending',
      lastLogin: null,
      createdAt: '2023-08-11T16:45:00'
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    status: 'active',
  });
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    // Simule la suppression d'un utilisateur
    setUsers(users.filter(user => user.id !== id));
    
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès",
    });
  };

  const handleToggleStatus = (id: string) => {
    // Simule la modification du statut de l'utilisateur
    setUsers(users.map(user => 
      user.id === id ? { 
        ...user, 
        status: user.status === 'active' ? 'inactive' : 'active' 
      } : user
    ));
    
    toast({
      title: "Statut mis à jour",
      description: "Le statut de l'utilisateur a été mis à jour avec succès",
    });
  };

  const handleRoleChange = (id: string, newRole: 'admin' | 'user') => {
    // Simule la modification du rôle de l'utilisateur
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
    
    toast({
      title: "Rôle mis à jour",
      description: `L'utilisateur est maintenant ${newRole === 'admin' ? 'administrateur' : 'utilisateur'}`,
    });
  };

  const handleNewUserChange = (field: string, value: any) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateUser = () => {
    // Simule la création d'un nouvel utilisateur
    const newUserId = `U00${users.length + 1}`;
    
    setUsers([...users, {
      id: newUserId,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role as 'admin' | 'user',
      status: newUser.status as 'active' | 'inactive' | 'pending',
      lastLogin: null,
      createdAt: new Date().toISOString(),
    }]);
    
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      role: 'user',
      status: 'active',
    });
    
    setIsNewUserDialogOpen(false);
    
    toast({
      title: "Utilisateur créé",
      description: "Le nouvel utilisateur a été créé avec succès",
    });
  };

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get badge variant based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Actif</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-muted-foreground">Inactif</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">En attente</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/admin/settings">
              <Shield className="mr-2 h-4 w-4" />
              Rôles & Permissions
            </Link>
          </Button>
          <Button 
            className="bg-madagascar-green hover:bg-madagascar-green/80 text-white"
            onClick={() => setIsNewUserDialogOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un Utilisateur
          </Button>
        </div>
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
                <DropdownMenuItem>Utilisateurs</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Actifs</DropdownMenuItem>
                <DropdownMenuItem>Inactifs</DropdownMenuItem>
                <DropdownMenuItem>En attente</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ArrowDownAZ className="mr-2 h-4 w-4" />
                  Trier
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Nom (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Nom (Z-A)</DropdownMenuItem>
                <DropdownMenuItem>Date d'inscription (plus récente)</DropdownMenuItem>
                <DropdownMenuItem>Date d'inscription (plus ancienne)</DropdownMenuItem>
                <DropdownMenuItem>Dernière connexion</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><Checkbox /></TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-muted-foreground">ID: {user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? "default" : "outline"}>
                        {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3 text-muted-foreground" />
                        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> Voir le profil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" /> Envoyer un email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lock className="mr-2 h-4 w-4" /> Réinitialiser le mot de passe
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => handleToggleStatus(user.id)}>
                              {user.status === 'active' ? 'Désactiver le compte' : 'Activer le compte'}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onSelect={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}
                              disabled={user.id === 'U001' && user.role === 'admin'} // Prevent changing the main admin
                            >
                              {user.role === 'admin' ? 'Changer en Utilisateur' : 'Changer en Administrateur'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onSelect={() => handleDelete(user.id)}
                              className="text-destructive focus:text-destructive"
                              disabled={user.id === 'U001'} // Prevent deleting the main admin
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Supprimer
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

      <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
            <DialogDescription>
              Créez un nouveau compte utilisateur pour votre plateforme.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input 
                  id="firstName" 
                  value={newUser.firstName}
                  onChange={(e) => handleNewUserChange('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input 
                  id="lastName" 
                  value={newUser.lastName}
                  onChange={(e) => handleNewUserChange('lastName', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={newUser.email}
                onChange={(e) => handleNewUserChange('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select 
                value={newUser.role} 
                onValueChange={(value) => handleNewUserChange('role', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Utilisateur</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={newUser.status} 
                onValueChange={(value) => handleNewUserChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewUserDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateUser} className="bg-madagascar-green hover:bg-madagascar-green/90 text-white">
              Créer l'utilisateur
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUserManagement;
