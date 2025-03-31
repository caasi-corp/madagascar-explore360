
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CustomerType {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  registrationDate: string;
  lastVisit: string;
  bookingsCount: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'blocked';
}

const DEMO_CUSTOMERS: CustomerType[] = [
  {
    id: 'C001',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    address: '15 Rue de Paris, 75001 Paris',
    country: 'France',
    registrationDate: '2023-03-15',
    lastVisit: '2023-08-22',
    bookingsCount: 3,
    totalSpent: 1250,
    status: 'active',
  },
  {
    id: 'C002',
    name: 'Marie Laurent',
    email: 'marie.laurent@example.com',
    phone: '+33 6 98 76 54 32',
    address: '8 Avenue Victor Hugo, 69002 Lyon',
    country: 'France',
    registrationDate: '2023-04-23',
    lastVisit: '2023-09-01',
    bookingsCount: 1,
    totalSpent: 450,
    status: 'active',
  },
  {
    id: 'C003',
    name: 'Paul Martin',
    email: 'paul.martin@example.com',
    phone: '+33 6 45 67 89 01',
    address: '22 Boulevard des Capucines, 13001 Marseille',
    country: 'France',
    registrationDate: '2023-02-10',
    lastVisit: '2023-07-15',
    bookingsCount: 0,
    totalSpent: 0,
    status: 'inactive',
  },
  {
    id: 'C004',
    name: 'Sophie Petit',
    email: 'sophie.petit@example.com',
    phone: '+33 6 78 90 12 34',
    address: '5 Rue du Commerce, 33000 Bordeaux',
    country: 'France',
    registrationDate: '2023-01-05',
    lastVisit: '2023-09-10',
    bookingsCount: 5,
    totalSpent: 2300,
    status: 'active',
  },
  {
    id: 'C005',
    name: 'Thomas Bernard',
    email: 'thomas.bernard@example.com',
    phone: '+41 78 123 45 67',
    address: '10 Bahnhofstrasse, 8001 Zurich',
    country: 'Suisse',
    registrationDate: '2023-06-18',
    lastVisit: '2023-08-30',
    bookingsCount: 2,
    totalSpent: 1800,
    status: 'blocked',
  },
];

const statusColor = {
  active: 'bg-green-500',
  inactive: 'bg-yellow-500',
  blocked: 'bg-red-500',
};

const CustomersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState(DEMO_CUSTOMERS);
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/admin/customers/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/customers/edit/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/admin/customers/view/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: fr });
    } catch (error) {
      return dateString;
    }
  };
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  return (
    <AnimatedContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <Button onClick={handleAddNew} className="bg-madagascar-green hover:bg-madagascar-green/80">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un Client
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Clients ({customers.length})</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email, téléphone, pays..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" /> Filtres
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Liste des clients enregistrés</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Pays</TableHead>
                <TableHead>Inscription</TableHead>
                <TableHead>Réservations</TableHead>
                <TableHead>Total Dépensé</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{customer.name}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center text-xs">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-xs mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {customer.country}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(customer.registrationDate)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{customer.bookingsCount}</TableCell>
                    <TableCell>{formatPrice(customer.totalSpent)}</TableCell>
                    <TableCell>
                      <Badge className={statusColor[customer.status]}>
                        {customer.status === 'active' && 'Actif'}
                        {customer.status === 'inactive' && 'Inactif'}
                        {customer.status === 'blocked' && 'Bloqué'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(customer.id)}
                          title="Voir"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(customer.id)}
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(customer.id)}
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                    Aucun client trouvé avec ces critères de recherche.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default CustomersManagement;
