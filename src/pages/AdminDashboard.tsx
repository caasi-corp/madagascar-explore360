
import React from 'react';
import DashboardHeader from '@/components/admin/DashboardHeader';
import StatsCards from '@/components/admin/StatsCards';
import DashboardTabs from '@/components/admin/DashboardTabs';
import { Button } from '@/components/ui/button';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, CalendarDays, LayoutDashboard, Users, Car, PlaneTakeoff, Building } from 'lucide-react';
import { Booking } from '@/components/admin/RecentBookingsTable';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const recentBookings: Booking[] = [
    {
      id: 'B001',
      customer: 'Jean Dupont',
      tour: 'Avenue of Baobabs',
      date: '2023-08-15',
      amount: 599,
      status: 'Confirmed',
    },
    {
      id: 'B002',
      customer: 'Marie Laurent',
      tour: 'Lemur Trekking',
      date: '2023-08-16',
      amount: 349,
      status: 'Pending',
    },
    {
      id: 'B003',
      customer: 'Paul Martin',
      tour: 'Isalo National Park',
      date: '2023-08-18',
      amount: 499,
      status: 'Confirmed',
    },
    {
      id: 'B004',
      customer: 'Sophie Petit',
      tour: 'Nosy Be Island',
      date: '2023-08-20',
      amount: 699,
      status: 'Cancelled',
    },
  ];

  const adminOverviewData = [
    {
      title: 'Tours & Circuits',
      description: 'Gérez tous vos circuits proposés',
      icon: <CalendarDays className="h-10 w-10 text-madagascar-green" />,
      path: '/admin/tours',
      stats: '32 circuits actifs',
    },
    {
      title: 'Réservations',
      description: 'Suivez toutes les réservations',
      icon: <LayoutDashboard className="h-10 w-10 text-blue-500" />,
      path: '/admin/bookings',
      stats: '18 nouvelles réservations',
    },
    {
      title: 'Clients',
      description: 'Base de données clients',
      icon: <Users className="h-10 w-10 text-indigo-500" />,
      path: '/admin/customers',
      stats: '1,248 clients enregistrés',
    },
    {
      title: 'Véhicules',
      description: 'Gestion de votre flotte',
      icon: <Car className="h-10 w-10 text-orange-500" />,
      path: '/admin/vehicles',
      stats: '24 véhicules disponibles',
    },
    {
      title: 'Vols',
      description: 'Gestion des vols',
      icon: <PlaneTakeoff className="h-10 w-10 text-sky-500" />,
      path: '/admin/flights',
      stats: '12 vols programmés',
    },
    {
      title: 'Hôtels',
      description: 'Partenariats hôteliers',
      icon: <Building className="h-10 w-10 text-purple-500" />,
      path: '/admin/hotels',
      stats: '36 hôtels partenaires',
    },
  ];
  
  const data = [
    { name: 'Jan', bookings: 40, revenue: 2400 },
    { name: 'Fév', bookings: 30, revenue: 1398 },
    { name: 'Mar', bookings: 20, revenue: 9800 },
    { name: 'Avr', bookings: 27, revenue: 3908 },
    { name: 'Mai', bookings: 18, revenue: 4800 },
    { name: 'Juin', bookings: 23, revenue: 3800 },
    { name: 'Jul', bookings: 34, revenue: 4300 },
  ];

  return (
    <>
      <DashboardHeader />
      <AnimatedContainer>
        <StatsCards />
      </AnimatedContainer>
      
      <AnimatedContainer className="mt-6" delay={300}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminOverviewData.map((item, index) => (
            <Card 
              key={index}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  {item.icon}
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-4">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">{item.stats}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedContainer>

      <AnimatedContainer className="mt-6" delay={600}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Aperçu des performances</CardTitle>
            <CardDescription>Réservations et revenus sur les 7 derniers mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="Réservations" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenus (€)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <DashboardTabs recentBookings={recentBookings} />
      </AnimatedContainer>
    </>
  );
};

export default AdminDashboard;
