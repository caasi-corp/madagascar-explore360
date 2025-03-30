
import React from 'react';
import DashboardHeader from '@/components/admin/DashboardHeader';
import StatsCards from '@/components/admin/StatsCards';
import DashboardTabs from '@/components/admin/DashboardTabs';
import { Booking } from '@/components/admin/RecentBookingsTable';

const AdminDashboard = () => {
  const recentBookings: Booking[] = [
    {
      id: 'B001',
      customer: 'John Smith',
      tour: 'Avenue of Baobabs',
      date: '2023-08-15',
      amount: 599,
      status: 'Confirmed',
    },
    {
      id: 'B002',
      customer: 'Emma Watson',
      tour: 'Lemur Trekking',
      date: '2023-08-16',
      amount: 349,
      status: 'Pending',
    },
    {
      id: 'B003',
      customer: 'Michael Brown',
      tour: 'Isalo National Park',
      date: '2023-08-18',
      amount: 499,
      status: 'Confirmed',
    },
    {
      id: 'B004',
      customer: 'Sophia Garcia',
      tour: 'Nosy Be Island',
      date: '2023-08-20',
      amount: 699,
      status: 'Cancelled',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="animation-delay-300 animate-fade-in">
        <DashboardHeader />
      </div>
      
      <div className="animation-delay-600 animate-fade-in">
        <StatsCards />
      </div>
      
      <div className="animate-fade-in">
        <DashboardTabs recentBookings={recentBookings} />
      </div>
    </div>
  );
};

export default AdminDashboard;
