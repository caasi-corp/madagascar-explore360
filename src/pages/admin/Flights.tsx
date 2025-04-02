
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import FlightTable from '@/components/admin/flight/FlightTable';
import FlightFilters from '@/components/admin/flight/FlightFilters';

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  price: number;
  seatsAvailable: number;
  status: 'scheduled' | 'delayed' | 'cancelled';
}

const AdminFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([
    { 
      id: 'F001',
      flightNumber: 'MD405', 
      airline: 'Air Madagascar', 
      origin: 'Antananarivo', 
      destination: 'Paris', 
      departureDate: '2023-08-15',
      departureTime: '22:30',
      arrivalDate: '2023-08-16',
      arrivalTime: '08:45',
      price: 850,
      seatsAvailable: 45,
      status: 'scheduled'
    },
    { 
      id: 'F002',
      flightNumber: 'AF934', 
      airline: 'Air France', 
      origin: 'Paris', 
      destination: 'Antananarivo', 
      departureDate: '2023-08-16',
      departureTime: '11:15',
      arrivalDate: '2023-08-16',
      arrivalTime: '22:30',
      price: 920,
      seatsAvailable: 28,
      status: 'scheduled'
    },
    { 
      id: 'F003',
      flightNumber: 'MD123', 
      airline: 'Air Madagascar', 
      origin: 'Antananarivo', 
      destination: 'Nosy Be', 
      departureDate: '2023-08-17',
      departureTime: '09:00',
      arrivalDate: '2023-08-17',
      arrivalTime: '10:15',
      price: 220,
      seatsAvailable: 12,
      status: 'delayed'
    },
    { 
      id: 'F004',
      flightNumber: 'MD456', 
      airline: 'Air Madagascar', 
      origin: 'Nosy Be', 
      destination: 'Antananarivo', 
      departureDate: '2023-08-17',
      departureTime: '15:45',
      arrivalDate: '2023-08-17',
      arrivalTime: '17:00',
      price: 190,
      seatsAvailable: 0,
      status: 'cancelled'
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    // Simule la suppression d'un vol
    setFlights(flights.filter(flight => flight.id !== id));
    
    toast({
      title: "Vol supprimé",
      description: "Le vol a été supprimé avec succès",
    });
  };

  const handleUpdateStatus = (id: string, status: 'scheduled' | 'delayed' | 'cancelled') => {
    // Simule la modification du statut d'un vol
    setFlights(flights.map(flight => 
      flight.id === id ? { ...flight, status: status } : flight
    ));
    
    toast({
      title: "Statut mis à jour",
      description: `Le vol est maintenant ${status === 'scheduled' ? 'planifié' : status === 'delayed' ? 'retardé' : 'annulé'}`,
    });
  };

  const filteredFlights = flights.filter(flight => 
    flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Vols</h1>
        <Button asChild className="bg-madagascar-green hover:bg-madagascar-green/80 text-white">
          <Link to="#">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un Vol
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <FlightFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <FlightTable 
            flights={filteredFlights}
            onDelete={handleDelete}
            onUpdateStatus={handleUpdateStatus}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFlights;
