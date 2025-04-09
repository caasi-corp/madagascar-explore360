
// Je ne modifie qu'une partie de ce fichier car il est très long
// Voici les changements pour la partie supérieure du composant

import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  Download, 
  BarChart, 
  PieChart, 
  LineChart, 
  TrendingUp,
  User,
  Car,
  Plane,
  Building,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Données pour les graphiques
const revenueData = [
  { month: 'Jan', tours: 4500, carRental: 2300, hotels: 1800, flights: 3200 },
  { month: 'Fév', tours: 5200, carRental: 2800, hotels: 2100, flights: 3500 },
  { month: 'Mar', tours: 5800, carRental: 3200, hotels: 2400, flights: 3800 },
  { month: 'Avr', tours: 6100, carRental: 3500, hotels: 2600, flights: 4100 },
  { month: 'Mai', tours: 7200, carRental: 3900, hotels: 3000, flights: 4400 },
  { month: 'Juin', tours: 8400, carRental: 4300, hotels: 3300, flights: 4700 },
  { month: 'Juil', tours: 9200, carRental: 4800, hotels: 3800, flights: 5000 },
  { month: 'Août', tours: 10500, carRental: 5200, hotels: 4100, flights: 5500 },
  { month: 'Sep', tours: 9800, carRental: 4900, hotels: 3900, flights: 5200 },
  { month: 'Oct', tours: 8900, carRental: 4500, hotels: 3500, flights: 4800 },
  { month: 'Nov', tours: 7800, carRental: 4000, hotels: 3100, flights: 4300 },
  { month: 'Déc', tours: 9500, carRental: 4700, hotels: 3600, flights: 5100 }
];

const bookingSourceData = [
  { name: 'Site web', value: 55 },
  { name: 'Partenaires', value: 25 },
  { name: 'Applications mobiles', value: 15 },
  { name: 'Autres', value: 5 },
];

const topDestinationsData = [
  { name: 'Avenue des Baobabs', bookings: 128 },
  { name: 'Parc National d\'Isalo', bookings: 95 },
  { name: 'Tsingy de Bemaraha', bookings: 86 },
  { name: 'Île de Nosy Be', bookings: 74 },
  { name: 'Trekking aux Lémuriens', bookings: 62 },
];

const bookingsData = [
  { month: 'Jan', count: 45 },
  { month: 'Fév', count: 52 },
  { month: 'Mar', count: 58 },
  { month: 'Avr', count: 61 },
  { month: 'Mai', count: 72 },
  { month: 'Juin', count: 84 },
  { month: 'Juil', count: 92 },
  { month: 'Août', count: 105 },
  { month: 'Sep', count: 98 },
  { month: 'Oct', count: 89 },
  { month: 'Nov', count: 78 },
  { month: 'Déc', count: 95 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminReports = () => {
  const [period, setPeriod] = useState('year');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rapports & Statistiques</h1>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                {period === 'year' ? 'Année 2023' : period === 'quarter' ? 'Dernier trimestre' : 'Dernier mois'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setPeriod('month')}>Dernier mois</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod('quarter')}>Dernier trimestre</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod('year')}>Année 2023</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires total</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87,345 €</div>
            <p className="text-xs text-muted-foreground">
              +20.1% par rapport à l'an dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations</CardTitle>
            <BarChart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">932</div>
            <p className="text-xs text-muted-foreground">
              +15.3% par rapport à l'an dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux clients</CardTitle>
            <User className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">621</div>
            <p className="text-xs text-muted-foreground">
              +12.5% par rapport à l'an dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de satisfaction</CardTitle>
            <PieChart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.8% par rapport à l'an dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="bookings">Réservations</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenus par catégorie</CardTitle>
              <CardDescription>
                Répartition des revenus entre les différents services offerts
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={revenueData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} €`} />
                    <Legend />
                    <Bar dataKey="tours" name="Circuits" fill="#8884d8" />
                    <Bar dataKey="carRental" name="Location de voitures" fill="#82ca9d" />
                    <Bar dataKey="hotels" name="Hôtels" fill="#ffc658" />
                    <Bar dataKey="flights" name="Vols" fill="#ff8042" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-3">
                <Badge variant="outline" className="flex gap-2 items-center">
                  <div className="h-3 w-3 rounded-full bg-[#8884d8]"></div>
                  Circuits
                </Badge>
                <Badge variant="outline" className="flex gap-2 items-center">
                  <div className="h-3 w-3 rounded-full bg-[#82ca9d]"></div>
                  Location de voitures
                </Badge>
                <Badge variant="outline" className="flex gap-2 items-center">
                  <div className="h-3 w-3 rounded-full bg-[#ffc658]"></div>
                  Hôtels
                </Badge>
                <Badge variant="outline" className="flex gap-2 items-center">
                  <div className="h-3 w-3 rounded-full bg-[#ff8042]"></div>
                  Vols
                </Badge>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Télécharger le rapport
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Tendances des réservations</CardTitle>
              <CardDescription>
                Nombre de réservations par mois sur l'année
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={bookingsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="Réservations"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                <Download className="mr-2 h-4 w-4" />
                Télécharger le rapport
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Sources des réservations</CardTitle>
              <CardDescription>
                Répartition des réservations selon le canal d'acquisition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={bookingSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {bookingSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-3">
                {bookingSourceData.map((entry, index) => (
                  <Badge key={`badge-${index}`} variant="outline" className="flex gap-2 items-center">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    {entry.name}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="destinations">
          <Card>
            <CardHeader>
              <CardTitle>Destinations populaires</CardTitle>
              <CardDescription>
                Classement des circuits les plus réservés
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={topDestinationsData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="bookings" name="Réservations" fill="#8884d8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                <Download className="mr-2 h-4 w-4" />
                Télécharger le rapport
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Services les plus populaires</CardTitle>
            <CardDescription>
              Répartition des ventes par catégorie de service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>Circuits</span>
                </div>
                <span className="font-medium">42%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '42%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-green-500" />
                  <span>Location de voitures</span>
                </div>
                <span className="font-medium">28%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '28%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-yellow-500" />
                  <span>Hôtels</span>
                </div>
                <span className="font-medium">18%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '18%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-orange-500" />
                  <span>Vols</span>
                </div>
                <span className="font-medium">12%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance des ventes</CardTitle>
            <CardDescription>
              Comparaison entre l'objectif et les ventes réelles
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={[
                    { month: 'Jan', actual: 45000, target: 40000 },
                    { month: 'Fév', actual: 52000, target: 45000 },
                    { month: 'Mar', actual: 58000, target: 50000 },
                    { month: 'Avr', actual: 61000, target: 55000 },
                    { month: 'Mai', actual: 72000, target: 60000 },
                    { month: 'Juin', actual: 84000, target: 70000 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} €`} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Ventes réelles" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    name="Objectif" 
                    stroke="#82ca9d"
                    strokeDasharray="5 5"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#8884d8]"></div>
                <span>Ventes réelles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#82ca9d]"></div>
                <span>Objectif</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
