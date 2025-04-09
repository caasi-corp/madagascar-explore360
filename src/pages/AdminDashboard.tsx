
import React from 'react';
import DashboardHeader from '@/components/admin/DashboardHeader';
import StatsCards from '@/components/admin/StatsCards';
import DashboardTabs from '@/components/admin/DashboardTabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Booking } from '@/components/admin/RecentBookingsTable';
import { PlusCircle } from 'lucide-react';

const AdminDashboard = () => {
  const recentBookings: Booking[] = [
    {
      id: 'B001',
      customer: 'Jean Martin',
      tour: 'Avenue des Baobabs',
      date: '2023-08-15',
      amount: 599,
      status: 'Confirmed',
    },
    {
      id: 'B002',
      customer: 'Emma Durand',
      tour: 'Trekking aux Lémuriens',
      date: '2023-08-16',
      amount: 349,
      status: 'Pending',
    },
    {
      id: 'B003',
      customer: 'Michel Blanc',
      tour: 'Parc National d\'Isalo',
      date: '2023-08-18',
      amount: 499,
      status: 'Confirmed',
    },
    {
      id: 'B004',
      customer: 'Sophie Garcia',
      tour: 'Île de Nosy Be',
      date: '2023-08-20',
      amount: 699,
      status: 'Cancelled',
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tableau de Bord</h1>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link to="/admin/bookings">Voir les Réservations</Link>
          </Button>
          <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
            <Link to="/admin/tours/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouveau Circuit
            </Link>
          </Button>
        </div>
      </div>
      <StatsCards />
      <DashboardTabs recentBookings={recentBookings} />
    </>
  );
};

export default AdminDashboard;
