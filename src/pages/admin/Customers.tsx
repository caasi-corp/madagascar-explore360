
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  UserPlus,
  Eye, 
  Edit2,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  country: string;
  registeredDate: string;
  bookingsCount: number;
  totalSpent: number;
}

interface CustomerBooking {
  id: string;
  tour: string;
  date: string;
  amount: number;
  status: string;
}

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'C001',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '+33 6 12 34 56 78',
      address: '15 Rue de Paris',
      country: 'France',
      registeredDate: '2023-01-15',
      bookingsCount: 3,
      totalSpent: 1499,
    },
    {
      id: 'C002',
      name: 'Emma Martin',
      email: 'emma.martin@example.com',
      phone: '+44 7700 900123',
      country: 'Royaume-Uni',
      registeredDate: '2023-02-20',
      bookingsCount: 1,
      totalSpent: 349,
    },
    {
      id: 'C003',
      name: 'Michel Blanc',
      email: 'michel.blanc@example.com',
      phone: '+33 7 98 76 54 32',
      address: '8 Avenue des Champs-Élysées',
      country: 'France',
      registeredDate: '2023-03-10',
      bookingsCount: 2,
      totalSpent: 1099,
    },
    {
      id: 'C004',
      name: 'Sophie Garcia',
      email: 'sophie.garcia@example.com',
      country: 'Espagne',
      registeredDate: '2023-04-05',
      bookingsCount: 1,
      totalSpent: 699,
    },
    {
      id: 'C005',
      name: 'Pierre Dubois',
      email: 'pierre.dubois@example.com',
      phone: '+32 470 12 34 56',
      address: '22 Rue de la Loi',
      country: 'Belgique',
      registeredDate: '2023-05-18',
      bookingsCount: 1,
      totalSpent: 549,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Exemple de réservations pour le client sélectionné
  const customerBookings: CustomerBooking[] = [
    { id: 'B001', tour: 'Avenue des Baobabs', date: '2023-09-15', amount: 599, status: 'Confirmé' },
    { id: 'B003', tour: 'Parc National d\'Isalo', date: '2023-09-25', amount: 499, status: 'Confirmé' },
    { id: 'B006', tour: 'Ville de Tamatave', date: '2023-11-05', amount: 399, status: 'En attente' },
  ];

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmé':
        return <Badge className="bg-green-500">Confirmé</Badge>;
      case 'En attente':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">En attente</Badge>;
      case 'Annulé':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clients</h1>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un Client
          </Button>
        </div>
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
                  Pays
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Tous</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>France</DropdownMenuItem>
                <DropdownMenuItem>Royaume-Uni</DropdownMenuItem>
                <DropdownMenuItem>Espagne</DropdownMenuItem>
                <DropdownMenuItem>Belgique</DropdownMenuItem>
                <DropdownMenuItem>Allemagne</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Pays</TableHead>
                <TableHead className="text-center">Réservations</TableHead>
                <TableHead className="text-right">Total dépensé</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Aucun client trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.country}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{customer.bookingsCount}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{customer.totalSpent} €</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              Envoyer un e-mail
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Créer une réservation
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
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

      {/* Customer details dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(selectedCustomer.name)}</AvatarFallback>
                  </Avatar>
                  <span>{selectedCustomer.name}</span>
                </DialogTitle>
                <DialogDescription>
                  ID Client: {selectedCustomer.id}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="info">
                <TabsList className="mb-4">
                  <TabsTrigger value="info">Informations</TabsTrigger>
                  <TabsTrigger value="bookings">Réservations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </div>
                        <p>{selectedCustomer.email}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>Téléphone</span>
                        </div>
                        <p>{selectedCustomer.phone || 'Non renseigné'}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Adresse</span>
                      </div>
                      <p>{selectedCustomer.address || 'Non renseignée'}</p>
                      <p>{selectedCustomer.country}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Inscrit le</span>
                      </div>
                      <p>{format(new Date(selectedCustomer.registeredDate), 'dd MMMM yyyy', { locale: fr })}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Réservations totales</p>
                        <p className="text-xl font-bold">{selectedCustomer.bookingsCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Montant total dépensé</p>
                        <p className="text-xl font-bold">{selectedCustomer.totalSpent} €</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="bookings">
                  {customerBookings.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Circuit</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Montant</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customerBookings.map(booking => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.tour}</TableCell>
                            <TableCell>{format(new Date(booking.date), 'dd MMM yyyy', { locale: fr })}</TableCell>
                            <TableCell className="text-right">{booking.amount} €</TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Ce client n'a pas encore de réservation
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Fermer</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCustomers;
