
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
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
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
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Detailed analytics data and charts</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Analytics content goes here</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>Generated reports and data exports</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Reports content goes here</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>System notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Notifications content goes here</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
