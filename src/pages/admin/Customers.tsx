
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowDownAZ, 
  Eye, 
  MoreVertical,
  Mail,
  Clock,
  Download,
  Trash2
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

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bookings: number;
  registrationDate: string;
  lastActive: string;
  status: 'Actif' | 'Inactif' | 'Nouveau';
}

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { 
      id: 'C001', 
      firstName: 'Jean', 
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      phone: '+33 6 12 34 56 78',
      bookings: 3,
      registrationDate: '2023-01-15',
      lastActive: '2023-09-05',
      status: 'Actif'
    },
    { 
      id: 'C002', 
      firstName: 'Emma', 
      lastName: 'Martin',
      email: 'emma.martin@example.com',
      phone: '+33 6 98 76 54 32',
      bookings: 1,
      registrationDate: '2023-05-22',
      lastActive: '2023-09-01',
      status: 'Nouveau'
    },
    { 
      id: 'C003', 
      firstName: 'Michel', 
      lastName: 'Blanc',
      email: 'michel.blanc@example.com',
      phone: '+33 6 45 67 89 01',
      bookings: 5,
      registrationDate: '2022-11-08',
      lastActive: '2023-09-10',
      status: 'Actif'
    },
    { 
      id: 'C004', 
      firstName: 'Sophie', 
      lastName: 'Garcia',
      email: 'sophie.garcia@example.com',
      phone: '+33 6 21 43 65 87',
      bookings: 2,
      registrationDate: '2023-03-30',
      lastActive: '2023-07-12',
      status: 'Inactif'
    },
    { 
      id: 'C005', 
      firstName: 'Pierre', 
      lastName: 'Dubois',
      email: 'pierre.dubois@example.com',
      phone: '+33 6 78 90 12 34',
      bookings: 4,
      registrationDate: '2022-09-14',
      lastActive: '2023-09-09',
      status: 'Actif'
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter(customer => customer.id !== selectedCustomer.id));
      
      toast({
        title: "Client supprimé",
        description: `Le client ${selectedCustomer.firstName} ${selectedCustomer.lastName} a été supprimé avec succès`,
        variant: "default",
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedCustomer(null);
    }
  };

  const openDeleteDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const filteredCustomers = customers.filter(customer => 
    customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Actif':
        return <Badge className="bg-green-500">Actif</Badge>;
      case 'Nouveau':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Nouveau</Badge>;
      case 'Inactif':
        return <Badge variant="secondary">Inactif</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Rechercher un client..." 
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
                <DropdownMenuItem>Tous les clients</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Clients actifs</DropdownMenuItem>
                <DropdownMenuItem>Nouveaux clients</DropdownMenuItem>
                <DropdownMenuItem>Clients inactifs</DropdownMenuItem>
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
                <DropdownMenuItem>Réservations (croissant)</DropdownMenuItem>
                <DropdownMenuItem>Réservations (décroissant)</DropdownMenuItem>
                <DropdownMenuItem>Date d'inscription (récent)</DropdownMenuItem>
                <DropdownMenuItem>Date d'inscription (ancien)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-center">Réservations</TableHead>
                <TableHead>Inscription</TableHead>
                <TableHead>Dernière activité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucun client trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.firstName} {customer.lastName}</div>
                        <div className="text-sm text-muted-foreground">{customer.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {customer.email}
                        </div>
                        <div className="text-sm">{customer.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{customer.bookings}</TableCell>
                    <TableCell>{new Date(customer.registrationDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" /> 
                        {new Date(customer.lastActive).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              Voir le profil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Voir les réservations
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Envoyer un e-mail
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => openDeleteDialog(customer)}
                              className="text-destructive focus:text-destructive"
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

      {/* Dialog for confirming deletion */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le client {selectedCustomer?.firstName} {selectedCustomer?.lastName} ?
              Cette action est irréversible et supprimera toutes les données associées à ce client.
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

export default AdminCustomers;
