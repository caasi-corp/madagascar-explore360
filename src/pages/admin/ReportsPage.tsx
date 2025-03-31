
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedContainer } from '@/components/ui/animated-container';
import { 
  CalendarDays, 
  TrendingUp,
  Users,
  Car,
  Building,
  Plane,
  DollarSign,
  Star
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month' | 'year'>('month');

  const salesData = [
    { name: 'Jan', tours: 4000, hotels: 2400, vehicles: 1800, flights: 1200 },
    { name: 'Fév', tours: 5000, hotels: 1398, vehicles: 2800, flights: 3200 },
    { name: 'Mar', tours: 3000, hotels: 5800, vehicles: 2000, flights: 1500 },
    { name: 'Avr', tours: 2780, hotels: 3908, vehicles: 2200, flights: 1700 },
    { name: 'Mai', tours: 1890, hotels: 4800, vehicles: 1300, flights: 900 },
    { name: 'Jui', tours: 2390, hotels: 3800, vehicles: 3000, flights: 1000 },
    { name: 'Jui', tours: 3490, hotels: 4300, vehicles: 2500, flights: 1900 },
    { name: 'Aoû', tours: 6000, hotels: 5300, vehicles: 4000, flights: 3500 },
    { name: 'Sep', tours: 5000, hotels: 3300, vehicles: 3500, flights: 2800 },
  ];

  const bookingsTypeData = [
    { name: 'Tours', value: 40 },
    { name: 'Hôtels', value: 25 },
    { name: 'Véhicules', value: 20 },
    { name: 'Vols', value: 15 },
  ];

  const customerActivityData = [
    { name: 'Jan', newUsers: 60, activeUsers: 400 },
    { name: 'Fév', newUsers: 80, activeUsers: 450 },
    { name: 'Mar', newUsers: 45, activeUsers: 480 },
    { name: 'Avr', newUsers: 90, activeUsers: 520 },
    { name: 'Mai', newUsers: 30, activeUsers: 490 },
    { name: 'Jui', newUsers: 50, activeUsers: 510 },
    { name: 'Jui', newUsers: 75, activeUsers: 540 },
    { name: 'Aoû', newUsers: 120, activeUsers: 600 },
    { name: 'Sep', newUsers: 100, activeUsers: 650 },
  ];

  const popularDestinationsData = [
    { name: 'Nosy Be', value: 35 },
    { name: 'Allée des Baobabs', value: 25 },
    { name: 'Isalo', value: 20 },
    { name: 'Andasibe', value: 15 },
    { name: 'Antananarivo', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <AnimatedContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rapports & Statistiques</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted/50" onClick={() => setDateRange('day')}>
            Jour
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted/50" onClick={() => setDateRange('week')}>
            Semaine
          </Badge>
          <Badge variant={dateRange === 'month' ? 'default' : 'outline'} className="cursor-pointer hover:bg-muted/50" onClick={() => setDateRange('month')}>
            Mois
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted/50" onClick={() => setDateRange('year')}>
            Année
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="mb-6">
          <TabsTrigger value="sales" className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Ventes
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            Réservations
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Clients
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ventes par service</CardTitle>
              <CardDescription>Analyse des ventes mensuelles par catégorie de service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tours" name="Circuits" fill="#1eaedb" />
                    <Bar dataKey="hotels" name="Hôtels" fill="#9b87f5" />
                    <Bar dataKey="vehicles" name="Véhicules" fill="#00c49f" />
                    <Bar dataKey="flights" name="Vols" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des revenus</CardTitle>
                <CardDescription>Distribution des revenus par type de service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookingsTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {bookingsTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendance des ventes</CardTitle>
                <CardDescription>Évolution des revenus totaux sur la période</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={salesData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="tours"
                        stackId="1"
                        stroke="#1eaedb"
                        fill="#1eaedb"
                      />
                      <Area
                        type="monotone"
                        dataKey="hotels"
                        stackId="1"
                        stroke="#9b87f5"
                        fill="#9b87f5"
                      />
                      <Area
                        type="monotone"
                        dataKey="vehicles"
                        stackId="1"
                        stroke="#00c49f"
                        fill="#00c49f"
                      />
                      <Area
                        type="monotone"
                        dataKey="flights"
                        stackId="1"
                        stroke="#ff8042"
                        fill="#ff8042"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Réservations par destination</CardTitle>
              <CardDescription>Les destinations les plus populaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={popularDestinationsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {popularDestinationsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Circuits</CardTitle>
                <CardDescription className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                  <span>+15% vs période précédente</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <CalendarDays className="h-10 w-10 text-madagascar-green" />
                  <div>
                    <div className="text-2xl font-bold">182</div>
                    <div className="text-sm text-muted-foreground">Réservations</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Véhicules</CardTitle>
                <CardDescription className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                  <span>+8% vs période précédente</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Car className="h-10 w-10 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">97</div>
                    <div className="text-sm text-muted-foreground">Réservations</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Hôtels</CardTitle>
                <CardDescription className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                  <span>+12% vs période précédente</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Building className="h-10 w-10 text-purple-500" />
                  <div>
                    <div className="text-2xl font-bold">124</div>
                    <div className="text-sm text-muted-foreground">Réservations</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activité des utilisateurs</CardTitle>
              <CardDescription>Utilisateurs actifs et nouveaux utilisateurs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={customerActivityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="activeUsers" name="Utilisateurs actifs" stroke="#1eaedb" strokeWidth={2} />
                    <Line type="monotone" dataKey="newUsers" name="Nouveaux utilisateurs" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques clients</CardTitle>
                <CardDescription>Vue d'ensemble des données clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Total clients</p>
                      <p className="text-sm text-muted-foreground">Tous clients enregistrés</p>
                    </div>
                    <div className="font-bold text-xl">1,248</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Clients actifs</p>
                      <p className="text-sm text-muted-foreground">Actifs dans les 30 derniers jours</p>
                    </div>
                    <div className="font-bold text-xl">684</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Taux de conversion</p>
                      <p className="text-sm text-muted-foreground">Visiteurs vers clients</p>
                    </div>
                    <div className="font-bold text-xl">24.8%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Valeur moyenne</p>
                      <p className="text-sm text-muted-foreground">Par client</p>
                    </div>
                    <div className="font-bold text-xl">485€</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satisfaction client</CardTitle>
                <CardDescription>Évaluations et avis clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold">4.8/5</div>
                    <p className="text-sm text-muted-foreground mt-2">Évaluation moyenne</p>
                    <div className="flex justify-center mt-2 text-yellow-500">
                      <Star className="h-6 w-6 fill-yellow-500" />
                      <Star className="h-6 w-6 fill-yellow-500" />
                      <Star className="h-6 w-6 fill-yellow-500" />
                      <Star className="h-6 w-6 fill-yellow-500" />
                      <Star className="h-6 w-6 fill-yellow-500 opacity-70" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">5</span>
                        <Star className="h-4 w-4 fill-yellow-500" />
                      </div>
                      <div className="w-full mx-4 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="text-sm">70%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">4</span>
                        <Star className="h-4 w-4 fill-yellow-500" />
                      </div>
                      <div className="w-full mx-4 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm">20%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">3</span>
                        <Star className="h-4 w-4 fill-yellow-500" />
                      </div>
                      <div className="w-full mx-4 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: '7%' }}></div>
                      </div>
                      <span className="text-sm">7%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">2</span>
                        <Star className="h-4 w-4 fill-yellow-500" />
                      </div>
                      <div className="w-full mx-4 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: '2%' }}></div>
                      </div>
                      <span className="text-sm">2%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">1</span>
                        <Star className="h-4 w-4 fill-yellow-500" />
                      </div>
                      <div className="w-full mx-4 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: '1%' }}></div>
                      </div>
                      <span className="text-sm">1%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Future performance metrics will go here */}
          <Card>
            <CardHeader>
              <CardTitle>Performance globale</CardTitle>
              <CardDescription>Mesures de performance clés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p>Fonctionnalité à venir...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AnimatedContainer>
  );
};

export default ReportsPage;
