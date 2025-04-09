
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RecentBookingsTable, { Booking } from './RecentBookingsTable';
import RevenueChart from './RevenueChart';

interface DashboardTabsProps {
  recentBookings: Booking[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ recentBookings }) => {
  return (
    <Tabs defaultValue="overview" className="mb-6">
      <TabsList>
        <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
        <TabsTrigger value="analytics">Analyses</TabsTrigger>
        <TabsTrigger value="reports">Rapports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentBookingsTable bookings={recentBookings} />
          <RevenueChart />
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analyses</CardTitle>
            <CardDescription>Données d'analyse détaillées et graphiques</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Le contenu des analyses sera affiché ici</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Rapports</CardTitle>
            <CardDescription>Rapports générés et exportations de données</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Le contenu des rapports sera affiché ici</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Notifications et alertes du système</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Les notifications seront affichées ici</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
