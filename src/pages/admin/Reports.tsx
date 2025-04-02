
import React, { useState } from 'react';
import { 
  Calendar, 
  Download, 
  BarChart4,
  LineChart,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart as RechartLineChart,
  Line,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AdminReports = () => {
  const [period, setPeriod] = useState('month');
  const [reportType, setReportType] = useState('sales');

  // Bookings data
  const bookingData = [
    { name: 'Jan', value: 12 },
    { name: 'Fév', value: 19 },
    { name: 'Mar', value: 23 },
    { name: 'Avr', value: 28 },
    { name: 'Mai', value: 34 },
    { name: 'Juin', value: 42 },
    { name: 'Juil', value: 50 },
    { name: 'Août', value: 59 },
    { name: 'Sep', value: 45 },
    { name: 'Oct', value: 38 },
    { name: 'Nov', value: 30 },
    { name: 'Déc', value: 25 },
  ];

  // Revenue data
  const revenueData = [
    { name: 'Jan', value: 6500 },
    { name: 'Fév', value: 8900 },
    { name: 'Mar', value: 10200 },
    { name: 'Avr', value: 12800 },
    { name: 'Mai', value: 15400 },
    { name: 'Juin', value: 19200 },
    { name: 'Juil', value: 22500 },
    { name: 'Août', value: 26300 },
    { name: 'Sep', value: 20100 },
    { name: 'Oct', value: 17200 },
    { name: 'Nov', value: 14300 },
    { name: 'Déc', value: 11500 },
  ];

  // Pie chart data - Tour categories
  const categoryData = [
    { name: 'Nature', value: 40 },
    { name: 'Aventure', value: 25 },
    { name: 'Plage', value: 15 },
    { name: 'Culture', value: 10 },
    { name: 'Faune', value: 10 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Pie chart data - Client sources
  const sourceData = [
    { name: 'Direct', value: 45 },
    { name: 'Partenaires', value: 25 },
    { name: 'Réseaux sociaux', value: 15 },
    { name: 'Référencement', value: 10 },
    { name: 'Autres', value: 5 },
  ];

  const stats = [
    { title: 'Réservations totales', value: '405', change: '+12%', trend: 'up' },
    { title: 'Revenu total', value: '185 200 €', change: '+18%', trend: 'up' },
    { title: 'Clients actifs', value: '320', change: '+8%', trend: 'up' },
    { title: 'Taux de conversion', value: '3.2%', change: '+0.5%', trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rapports</h1>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
              <SelectItem value="custom">Période personnalisée</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Période
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-xl font-medium">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
              <div className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} par rapport au mois précédent
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="sales" onValueChange={setReportType}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="sales" className="flex items-center">
              <LineChart className="mr-2 h-4 w-4" />
              Ventes & Revenus
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center">
              <PieChart className="mr-2 h-4 w-4" />
              Catégories
            </TabsTrigger>
            <TabsTrigger value="sources" className="flex items-center">
              <BarChart4 className="mr-2 h-4 w-4" />
              Sources
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="sales" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Réservations et revenus</CardTitle>
              <CardDescription>
                Évolution des réservations et des revenus au cours des 12 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartLineChart
                    data={revenueData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="value"
                      name="Revenu (€)"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="value"
                      data={bookingData}
                      name="Réservations"
                      stroke="#82ca9d"
                    />
                  </RechartLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Les données sont mises à jour quotidiennement.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Répartition par catégories de circuits</CardTitle>
              <CardDescription>
                Distribution des réservations par catégorie de circuit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Les catégories Nature et Aventure sont les plus populaires.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sources des clients</CardTitle>
              <CardDescription>
                Répartition des sources d'acquisition de clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sourceData}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 70,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Pourcentage (%)" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                La majorité des clients réservent directement sur notre site.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;
