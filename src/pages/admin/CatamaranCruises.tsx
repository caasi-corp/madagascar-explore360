
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Ship, 
  Search, 
  Plus, 
  Calendar, 
  Edit, 
  Trash, 
  Filter, 
  ArrowUpDown, 
  Eye,
  Download,
  Upload
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CatamaranCruises = () => {
  const [activeTab, setActiveTab] = useState("cruises");
  
  const cruises = [
    { 
      id: 'CR001', 
      name: 'Découverte de la Baie de Nosy Be', 
      destination: 'Nosy Be', 
      duration: '1 jour', 
      price: 180, 
      catamaran: 'Paradis Bleu',
      status: 'active',
      bookings: 24,
      nextDeparture: '2025-06-15'
    },
    { 
      id: 'CR002', 
      name: 'Les Îles de Mitsio', 
      destination: 'Archipel de Mitsio', 
      duration: '3 jours', 
      price: 650, 
      catamaran: 'Paradis Bleu',
      status: 'active',
      bookings: 18,
      nextDeparture: '2025-05-22'
    },
    { 
      id: 'CR003', 
      name: 'Tour de Nosy Komba', 
      destination: 'Nosy Komba', 
      duration: '2 jours', 
      price: 380, 
      catamaran: 'Océan Nomade',
      status: 'active',
      bookings: 12,
      nextDeparture: '2025-05-18'
    },
    { 
      id: 'CR004', 
      name: 'Expédition Radama', 
      destination: 'Îles Radama', 
      duration: '5 jours', 
      price: 990, 
      catamaran: 'Paradis Bleu',
      status: 'inactive',
      bookings: 8,
      nextDeparture: '2025-07-10'
    },
  ];
  
  const catamarans = [
    {
      id: 'CAT001',
      name: 'Paradis Bleu',
      type: 'Lagoon 42',
      capacity: 8,
      cabins: 4,
      length: '12.8m',
      status: 'available',
      bookings: 36,
      nextMaintenance: '2025-09-05'
    },
    {
      id: 'CAT002',
      name: 'Océan Nomade',
      type: 'Nautitech 40',
      capacity: 6,
      cabins: 3,
      length: '11.4m',
      status: 'maintenance',
      bookings: 28,
      nextMaintenance: '2025-06-10'
    }
  ];
  
  const upcomingDepartures = [
    {
      id: 'DEP001',
      cruise: 'Découverte de la Baie de Nosy Be',
      catamaran: 'Paradis Bleu',
      departure: '2025-05-15',
      passengersBooked: 4,
      capacity: 8,
      status: 'confirmed'
    },
    {
      id: 'DEP002',
      cruise: 'Tour de Nosy Komba',
      catamaran: 'Océan Nomade',
      departure: '2025-05-18',
      passengersBooked: 6,
      capacity: 6,
      status: 'full'
    },
    {
      id: 'DEP003',
      cruise: 'Les Îles de Mitsio',
      catamaran: 'Paradis Bleu',
      departure: '2025-05-22',
      passengersBooked: 2,
      capacity: 8,
      status: 'confirmed'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Croisières en Catamaran</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exporter
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Importer
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-northgascar-teal hover:bg-northgascar-teal/80">
                <Plus className="mr-2 h-4 w-4" /> Nouvelle Croisière
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle croisière</DialogTitle>
                <DialogDescription>
                  Remplissez le formulaire ci-dessous pour créer une nouvelle croisière.
                </DialogDescription>
              </DialogHeader>
              {/* Contenu du formulaire ici */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2 col-span-2">
                  <label htmlFor="cruise-name">Nom de la croisière</label>
                  <Input id="cruise-name" placeholder="Nom de la croisière" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="destination">Destination</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nosy-be">Nosy Be</SelectItem>
                      <SelectItem value="mitsio">Archipel de Mitsio</SelectItem>
                      <SelectItem value="nosy-komba">Nosy Komba</SelectItem>
                      <SelectItem value="radama">Îles Radama</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="catamaran">Catamaran</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un catamaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paradis-bleu">Paradis Bleu</SelectItem>
                      <SelectItem value="ocean-nomade">Océan Nomade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="duration">Durée</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 jour</SelectItem>
                      <SelectItem value="2">2 jours</SelectItem>
                      <SelectItem value="3">3 jours</SelectItem>
                      <SelectItem value="5">5 jours</SelectItem>
                      <SelectItem value="7">7 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="price">Prix par personne (€)</label>
                  <Input id="price" type="number" min="0" placeholder="Prix" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label htmlFor="description">Description</label>
                  <Input id="description" placeholder="Description de la croisière" />
                </div>
                <div className="col-span-2 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="active" />
                    <label htmlFor="active">Activer cette croisière</label>
                  </div>
                  <div className="space-x-2">
                    <Button variant="ghost">Annuler</Button>
                    <Button className="bg-northgascar-teal hover:bg-northgascar-teal/80">Enregistrer</Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="cruises">
              Croisières
            </TabsTrigger>
            <TabsTrigger value="catamarans">
              Catamarans
            </TabsTrigger>
            <TabsTrigger value="departures">
              Départs
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardContent className="p-0">
          <TabsContent value="cruises" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Nom
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Prix (€)
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Catamaran</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Réservations</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cruises.map((cruise) => (
                  <TableRow key={cruise.id}>
                    <TableCell>{cruise.id}</TableCell>
                    <TableCell>{cruise.name}</TableCell>
                    <TableCell>{cruise.destination}</TableCell>
                    <TableCell>{cruise.duration}</TableCell>
                    <TableCell>{cruise.price}</TableCell>
                    <TableCell>{cruise.catamaran}</TableCell>
                    <TableCell>
                      <Badge variant={cruise.status === 'active' ? 'default' : 'outline'}>
                        {cruise.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                    <TableCell>{cruise.bookings}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="catamarans" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacité</TableHead>
                  <TableHead>Cabines</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Réservations</TableHead>
                  <TableHead>Prochaine maintenance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {catamarans.map((catamaran) => (
                  <TableRow key={catamaran.id}>
                    <TableCell>{catamaran.id}</TableCell>
                    <TableCell>{catamaran.name}</TableCell>
                    <TableCell>{catamaran.type}</TableCell>
                    <TableCell>{catamaran.capacity} pers.</TableCell>
                    <TableCell>{catamaran.cabins}</TableCell>
                    <TableCell>
                      <Badge variant={catamaran.status === 'available' ? 'default' : 'secondary'}>
                        {catamaran.status === 'available' ? 'Disponible' : 'En maintenance'}
                      </Badge>
                    </TableCell>
                    <TableCell>{catamaran.bookings}</TableCell>
                    <TableCell>{catamaran.nextMaintenance}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="departures" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Croisière</TableHead>
                  <TableHead>Catamaran</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Date de départ
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Passagers</TableHead>
                  <TableHead>Capacité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingDepartures.map((departure) => (
                  <TableRow key={departure.id}>
                    <TableCell>{departure.id}</TableCell>
                    <TableCell>{departure.cruise}</TableCell>
                    <TableCell>{departure.catamaran}</TableCell>
                    <TableCell>{departure.departure}</TableCell>
                    <TableCell>{departure.passengersBooked}</TableCell>
                    <TableCell>{departure.capacity}</TableCell>
                    <TableCell>
                      <Badge variant={
                        departure.status === 'confirmed' 
                          ? 'default' 
                          : departure.status === 'full'
                            ? 'destructive'
                            : 'outline'
                      }>
                        {departure.status === 'confirmed' 
                          ? 'Confirmé' 
                          : departure.status === 'full'
                            ? 'Complet'
                            : 'En attente'
                        }
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default CatamaranCruises;
