
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import our new components
import CruisesHeader from '@/components/admin/catamaran/CruisesHeader';
import CruisesSearchBar from '@/components/admin/catamaran/CruisesSearchBar';
import NewCruiseDialog from '@/components/admin/catamaran/NewCruiseDialog';
import CruisesTable from '@/components/admin/catamaran/CruisesTable';
import CatamaransTable from '@/components/admin/catamaran/CatamaransTable';
import DeparturesTable from '@/components/admin/catamaran/DeparturesTable';

const CatamaranCruises = () => {
  const [activeTab, setActiveTab] = useState("cruises");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Sample data
  const cruises = [
    { 
      id: 'CR001', 
      name: 'Découverte de la Baie de Nosy Be', 
      destination: 'Nosy Be', 
      duration: '1 jour', 
      price: 180, 
      catamaran: 'Paradis Bleu',
      status: 'active',
      bookings: 24,
      nextDeparture: '2025-06-15'
    },
    { 
      id: 'CR002', 
      name: 'Les Îles de Mitsio', 
      destination: 'Archipel de Mitsio', 
      duration: '3 jours', 
      price: 650, 
      catamaran: 'Paradis Bleu',
      status: 'active',
      bookings: 18,
      nextDeparture: '2025-05-22'
    },
    { 
      id: 'CR003', 
      name: 'Tour de Nosy Komba', 
      destination: 'Nosy Komba', 
      duration: '2 jours', 
      price: 380, 
      catamaran: 'Océan Nomade',
      status: 'active',
      bookings: 12,
      nextDeparture: '2025-05-18'
    },
    { 
      id: 'CR004', 
      name: 'Expédition Radama', 
      destination: 'Îles Radama', 
      duration: '5 jours', 
      price: 990, 
      catamaran: 'Paradis Bleu',
      status: 'inactive',
      bookings: 8,
      nextDeparture: '2025-07-10'
    },
  ];
  
  const catamarans = [
    {
      id: 'CAT001',
      name: 'Paradis Bleu',
      type: 'Lagoon 42',
      capacity: 8,
      cabins: 4,
      length: '12.8m',
      status: 'available',
      bookings: 36,
      nextMaintenance: '2025-09-05'
    },
    {
      id: 'CAT002',
      name: 'Océan Nomade',
      type: 'Nautitech 40',
      capacity: 6,
      cabins: 3,
      length: '11.4m',
      status: 'maintenance',
      bookings: 28,
      nextMaintenance: '2025-06-10'
    }
  ];
  
  const upcomingDepartures = [
    {
      id: 'DEP001',
      cruise: 'Découverte de la Baie de Nosy Be',
      catamaran: 'Paradis Bleu',
      departure: '2025-05-15',
      passengersBooked: 4,
      capacity: 8,
      status: 'confirmed'
    },
    {
      id: 'DEP002',
      cruise: 'Tour de Nosy Komba',
      catamaran: 'Océan Nomade',
      departure: '2025-05-18',
      passengersBooked: 6,
      capacity: 6,
      status: 'full'
    },
    {
      id: 'DEP003',
      cruise: 'Les Îles de Mitsio',
      catamaran: 'Paradis Bleu',
      departure: '2025-05-22',
      passengersBooked: 2,
      capacity: 8,
      status: 'confirmed'
    }
  ];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const openNewCruiseDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <CruisesHeader openNewCruiseDialog={openNewCruiseDialog} />

      <div className="flex items-center justify-between">
        <CruisesSearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="cruises">Croisières</TabsTrigger>
          <TabsTrigger value="catamarans">Catamarans</TabsTrigger>
          <TabsTrigger value="departures">Départs</TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="p-0">
            <TabsContent value="cruises" className="mt-0">
              <CruisesTable cruises={cruises} />
            </TabsContent>
            
            <TabsContent value="catamarans" className="mt-0">
              <CatamaransTable catamarans={catamarans} />
            </TabsContent>
            
            <TabsContent value="departures" className="mt-0">
              <DeparturesTable departures={upcomingDepartures} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      <NewCruiseDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default CatamaranCruises;
