
import React, { useState } from 'react';
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedContainer } from '@/components/ui/animated-container';
import { 
  CalendarDays, 
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import SalesReports from '@/components/admin/reports/SalesReports';
import BookingsReports from '@/components/admin/reports/BookingsReports';
import CustomersReports from '@/components/admin/reports/CustomersReports';
import PerformanceReports from '@/components/admin/reports/PerformanceReports';
import DateRangeSelector from '@/components/admin/reports/DateRangeSelector';
import { 
  salesData, 
  bookingsTypeData, 
  customerActivityData, 
  popularDestinationsData 
} from '@/components/admin/reports/ReportsData';

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month' | 'year'>('month');

  return (
    <AnimatedContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rapports & Statistiques</h1>
        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
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

        <TabsContent value="sales">
          <SalesReports 
            salesData={salesData} 
            bookingsTypeData={bookingsTypeData} 
          />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingsReports 
            popularDestinationsData={popularDestinationsData} 
          />
        </TabsContent>

        <TabsContent value="customers">
          <CustomersReports 
            customerActivityData={customerActivityData} 
          />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceReports />
        </TabsContent>
      </Tabs>
    </AnimatedContainer>
  );
};

export default ReportsPage;
